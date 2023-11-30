from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)

# Enable CORS
CORS(app)

# Temporary storage for meetings
meetings = []

# Route to get all meetings
@app.route('/meetings', methods=['GET'])
def get_meetings():
    return jsonify(meetings)

# Route to add a new meeting
@app.route('/meetings', methods=['POST'])
def add_meeting():
    meeting_data = request.json
    meetings.append(meeting_data)
    return jsonify(meeting_data), 201

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
