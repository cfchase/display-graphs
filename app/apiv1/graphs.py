from flask import jsonify, request, abort
from sqlalchemy.exc import IntegrityError

from app import db
from app.apiv1.errors import *
from app.models import Graph
from app.schemas import graph_schema, graphs_schema
from app.notifications import notify


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
    if 'label' not in json_data or 'type' not in json_data or 'graph' not in json_data:
        return bad_request('must include label, type and graph fields')
    graph = Graph.query.filter_by(label=json_data['label']).first()
    if graph:
        return update_graph(graph.id)
    graph = graph_schema.load(json_data).data
    db.session.add(graph)
    response_code = 201
    db.session.commit()
    notify(graph, 'create')
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
    notify(graph, 'update')
    response = jsonify(graph_schema.dump(graph).data)
    response.status_code = 200
    return response


@apiv1.route("/graphs/<int:pk>", methods=['DELETE'])
def delete_graph(pk):
    try:
        graph = Graph.query.get(pk)
        db.session.delete(graph)
        db.session.commit()
        notify(graph, 'delete')
    except IntegrityError:
        pass
    return '', 204


