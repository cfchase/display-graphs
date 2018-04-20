#!/bin/bash

source ./venv/bin/activate
export FLASK_APP=wsgi.py
export FLASK_DEBUG=true
python -m flask run