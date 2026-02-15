from flask import Blueprint, request, jsonify
from data import g_data

action_bp = Blueprint('action', __name__)

@action_bp.route('/count-button', methods=['POST'])
def action_count_button():
    """
    字段:
        - timestamp: 时间戳
        - name: 按钮名称
        - **attachment: 附加属性
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_data.fromCountButton(data)
    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200
