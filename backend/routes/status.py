from flask import Blueprint, request, jsonify
from data import g_data

status_bp = Blueprint('status', __name__)

@status_bp.route('/preload', methods=['POST'])
def status_preload():
    """
    字段:
        - preload: 预加载选项
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_data.setPreload(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/climb/<string:which>', methods=['POST'])
def status_climb(which: str):
    """
    字段:
        - success: 是否成功
        - position: 位置
        (optional)
        - height: 高度
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_data.setClimbStatus(data, which)
    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/auto-winner', methods=['POST'])
def auto_winner():
    """
    字段:
        - winner: 自动赢家
    """
    data: dict[str, str] = request.get_json()
    g_data.setAutoWinner(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/mid-position', methods=['PATCH'])
def status_mid_position():
    """
    字段:
        - precise: 中场位置
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_data.setMidPosition(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@status_bp.route('/counters', methods=['POST'])
def status_counters():
    """
    字段:
        - counters: 计数器
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_data.setCounters(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200