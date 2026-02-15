import os
from flask import Flask
from flask_cors import CORS
from flask import jsonify
import json

from routes.unique import unique_bp
from routes.action import action_bp
from routes.status import status_bp

from data import g_data


app = Flask(__name__)
CORS(app)

app.register_blueprint(unique_bp, url_prefix='/api')
app.register_blueprint(action_bp, url_prefix='/api')
app.register_blueprint(status_bp, url_prefix='/api')

@app.route('/api/over', methods=['POST'])
def over():

    filename = g_data.makeFilenameNoExt() + '.json'

    if not os.path.exists('./data/raw'):
        os.makedirs('./data/raw')

    shifts = [True] * 4
    if g_data._data['behaviors']['auto_winner'] == 'red':
        shifts[0] = False
        shifts[2] = False
    else:
        shifts[1] = False
        shifts[3] = False
    for idx, action in enumerate(g_data._data['behaviors']['actions']):
        for i in range(4):
            if 55000 + i * 25000 < action['timestamp'] <= 58000 + i * 25000:
                shifts[i] = False
                break
    for i in range(4):
        if shifts[i]:
            g_data._data['behaviors']['actions'].append({
                'timestamp': 55000 + i * 25000,
                'type': 'give up',
            })
    
    g_data._data['behaviors']['actions'].sort(key=lambda x: x['timestamp'])

    with open(os.path.join('./data/raw', filename), 'w') as f:
        json.dump(g_data._data, f, indent=4)

    return jsonify({
        'code': 200,
        'message': 'Success'
        }), 200


if __name__ == '__main__':
    app.run(debug=True, port=3000)
