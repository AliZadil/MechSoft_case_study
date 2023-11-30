from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Temporary storage for meetings
meetings = []

@app.route('/meetings', methods=['GET'])
def get_meetings():
    # You might want to sort meetings by date here
    sorted_meetings = sorted(meetings, key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'))
    return jsonify(sorted_meetings)

@app.route('/meetings', methods=['POST'])
def add_meeting():
    meeting_data = request.json

    # Basic validation (e.g., check for required fields)
    if 'topic' in meeting_data and 'date' in meeting_data:
        meetings.append(meeting_data)
        return jsonify(meeting_data), 201
    else:
        return jsonify({"error": "Missing required fields"}), 400

# Optional: Endpoint for editing a meeting
@app.route('/meetings/<int:meeting_id>', methods=['PUT'])
def edit_meeting(meeting_id):
    global meetings
    meeting_data = request.json
    for i, meeting in enumerate(meetings):
        if meeting['id'] == meeting_id:
            meetings[i] = meeting_data
            return jsonify(meeting_data), 200
    return jsonify({"error": "Meeting not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
