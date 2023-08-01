# JOURNAIL
[Documentation française içi](README.md)

Food journaling and calorie counter web application

![Journail App](images/presentation.png)

## PROD Mode with Docker
### Dependencies:
- Node (v19.4.0 used for this project): for compilation
- Docker
- Make

### Compilation and Launching
Execute the command:
```shell
make start
```

This command uses `make` to compile the Angular application in 
***production mode*** (extracts static files), then compiles the 
Docker containers for the `Flask` API and the `nginx` server that 
serves both the backend and frontend applications. It then launches both containers with `docker-compose`.

A (french) database is pre-filled with foods and their true nutritional values for easy testing.

## DEV mode : build and launch

### Launch from script

The script `LOCAL_DEV_launch_all.sh` launches the frontend and the backend at the same time in dev mode.

**Before launching the script :**  
- In the script, edit the `$LOCAL_NETWORK_IP` field with your own local network ip.  
- You might need to uncomment the installing of Angular CLI and modules the first time but then you can comment them again.  
- In the file `journail/journail-frontend-ng/src/environment.prod.ts` change the IP for your own local network IP.  

### Launching from Jetbrain
***This mode allows launching the application in debug mode with JetBrains tools.***
#### Backend
- Right click on the app.py file then press play.
- then edit the configuration and add those environement variables :
PYTHONUNBUFFERED=1;  
CORS_ORIGIN_LOCALHOST=http://localhost:3000;  
CORS_ORIGIN_LOCAL_IP=http://`[YOUR LOCAL NETWORK IP]`:3000;   
SQLALCHEMY_DATABASE_URI=sqlite://///`[ABSOLUTE PATH TO THE APP]`/journail/journail_backend/journail_local_dev.db;  
CORS_ORIGIN_LOCAL_IP_ANGULAR=http://`[YOUR LOCAL NETWORK IP]`:4200;  
CORS_ORIGIN_LOCALHOST_ANGULAR=http://localhost:4200;  
PYTHONPATH=`[ABSOLUTE PATH TO THE APP]`/journail/journail_backend:`[ABSOLUTE PATH TO THE APP]`/journail/journail_backend/journail_api:$PYTHONPATH

#### Frontend
- In the terminal go to the `journail-frontend-ng` directory.  
- In the file `journail/journail-frontend-ng/src/environment.prod.ts` change the IP for your own local network IP.
- Install Angular CLI and the app if not already done :
```shell
npm install -g @angular/cli
npm install
```
- Launch the app:
```shell
# --host 0.0.0.0 makes the app listen on every interface so you can access the app from your phone 
# for example and not only localhost. (just find your own network IP)
ng serve --open --host 0.0.0.0
```