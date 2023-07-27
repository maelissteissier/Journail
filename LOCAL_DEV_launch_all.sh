#!/bin/sh
PWD=$(realpath `dirname "$0"`)
FRONTEND_DIR=$PWD"/journail-frontend-ng"
BACKEND_DIR=$PWD"/journail_backend"
API_DIR=$BACKEND_DIR"/journail_api"
$LOCAL_NETWORK_IP="192.168.2.31"


# launch Backend
# cd $PWD
source $API_DIR"/venv/bin/activate"
export PYTHONPATH=$BACKEND_DIR:$API_DIR:$PYTHONPATH
echo $PYTHONPATH
export CORS_ORIGIN_LOCALHOST_ANGULAR='http://localhost:4200'
export CORS_ORIGIN_LOCAL_IP_ANGULAR='http://'$LOCAL_NETWORK_IP':4200'
export FLASK_PORT='5000'
export SQLALCHEMY_DATABASE_URI='sqlite:////'$BACKEND_DIR'/journail_local_dev.db'
/usr/local/bin/python3.9 $API_DIR"/app.py" &

# Launch angular frontend
cd $FRONTEND_DIR
# npm install -g @angular/cli
# npm install
ng serve --open --host 0.0.0.0