FROM ubuntu:16.04
WORKDIR /app
COPY ./checkbox.io /app
RUN apt-get update
RUN apt-get install -y apt-transport-https
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y python-pip
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb
RUN mkdir -p /data/db
RUN pip install pymongo
RUN apt-get install -y nginx
RUN cd server-side/site && npm install
COPY ./checkbox.io/local-conf/nginx.conf /etc/nginx/nginx.conf
COPY ./checkbox.io/local-conf/default /etc/nginx/sites-available/default
ENV MONGO_USER mongo_user
ENV MONGO_PASSWORD mongo_password
ENV MONGO_IP 127.0.0.1
ENV MONGO_PORT 3002
EXPOSE 80
EXPOSE 443
EXPOSE 27017
ENTRYPOINT sh run.sh