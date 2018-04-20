from flask import jsonify, request
from apiv1 import apiv1
import time


@apiv1.route("/status", methods=['GET'])
def status():
    return jsonify({
        "version": "0.1",
        "status": "ok",
        "time": time.strftime('%A %B, %d %Y %H:%M:%S')
    })
