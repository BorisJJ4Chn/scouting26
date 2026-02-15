from copy import deepcopy


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
        print(self._data)

    def setPreMatch(self, pre_match: dict[str, str | int | bool]):
        self._data['behaviors'].update(pre_match)
        print(self._data)

    def setPreload(self, preload: dict[str, str | int | bool]):
        self._data['behaviors'].update(preload)
        print(self._data)
    
    def setAutoWinner(self, auto_winner: dict[str, str | int | bool]):
        self._data['behaviors'].update(auto_winner)
        print(self._data)

    def setClimbStatus(self, climb_status: dict[str, str | int | bool], which: str):
        for idx, action in reversed(list(enumerate(self._data['behaviors']['actions']))):
            if action['type'] == 'climb_start':
                if which == 'auto' and action['timestamp'] <= 23000:
                    self._data['behaviors']['actions'][idx].update(climb_status)
                if which == 'teleop' and action['timestamp'] > 23000:
                    self._data['behaviors']['actions'][idx].update(climb_status)
                break
        print(self._data)

    def fromCountButton(self, action: dict[str, str | int | bool]):
        self._data['behaviors']['actions'].append(action)
        print(self._data)

    def setMidPosition(self, mid_position: dict[str, str | int | bool]):
        for idx, action in reversed(list(enumerate(self._data['behaviors']['actions']))):
            print(idx)
            if action['type'] == 'collect_ball':
                if action['position'] == 'mid':
                    self._data['behaviors']['actions'][idx].update(mid_position)
                break
        
    def setCounters(self, counters: dict[str, str | int | bool]):
        self._data['behaviors']['counters'] = counters
        print(self._data)

    def makeFilenameNoExt(self) -> str:
        return f"{self._data['info']['team_number']}_{self._data['info']['match_type'][0]}{self._data['info']['match_number']}"


g_data = Data()