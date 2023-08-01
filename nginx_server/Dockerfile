FROM alpine:3.14
RUN apk add nginx

WORKDIR /frontend

COPY . /frontend

RUN mkdir logs

CMD ["nginx", "-g", "daemon off;", "-p", ".", "-c", "nginx.conf"]