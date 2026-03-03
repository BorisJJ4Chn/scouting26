from copy import deepcopy
import json


class Data:
    def __init__(self):
        self._init_data_ = {
            'info': {},
            'behaviors': {
                'actions': []
            }
        }

        self._data = deepcopy(self._init_data_)

    def setInit(self, init: dict[str, str | int | bool]):
        self._data = deepcopy(self._init_data_)
        self._data['info'].update(init)

    def setPreMatch(self, pre_match: dict[str, str | int | bool]):
        self._data['behaviors'].update(pre_match)

    def setPreload(self, preload: dict[str, str | int | bool]):
        self._data['behaviors'].update(preload)
    
    def setAutoWinner(self, auto_winner: dict[str, str | int | bool]):
        self._data['behaviors'].update(auto_winner)

    def setClimbStatus(self, climb_status: dict[str, str | int | bool], which: str):
        for idx, action in reversed(list(enumerate(self._data['behaviors']['actions']))):
            if action['type'] == 'climb_start':
                if which == 'auto' and action['timestamp'] <= 23000:
                    self._data['behaviors']['actions'][idx].update(climb_status)
                if which == 'teleop' and action['timestamp'] > 23000:
                    self._data['behaviors']['actions'][idx].update(climb_status)
                break

    def fromCountButton(self, action: dict[str, str | int | bool]):
        self._data['behaviors']['actions'].append(action)

    def setMidPosition(self, mid_position: dict[str, str | int | bool]):
        for idx, action in reversed(list(enumerate(self._data['behaviors']['actions']))):
            print(idx)
            if action['type'] == 'collect_ball':
                if action['position'] == 'mid':
                    self._data['behaviors']['actions'][idx].update(mid_position)
                break
        
    def setCounters(self, counters: dict[str, str | int | bool]):
        self._data['behaviors']['counters'] = counters

    def makeFilenameNoExt(self) -> str:
        return f"{self._data['info']['team_number']}_{self._data['info']['region']}_{self._data['info']['match_type'][0]}{self._data['info']['match_number']}"

    def read(self, filename: str):
        with open(filename, 'r') as f:
            self._data = json.load(f)

    def after(self):
        self._data['behaviors']['actions'].sort(key=lambda x: x['timestamp'])

        shifts = [True] * 4
        if self._data['behaviors']['auto_winner'] == 'red':
            shifts[0] = False
            shifts[2] = False
        else:
            shifts[1] = False
            shifts[3] = False
        for action in reversed(self._data['behaviors']['actions']):
            for i in range(4):
                if shifts[i] and 55000 + i * 25000 < action['timestamp'] <= 58000 + i * 25000:
                    shifts[i] = False
                    action['timestamp'] = 58000 + i * 25000
                    break
        for i in range(4):
            if shifts[i]:
                self._data['behaviors']['actions'].append({
                    'timestamp': 55000 + i * 25000,
                    'type': 'give_up',
                })

        last_give_up = None
        new_actions = []
        climbs = [False, False]
        for action in self._data['behaviors']['actions']:
            if action['type'] == 'give_up':
                last_give_up = action
                self._data['behaviors']['actions'].remove(action)
            else:
                if last_give_up:
                    new_actions.append(last_give_up)
                    last_give_up = None
                new_actions.append(action)
                if action['type'] == 'climb_start':
                    climbs[action['timestamp'] > 23000] = True
        new_actions.append({
            'timestamp': 23000,
            'type': 'climb_end',
        })
        new_actions.append({
            'timestamp': 166000,
            'type': 'climb_end',
        })

        self._data['behaviors']['actions'] = new_actions
        
        self._data['behaviors']['actions'].sort(key=lambda x: x['timestamp'])

        print(self._data)

g_datas = dict()