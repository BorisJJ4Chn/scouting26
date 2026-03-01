import jwt
import json
import os
import datetime
from functools import wraps
from flask import request, jsonify, current_app, Blueprint
import bcrypt


def check_access(role, need):
    priority = {'scout': 0, 'captain': 1, 'admin': 99}
    return priority[role] >= priority[need]


class User:
    def __init__(self, username, role='scout', password_hash=None):
        self.username = username
        self.role = role
        self.password_hash = password_hash


def all_users():
    with open('./data/users.json', 'r') as f:
        users = json.load(f)['users']
        return {user['username']: User(user['username'], user['role'], user.get('password_hash')) for user in users}

def update_users(users):
    print(users)
    with open('./data/users.json', 'w') as f:
        json.dump({
            'users': [{'username': user.username, 'role': user.role, 'password_hash': user.password_hash if user.password_hash else ''} for user in users.values()]
        }, f, indent=4)

# 生成JWT令牌
def generate_token(username):
    payload = {
        'username': username,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=7 * 24),  # 令牌有效期 7 天
        'iat': datetime.datetime.now(datetime.timezone.utc)  # 令牌签发时间
    }
    token = jwt.encode(payload, current_app.config.get('SECRET_KEY', 'your-secret-key'), algorithm='HS256')
    return token

# 验证JWT令牌
def verify_token(token):
    try:
        payload = jwt.decode(token, current_app.config.get('SECRET_KEY', 'your-secret-key'), algorithms=['HS256'])
        return payload['username']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# 认证装饰器
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'code': 401, 'message': 'Authorization token is required'}), 401
        
        # 移除Bearer前缀
        if token.startswith('Bearer '):
            token = token.split(' ')[1]
        
        username = verify_token(token)
        if not username:
            return jsonify({'code': 401, 'message': 'Invalid or expired token'}), 401
        
        # 将用户名传递给视图函数
        return f(username, *args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    @login_required
    def decorated_function(username, *args, **kwargs):
        users = all_users()
        if users[username].role != 'admin':
            return jsonify({'code': 403, 'message': 'Forbidden'}), 403
        return f(username, *args, **kwargs)
    return decorated_function

# 注册认证相关的路由
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data:
        return jsonify({'code': 400, 'message': 'Username is required'}), 400
    
    username = data['username']
    
    users = all_users()
    
    if username not in users:
        return jsonify({'code': 404, 'message': 'User not exist'}), 404
    
    if users[username].role == 'admin':
        if 'password' not in data:
            return jsonify({'code': 401, 'message': 'Password is required for admin'}), 401
        
        if not bcrypt.checkpw(data['password'].encode('utf-8'), users[username].password_hash.encode('utf-8')):
            return jsonify({'code': 401, 'message': 'Invalid password'}), 401
    
    token = generate_token(username)
    return jsonify({
        'code': 200,
        'message': 'Login successful',
        'data': {
            'token': token,
            'username': username
        }
    }), 200

@auth_bp.route('/users/<string:user_to_register>', methods=['POST'])
@admin_required
def register(admin, user_to_register):
    data = request.get_json()
    if not data or 'role' not in data:
        return jsonify({'code': 400, 'message': 'Role is required'}), 400

    if data['role'] == 'admin':
        return jsonify({'code': 400, 'message': "You can't register admin"}), 400

    users = all_users()
    if user_to_register in users:
        return jsonify({'code': 400, 'message': 'Username already exists'}), 400

    print(f"{admin} registered {user_to_register} as {data['role']}")
    
    users[user_to_register] = User(user_to_register, data['role'])
    update_users(users)

    os.makedirs(f'./data/raw/{user_to_register}', exist_ok=True)
    
    return jsonify({'code': 200, 'message': 'User registered successfully'}), 200

@auth_bp.route('/users/<string:user_to_delete>', methods=['DELETE'])
@admin_required
def delete_user(admin, user_to_delete):
    users = all_users()
    if user_to_delete not in users:
        return jsonify({'code': 400, 'message': 'User not exist'}), 400
    
    print(f"{admin} deleted {user_to_delete}")
    del users[user_to_delete]
    update_users(users)
    
    return jsonify({'code': 200, 'message': 'User deleted successfully'}), 200

@auth_bp.route('/users/me', methods=['GET'])
@login_required
def get_current_user(username):
    users = all_users()
    return jsonify({
        'code': 200,
        'message': 'Success',
        'data': {
            'username': username,
            'role': users[username].role
        }
    }), 200

@auth_bp.route('/users/all', methods=['GET'])
@admin_required
def get_all_users(admin):
    users = all_users()
    print(f"{admin} requested all users")

    return jsonify({
        'code': 200,
        'message': 'Success',
        'data': {
            'users': [{'username': user.username, 'role': user.role} for user in users.values()]
        }
    }), 200
