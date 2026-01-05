FROM node:18-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM nginx:alpine
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
