from app import ma
from app.models import Graph


class GraphSchema(ma.ModelSchema):
    class Meta:
        model = Graph


graph_schema = GraphSchema()
graphs_schema = GraphSchema(many=True, only=('id', 'key', 'type'))
