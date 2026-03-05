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

    def fromCountButton(self, action: dict[str, str | int | bool]):
        self._data['behaviors']['actions'].append(action)

    def setMidPosition(self, mid_position: dict[str, str | int | bool]):
        for idx, action in reversed(list(enumerate(self._data['behaviors']['actions']))):
            if action['type'] == 'collect_ball':
                if action['position'] == 'mid':
                    self._data['behaviors']['actions'][idx].update(mid_position)
                break
        
    def setCounters(self, counters: dict[str, str | int | bool]):
        self._data['behaviors']['counters'] = counters

    def makeFilenameNoExt(self) -> str:
        return f"{self._data['info']['team_number']}_{self._data['info']['region']}_{self._data['info']['match_type'][0]}{self._data['info']['match_number']}{'_' + self._data['info']['record_date'] if self._data['info'].get('record_date') else ''}"

    def read(self, filename: str):
        with open(filename, 'r') as f:
            self._data = json.load(f)

    def after(self):
        self._data['behaviors']['actions'].sort(key=lambda x: x['timestamp'])

        print(self._data)

g_datas = dict()