from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()


def create_app(app_name):
    app = Flask(app_name, static_folder='ui/build')

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    from app.apiv1 import apiv1
    app.register_blueprint(apiv1, url_prefix='/api/v1')

    return app


from app import models