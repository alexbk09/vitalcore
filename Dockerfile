FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
VOLUME ["/app/node_modules"]
RUN npm i -g vite
RUN npm ci
COPY . .
RUN npm run staging

## Stage 2
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
