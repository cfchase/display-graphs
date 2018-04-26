import os
from flask import send_from_directory
from flask_socketio import SocketIO
from app import create_app
from app.models import *
from app.schemas import *

app = create_app(__name__)
socketio = SocketIO(app)


# Serve UI static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "":
        return send_from_directory('ui/build', 'index.html')
    else:
        if os.path.exists("ui/build/" + path):
            return send_from_directory('ui/build', path)
        else:
            return send_from_directory('ui/build', 'index.html')


if __name__ == "__main__":
    socketio.run(app)


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Graph': Graph, 'GraphSchema': GraphSchema}