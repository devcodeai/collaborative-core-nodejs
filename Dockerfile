FROM node:lts-alpine

# set backend-related environment 
ENV NODE_ENV=development \
    HOST=0.0.0.0 \
    PORT=3030 

# set database-related environment 
ENV MYSQL_HOST=mysql \
    MYSQL_USER=root \
    MYSQL_DBNAME=devcode \
    MYSQL_PASSWORD=password

# create new directory '/app' (in container)
RUN mkdir -p /app

# copy all dirs/files (in local machine) to '/app' dir (in container)
COPY . /app

# set default current dir as '/app'
WORKDIR /app

# execute npm install in '/app' dir
RUN npm install

# expose port 3030 for the service
EXPOSE 3030

# start the program (already in '/app' dir)
CMD ["npm", "start"]
