import random

from flask import jsonify, request, abort
from flask_socketio import emit
from sqlalchemy.exc import IntegrityError

from app import db
from app import apiv1
from app.apiv1.errors import *
from app.models import Graph
from app.schemas import graph_schema, graphs_schema

from pprint import pprint


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
        "user": "test-user",
        "key": "initial_graph",
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


@apiv1.route("/graphs", methods=['GET'])
def get_graphs():
    graphs = Graph.query.filter_by(**request.args.to_dict()).all()
    return jsonify(graphs_schema.dump(graphs).data)


@apiv1.route("/graphs/<int:pk>", methods=['GET'])
def get_graph(pk):
    try:
        graph = Graph.query.get(pk)
    except IntegrityError:
        abort(404)
    return jsonify(graph_schema.dump(graph).data)


@apiv1.route("/graphs", methods=['POST'])
def create_or_update_graph():
    json_data = request.get_json() or {}
    search_key = json_data['key']
    if 'key' not in json_data or 'type' not in json_data or 'graph' not in json_data:
        return bad_request('must include key, type and graph fields')
    graph = Graph.query.filter_by(key=search_key).first()
    if not graph:
        graph = graph_schema.load(json_data).data
        db.session.add(graph)
        response_code = 201
    else:
        graph_schema.load(json_data, instance=graph)
        response_code = 200
    db.session.commit()
    response = jsonify(graph_schema.dump(graph).data)
    response.status_code = response_code
    return response


@apiv1.route("/graphs/<int:pk>", methods=['POST', 'PUT', 'PATCH'])
def update_graph(pk):
    json_data = request.get_json() or {}
    try:
        graph = Graph.query.get(pk)
    except IntegrityError:
        abort(404)
    graph_schema.load(json_data, instance=graph)
    db.session.commit()
    response = jsonify(graph_schema.dump(graph).data)
    response.status_code = 200
    return response


@apiv1.route("/graphs/<int:pk>", methods=['DELETE'])
def delete_graph(pk):
    try:
        graph = Graph.query.get(pk)
        db.session.delete(graph)
        db.session.commit()
    except IntegrityError:
        pass
    return '', 204


