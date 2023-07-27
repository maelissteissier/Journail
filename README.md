# JOURNAIL
[English documentation here](README_en.md)

Application web de journal alimentaire et calculateur de calories.

![Journail App](images/presentation.png)

## Mode dev : compilation et lancement 
### Lancement à partir du script

Le script `LOCAL_DEV_launch_all.sh` lance simultanément le frontend et le backend en mode développement.

**Avant de lancer le script :**  
- Dans le script, modifiez le champ `$LOCAL_NETWORK_IP` avec l'adresse IP de votre réseau local.  
- Il se peut que vous deviez décommenter l'installation d'Angular CLI et des modules la première fois, vous pourrez les commenter à nouveau par la suite.  
- Dans le fichier `journail/journail-frontend-ng/src/environment.prod.ts`, remplacez l'adresse IP par celle de votre réseau local.

### Lancement depuis Jetbrains
#### Backend
- Cliquez droit sur le fichier `app.py`, puis cliquez sur "Lancer" (Play).
- Ensuite, modifiez la configuration et ajoutez ces variables d'environnement :
PYTHONUNBUFFERED=1;  
CORS_ORIGIN_LOCALHOST=http://localhost:3000;  
CORS_ORIGIN_LOCAL_IP=http://`[VOTRE ADRESSE IP DU RÉSEAU LOCAL]`:3000;   
SQLALCHEMY_DATABASE_URI=sqlite://///`[CHEMIN ABSOLU VERS L'APPLICATION]`/journail/journail_backend/journail_local_dev.db;  
CORS_ORIGIN_LOCAL_IP_ANGULAR=http://`[VOTRE ADRESSE IP DU RÉSEAU LOCAL]`:4200;  
CORS_ORIGIN_LOCALHOST_ANGULAR=http://localhost:4200;  
PYTHONPATH=`[CHEMIN ABSOLU VERS L'APPLICATION]`/journail/journail_backend:`[CHEMIN ABSOLU VERS L'APPLICATION]`/journail/journail_backend/journail_api:$PYTHONPATH

#### Frontend
- Dans le terminal, accédez au répertoire `journail-frontend-ng`.
- Dans le fichier `journail/journail-frontend-ng/src/environment.prod.ts`, remplacez l'adresse IP par celle de votre réseau local.
- Installez Angular CLI et l'application si ce n'est pas déjà fait :
```shell
npm install -g @angular/cli
npm install
```
- Lancez l'application :
```shell
# --host 0.0.0.0 permet à l'application d'écouter sur toutes les interfaces, ce qui vous permet d'y accéder depuis votre téléphone, par exemple, et pas seulement depuis localhost. (trouvez simplement votre propre adresse IP du réseau)
ng serve --open --host 0.0.0.0
```

