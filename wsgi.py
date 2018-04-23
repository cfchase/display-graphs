import os
from flask import send_from_directory
from factory import create_app
from flask_socketio import SocketIO

application = create_app(__name__)
socketio = SocketIO(application)


# Serve UI static files
@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def serve(path):
    if path == "":
        return send_from_directory('ui/build', 'index.html')
    else:
        if os.path.exists("ui/build/" + path):
            return send_from_directory('ui/build', path)
        else:
            return send_from_directory('ui/build', 'index.html')


if __name__ == "__main__":
    socketio.run(application)
