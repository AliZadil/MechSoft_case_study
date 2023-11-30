from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

meetings = []
current_id = 1

@app.route('/meetings', methods=['GET'])
def get_meetings():
    sorted_meetings = sorted(meetings, key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'))
    return jsonify(sorted_meetings)

@app.route('/meetings/<int:meeting_id>', methods=['GET'])
def get_meeting(meeting_id):
    for meeting in meetings:
        if meeting['id'] == meeting_id:
            return jsonify(meeting), 200
    return jsonify({"error": "Meeting not found"}), 404


@app.route('/meetings', methods=['POST'])
def add_meeting():
    global current_id
    meeting_data = request.json

    required_fields = ['topic', 'date', 'startTime', 'endTime', 'participants']
    if all(field in meeting_data for field in required_fields):
        meeting_data['id'] = current_id
        current_id += 1
        meetings.append(meeting_data)
        return jsonify(meeting_data), 201
    else:
        return jsonify({"error": "Missing required fields"}), 400

@app.route('/meetings/<int:meeting_id>', methods=['PUT'])
def edit_meeting(meeting_id):
    meeting_data = request.json
    for i, meeting in enumerate(meetings):
        if meeting['id'] == meeting_id:
            meetings[i] = meeting_data
            return jsonify(meeting_data), 200
    return jsonify({"error": "Meeting not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
