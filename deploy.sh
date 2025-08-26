#!/bin/bash
set -e

APP_NAME="tride_dashboard"
CONTAINER_NAME="dashbord"
BRANCH="main"

echo "🔄 Pulling latest changes from GitHub..."
git pull origin $BRANCH

echo "🐳 Building new Docker image..."
docker build -t $APP_NAME .

echo "🛑 Stopping old container (if exists)..."
docker rm -f $CONTAINER_NAME || true

echo "🚀 Starting new container..."
docker run -d -p 3000:3000 --name $CONTAINER_NAME $APP_NAME

echo "✅ Deployment complete! App is live on http://145.223.90.241:3000"
