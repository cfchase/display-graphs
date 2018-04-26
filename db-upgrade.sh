#!/bin/bash

source ./export.sh
source ./venv/bin/activate
flask db upgrade
