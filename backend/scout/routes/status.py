from flask import Blueprint, request, jsonify
from data import g_datas
from auth import login_required

status_bp = Blueprint('status', __name__)

@status_bp.route('/preload', methods=['POST'])
@login_required
def status_preload(username):
    """
    字段:
        - preload: 预加载选项
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_datas[username].setPreload(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/climb', methods=['POST'])
@login_required
def status_climb(username):
    """
    字段:
        - success: 是否成功
        - position: 位置
        (optional)
        - height: 高度
    """
    data: dict[str, str | int | bool] = request.get_json()
    print(data)
    g_datas[username].fromCountButton(data)
    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/auto-winner', methods=['POST'])
@login_required
def auto_winner(username):
    """
    字段:
        - winner: 自动赢家
    """
    data: dict[str, str] = request.get_json()
    g_datas[username].setAutoWinner(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/counters', methods=['POST'])
@login_required
def status_counters(username):
    """
    字段:
        - counters: 计数器
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_datas[username].setCounters(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200