FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["./node_modules/.bin/ng", "build", "--output-path=/journail_frontend_build_from_docker/out"]


