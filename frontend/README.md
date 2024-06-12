# SigiesNewFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Instrucciones de la línea de comando
También puede subir archivos existentes desde su ordenador utilizando las instrucciones que se muestran a continuación.

## Configuración global de Git
git config --global user.name "miguel medina ramirez"
git config --global user.email "mmramirez@uci.cu"

## Crear un nuevo repositorio
git clone git@gitlab.prod.uci.cu:fortes/sigies-new-front.git
cd sigies-new-front
git switch --create main
touch README.md
git add README.md
git commit -m "add README"
git push --set-upstream origin main

## Push a una carpeta existente
cd existing_folder
git init --initial-branch=main
git remote add origin git@gitlab.prod.uci.cu:fortes/sigies-new-front.git
git add .
git commit -m "Initial commit"
git push --set-upstream origin main

## Push a un repositorio de Git existente
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.prod.uci.cu:fortes/sigies-new-front.git
git push --set-upstream origin --all
git push --set-upstream origin --tags
