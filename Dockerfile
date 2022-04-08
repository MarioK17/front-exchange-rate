FROM node:14-alpine as build-step

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist/front-exchange-rate /usr/share/nginx/html
