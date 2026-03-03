import os
from flask import Blueprint, request, jsonify
from auth import check_access, login_required, all_users, admin_required
import zipfile
from flask import send_file

files_bp = Blueprint('files', __name__)

@files_bp.route('/file/', defaults={'path': ''}, methods=['GET'])
@files_bp.route('/file/<path:path>', methods=['GET'])
@login_required
def get_files(username, path):
    if not path.startswith('data/'):
        path = os.path.join('data', path)
    path = path.replace('\\', '/')
    print(path)
    if not os.path.exists(path):
        return jsonify({
            'code': 404,
            'message': 'Path not found'
            }), 404
    
    users = all_users()
    if users[username].role == 'admin':
        file_list = os.listdir(path)
        new_file_list = []
        for file_dir_name in file_list[:]:
            if os.path.isdir(os.path.join(path, file_dir_name)):
                to_append = {
                    'name': file_dir_name,
                    'type': 'folder',
                }
                to_append.update({
                    'owner': file_dir_name,
                } if path.startswith('data/raw/') else {})
                new_file_list.append(to_append)
            else:
                to_append = {
                    'name': file_dir_name,
                    'type': 'file',
                }
                to_append.update({
                    'owner': path.split('/')[-2],
                } if path.startswith('data/raw/') else {})
                print(path.split('/'))
                new_file_list.append(to_append)
        print(new_file_list)
        return jsonify({
            'code': 200,
            'message': 'Success',
            'data': {'path': path.replace('data\\', ''), 'files_and_dirs': new_file_list},
        }), 200
    
    if os.path.isdir(path):

        print('='*20)

        users = all_users()
        
        file_list = os.listdir(path)
        print(file_list)
        file_list = [f for f in file_list if not f.startswith('._')]
        file_list = [f for f in file_list if f != "users.json"]

        
        
        new_file_list = []
        for file_dir_name in file_list[:]:
            if os.path.isdir(os.path.join(path, file_dir_name)):
                visible = file_dir_name in ('data', 'raw')
                visible |= username == file_dir_name
                visible |= check_access(users[username].role, 'captain')
                if visible:
                    to_append = {
                        'name': file_dir_name,
                        'type': 'folder',
                    }
                    to_append.update({
                        'owner': file_dir_name,
                    } if path.startswith('data/raw/') else {})
                    new_file_list.append(to_append)
            else:
                visible = users[username].role == 'captain'
                visible |= path.split('/')[-2] == username
                visible &= file_dir_name != 'users.json'
                visible |= users[username].role == 'admin'
                if visible:
                    to_append = {
                        'name': file_dir_name,
                        'type': 'file',
                    }
                    to_append.update({
                        'owner': path.split('/')[-2],
                    } if path.startswith('data/raw/') else {})
                    new_file_list.append(to_append)
        print(new_file_list)

        return jsonify({
            'code': 200,
            'message': 'Success',
            'data': {'path':path.replace('data\\', ''), 'files_and_dirs': new_file_list}
            }), 200

@files_bp.route('/file/<path:path>', methods=['DELETE'])
@admin_required
def delete_file(username, path):
    users = all_users()
    if users[username].role != 'admin':
        return jsonify({
            'code': 403,
            'message': 'Forbidden'
            }), 403
    if not path.startswith('data/'):
        path = os.path.join('data', path)
    path = path.replace('\\', '/')
    print(path)
    if not os.path.exists(path):
        return jsonify({
            'code': 404,
            'message': 'Path not found'
            }), 404
    try:
        os.remove(path)
    except Exception as e:
        print(e)
        return jsonify({
            'code': 500,
            'message': 'Internal server error'
            }), 500
    return jsonify({
        'code': 200,
        'message': f'Successfully deleted {path.replace("data/", "")}'
        }), 200

@files_bp.route('/file/download/<path:path>', methods=['GET'])
@admin_required
def download_file(username, path):
    if not path.startswith('data/'):
        path = os.path.join('data', path)
    path = path.replace('\\', '/')
    print(path)
    if not os.path.exists(path):
        return jsonify({
            'code': 404,
            'message': 'Path not found'
            }), 404
    if os.path.isdir(path):
        zip_filename = f'{path.split("/")[-1]}.zip'
        zip_path = os.path.join('.', 'data', '._tempzip')
        os.makedirs(zip_path, exist_ok=True)
        with zipfile.ZipFile(os.path.join(zip_path, zip_filename), 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(path):
                for file in files:
                    zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), path))
        return send_file(os.path.join(zip_path, zip_filename), as_attachment=True, mimetype='application/zip')
    return send_file(path, as_attachment=True, mimetype='application/json')

@files_bp.route('/upload/<path:path>', methods=['POST'])
@admin_required
def upload_file(username, path):
    
    if not path.startswith('data/'):
        path = os.path.join('data', path)
    path = path.replace('\\', '/')
    print(path)
    
    # 确保上传目录存在
    os.makedirs(path, exist_ok=True)
    
    # 检查是否有文件被上传
    if 'file' not in request.files:
        return jsonify({
            'code': 400,
            'message': 'No file uploaded'
            }), 400
    
    file = request.files['file']
    
    # 检查文件名是否为空
    if file.filename == '':
        return jsonify({
            'code': 400,
            'message': 'No file selected'
            }), 400
    
    try:
        # 保存文件
        file_path = os.path.join(path, file.filename)
        file.save(file_path)
        
        return jsonify({
            'code': 200,
            'message': f'Successfully uploaded {file.filename}',
            'data': {
                'filename': file.filename,
                'path': file_path.replace('data/', '')
            }
            }), 200
    except Exception as e:
        print(e)
        return jsonify({
            'code': 500,
            'message': 'Internal server error'
            }), 500
