from flask import Blueprint, request, jsonify
from data import g_datas
from auth import login_required

unique_bp = Blueprint('unique', __name__)

@unique_bp.route('/init', methods=['POST'])
@login_required
def unique_init(username):
    """
    字段:
        - team_number: 队伍编号
        - alliance:  alliances颜色
        - match_type: 比赛类型
        - match_number: 比赛编号
    """
    data: dict[str, str | int | bool] = request.get_json()
    data['recorder'] = username
    g_datas[username].setInit(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200

@unique_bp.route('/pre_match', methods=['POST'])
@login_required
def unique_pre_match(username):
    """
    字段:
        - platform: 操作台位置
        - position: 起步位置
    """
    data: dict[str, str | int | bool] = request.get_json()
    g_datas[username].setPreMatch(data)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200
