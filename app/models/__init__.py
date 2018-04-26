from app import db
from sqlalchemy.dialects.postgresql import JSON


class Graph(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(256), index=True, unique=True)
    type = db.Column(db.String(32))
    graph = db.Column(JSON)

    def __repr__(self):
        return '<Graph {} {} {}>'.format(self.id, self.key, self.type)
