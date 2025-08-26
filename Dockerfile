FROM node:20-alpine AS builder

WORKDIR /tride_dashboard

COPY package*.json ./
RUN npm install -f

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
