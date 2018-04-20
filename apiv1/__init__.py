from flask import Blueprint

apiv1 = Blueprint('apiv1', __name__)

from apiv1 import status, graph

