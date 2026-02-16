#!/bin/bash

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Erreur : Fichier .env introuvable."
  exit 1
fi

: "${DEPLOY_USER:?Faut définir DEPLOY_USER dans .env}"
: "${DEPLOY_IP:?Faut définir DEPLOY_IP dans .env}"
: "${DEPLOY_DEST:?Faut définir DEPLOY_DEST dans .env}"
: "${DEPLOY_BACKUP:?Faut définir DEPLOY_BACKUP dans .env}"


echo "Build du projet..."
pnpm build

echo "Backup de la version actuelle sur le serveur..."
ssh $DEPLOY_USER@$DEPLOY_IP "if [ -d $DEPLOY_DEST ]; then rm -rf $DEPLOY_BACKUP && cp -r $DEPLOY_DEST $DEPLOY_BACKUP; echo ' Backup terminé.'; else echo 'ℹPas de version existante, saut du backup.'; fi"
echo "Synchronisation (Rsync) vers $DEPLOY_DEST..."
rsync -avz --delete --no-g \
      --chmod=D2775,F664 \
      dist/ $DEPLOY_USER@$DEPLOY_IP:$DEPLOY_DEST/

echo "Déploiement terminé avec succès !"
