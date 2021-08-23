FROM node:14 as build

WORKDIR /opt/app
COPY ./micronode-fe .

RUN yarn
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /opt/app/build /usr/share/nginx/html
COPY --from=build /opt/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]