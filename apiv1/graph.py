from flask import jsonify, request
from flask_socketio import emit
from apiv1 import apiv1
from pprint import pprint
import random


def _generate_test_graph():

    x1 = []
    x2 = []
    x3 = []
    for i in range(0, 500):
        x1.append(random.uniform(0, 1))
        x2.append(random.uniform(0, 1))
        x3.append(random.uniform(0, 1))

    trace1 = {
        "x": x1,
        "name": 'Bottom',
        "type": 'histogram',
        "autobinx": False,
        "xbins": {
            "end": 1,
            "size": 0.01,
            "start": 0
        },
        "marker": {
            "color": 'rgba(0, 125, 179, .7)',
            "line": {
                "color": 'rgba(0, 125, 179, 1)',
                "width": 1
            }
        }
    }

    trace2 = {
        "x": x2,
        "name": 'Middle',
        "type": 'histogram',
        "autobinx": False,
        "xbins": {
            "end": 1,
            "size": 0.01,
            "start": 0
        },
        "marker": {
            "color": 'rgba(0, 160, 216, .7)',
            "line": {
                "color": 'rgba(0, 160, 216, 1)',
                "width": 1
            }
        }
    }

    trace3 = {
        "x": x3,
        "name": 'Top',
        "type": 'histogram',
        "autobinx": False,
        "xbins": {
            "end": 1,
            "size": 0.01,
            "start": 0
        },
        "marker": {
            "color": 'rgba(0, 190, 246, .5)',
            "line": {
                "color": 'rgba(0, 190, 246, 1)',
                "width": 1
            }
        }
    }

    data = [trace1, trace2, trace3]

    return {
        "type": "plotly",
        "graph": {
            "data": data,
            "layout": {
                "barmode": 'stack',
                "title": 'Sample Plotly Histogram',
                "xaxis": {"title": 'X Axis Title'},
                "yaxis": {"title": 'Y Axis Title'}
            },
            "config": {
                "displayModeBar": False
            }

        }
    }


current_graph = _generate_test_graph()


@apiv1.route("/graph", methods=['GET'])
def get_graph():
    global current_graph
    return jsonify(current_graph)


@apiv1.route("/graph", methods=['POST', 'PUT'])
def save_graph():
    # pprint(request.__dict__)
    # pprint(request.get_json())
    global current_graph
    current_graph = request.get_json()
    broadcast_msg = {
        'type': 'graph',
        'id': 'none'
    }
    emit('update', broadcast_msg, namespace='/notifications', broadcast=True)
    return jsonify(current_graph)

