mongod --fork --logpath /var/log/mongo.log
mongo admin --eval "db.createUser({ user: 'mongo_user', pwd: 'mongo_password', roles: [ { role: 'userAdminAnyDatabase', db: 'admin' }, { role: 'dbAdmin', db: 'admin' }, { role: 'readWriteAnyDatabase', db: 'admin' } ] });"
service nginx restart
cd server-side/site && nodejs server.js