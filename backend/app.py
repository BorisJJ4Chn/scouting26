import os
from flask import Flask
from flask_cors import CORS
from flask import jsonify, request
import json

from routes.unique import unique_bp
from routes.action import action_bp
from routes.status import status_bp
from auth import auth_bp, login_required, check_access, all_users
from routes.files import files_bp



from data import g_datas, Data


app = Flask(__name__)
CORS(app)

# 设置密钥
app.config['SECRET_KEY'] = 'FRC6907SCOUTINGSECRETKEYHAHAHAHA'

app.register_blueprint(unique_bp, url_prefix='/api')
app.register_blueprint(action_bp, url_prefix='/api')
app.register_blueprint(status_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(files_bp, url_prefix='/api')


@app.route('/api/over', methods=['POST'])
@login_required
def over(username):

    filename = g_datas[username].makeFilenameNoExt() + '.json'

    if not os.path.exists(f'./data/raw/{username}'):
        os.makedirs(f'./data/raw/{username}')
    g_datas[username].after()

    with open(os.path.join(f'./data/raw/{username}', filename), 'w') as f:
        json.dump(g_datas[username]._data, f, indent=4)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@app.route('/api/all', methods=['GET'])
@login_required
def get_all(username):
    return jsonify({
        'code': 200,
        'message': 'Success',
        'data': g_datas[username]._data
        }), 200


@app.route('/api/data/<int:team_number>/<region>/<match_type>/<int:match_number>', defaults={'view_user_name': None}, methods=['GET'])
@app.route('/api/data/<int:team_number>/<region>/<match_type>/<int:match_number>/<view_user_name>', methods=['GET'])
@login_required
def open_data(username, team_number, region, match_type, match_number, view_user_name):
    if not view_user_name is None:
        with open(os.path.join(f'./data/raw/{view_user_name}', f'{team_number}_{region}_{match_type}{match_number}.json'), 'r') as f:
            g_datas[username]._data = json.load(f)
    else:
        with open(os.path.join(f'./data/raw/{username}', f'{team_number}_{region}_{match_type}{match_number}.json'), 'r') as f:
            g_datas[username]._data = json.load(f)
    return jsonify({
        'code': 200,
        'message': 'Success',
        'data': g_datas[username]._data
        }), 200

@app.route('/api/data/<int:team_number>/<region>/<match_type>/<int:match_number>', methods=['POST'])
@login_required
def save_data(username, team_number, region, match_type, match_number):
    users = all_users()
    if not (check_access(users[username].role, 'admin') or username == request.json['info']['recorder']):
        return jsonify({
            'code': 403,
            'message': 'Forbidden'
            }), 403
    g_datas[username]._data = request.json
    with open(os.path.join(f'./data/raw/{username}', f'{team_number}_{region}_{match_type}{match_number}.json'), 'w') as f:
        json.dump(request.json, f, indent=4)
    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200


if __name__ == '__main__':
    with open('./data/users.json', 'r') as f:
        users = json.load(f)['users']
    for user in users:
        g_datas[user['username']] = Data()
    del users
    app.run(host='0.0.0.0', debug=False, port=3000)
