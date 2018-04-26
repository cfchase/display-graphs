from flask import Blueprint

apiv1 = Blueprint('apiv1', __name__)

from app.apiv1 import errors, status, graphs

