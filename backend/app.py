from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/utils/randint', methods=['GET'])
def _get_api_utils_randint():
    random_number = random.randint(0, 100)
    return jsonify({'result': random_number})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
