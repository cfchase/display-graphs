#!/bin/bash

source ./secrets
export DB_TYPE=$DB_TYPE
export DB_HOST=$DB_HOST
export DB_PORT=$DB_PORT
export DB_NAME=$DB_NAME
export DB_USER=$DB_USER
export DB_PASSWORD=$DB_PASSWORD

export FLASK_APP=wsgi.py
export FLASK_DEBUG=true

source ./venv/bin/activate
