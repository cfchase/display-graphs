from flask import Flask


def create_app(app_name):
    application = Flask(app_name, static_folder='ui/build')

    application.config.from_object(app_name)
    application.config.update(dict())

    from apiv1 import apiv1
    application.register_blueprint(apiv1, url_prefix='/api/v1')

    return application
