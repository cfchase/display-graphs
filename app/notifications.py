from flask_socketio import emit


def notify(graph, operation):
    msg = {
        'type': 'graph',
        'operation': operation,
        'id': graph.id,
        'related': []
    }
    emit(operation, msg, namespace='/notifications', broadcast=True)