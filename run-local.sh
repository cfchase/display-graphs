#!/bin/bash

source ./export.sh
source ./venv/bin/activate
export FLASK_DEBUG=true
python -m flask run