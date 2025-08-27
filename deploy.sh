#!/bin/bash
set -e

APP_NAME="tride_dashboard"
CONTAINER_NAME="dashboard"
BRANCH="main"
PORT=3000

echo "🔄 Pulling latest changes from GitHub..."
git pull origin $BRANCH

echo "🛑 Stopping old container (if exists)..."
docker rm -f $CONTAINER_NAME || true

echo "🔪 Killing any process using port $PORT..."
if lsof -i :$PORT >/dev/null 2>&1; then
  PID=$(lsof -ti tcp:$PORT)
  if [ -n "$PID" ]; then
    kill -9 $PID
    echo "✅ Killed process $PID using port $PORT."
  fi
else
  echo "ℹ️ No process found using port $PORT."
fi

echo "🐳 Building new Docker image..."
docker build -t $APP_NAME .

echo "🚀 Starting new container..."
docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $APP_NAME

echo "✅ Deployment complete! App is live on http://145.223.90.241:$PORT"