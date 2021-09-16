# build stage
FROM node:lts-alpine as build-stage
WORKDIR /frontend

COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /frontend/dist /var/www/mozi 
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]