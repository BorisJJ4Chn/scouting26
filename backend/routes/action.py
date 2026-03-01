from flask import Blueprint, request, jsonify
from data import g_datas
from auth import login_required


action_bp = Blueprint('action', __name__)

@action_bp.route('/count-button', methods=['POST'])
@login_required
def action_count_button(username):
    """
    字段:
        - timestamp: 时间戳
        - name: 按钮名称
        - **attachment: 附加属性
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_datas[username].fromCountButton(data)
    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200
