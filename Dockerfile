# Dockerfile

FROM node:alpine as build-stage
WORKDIR /app
COPY package.json /app
RUN npm install --no-cache
#RUN npm install -g serve
COPY . .
#ENV PORT="8080"
RUN npm run build
#CMD ["serve", "-s", "build"]

FROM nginx:latest
USER root
#RUN  sed -i /etc/nginx/conf.d/default.conf -e 's/80;/8080;/g' &&\
#     chmod -R 777 / ; exit 0
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 777 / ; exit 0
COPY --from=build-stage /app/build /usr/share/nginx/html
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
