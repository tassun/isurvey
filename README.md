## Survey Project

This is project made of node application server with http/https protocol by express engine

## Installation

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal in the root directory of this project:

```shell
npm install
npm run build
npm run start
```

The project will run at http://localhost:8080/

## Setup
Since this project required database setup before starting you have to create database schema by run sql file under folder `/database/legaldb_mysql.sql` this sql snippet file come with MySQL.

## Configuration
After setup database you may change configuration setting to access your database by `/config/default.json`. see more detail [will-sql](https://www.npmjs.com/package/will-sql)

In case of setting http connection especially port (default at 8080) can be config by `/config/default.json` or environment setting in command prompt \
ex. \
Window 

    set HTTP_PORT=8888
    set HTTPS_PORT=8843 

Linux 

    export HTTP_PORT=8888
    export HTTPS_PORT=8843 

In case of HTTPS setting can be defined by environment variables 

    EXPRESS_HTTPS=true
    EXPRESS_KEY=/path/to/file/key.pem
    EXPRESS_CERT=/path/to/file/cert.pem

Redirect response from http to https protocol can set by

    HTTPS_REDIRECT=true

#### Creating SSL Certificate
To generate SSL certificates, use OpenSSL. Follow the steps below to create a self-signed SSL certificate.

##### 1. Generate a new private key by entering the following command

    openssl genrsa -out key.pem 2048

##### 2. Generate a certificate signing request (CSR) by entering the following command

    openssl req -new -key key.pem -out csr.pem

##### 3. Generate a self-signed SSL certificate by entering the following command

    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem


## Health Check

This project contains health check API that it can invoke by [curl](https://curl.se/download.html):

* curl http://localhost:8080/health 
