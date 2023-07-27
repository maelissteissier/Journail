#!/bin/sh
PWD=$(realpath `dirname "$0"`)
FRONTEND_DIR=$PWD"/journail-frontend-ng"
BACKEND_DIR=$PWD"/journail_backend"


# launch Backend
# cd $PWD
source $BACKEND_DIR"/venv/bin/activate"
export PYTHONPATH=$PWD:$BACKEND_DIR:$PYTHONPATH
export CORS_ORIGIN_LOCALHOST_ANGULAR='http://localhost:4200'
export CORS_ORIGIN_LOCAL_IP_ANGULAR='http://192.168.2.31:4200'
export FLASK_PORT='5000'
export SQLALCHEMY_DATABASE_URI='sqlite:///journailing_local_dev.db'
/usr/local/bin/python3.9 $BACKEND_DIR"/app.py" &

# Launch angular frontend
cd $FRONTEND_DIR
# npm install -g @angular/cli
# npm install
ng serve --open --host 0.0.0.0

