const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', error => {
    console.log(error.name, error.message);
    process.exit(1);
});

const http = require('http');
const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB)
    .then(con => {
        console.log('Connected to MongoDB!');
    }
    );

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log('Server is listening on port: 8080...');
    console.log("NODE_ENV: " + process.env.NODE_ENV);
});

process.on('unhandledRejection', error => {
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});