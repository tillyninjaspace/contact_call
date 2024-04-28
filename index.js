require('dotenv').config();

const { PORT = 4000, EMAIL } = process.env;

const express = require('express');
const server = express();
const router = express.Router();

const axios = require('axios');

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.static('public'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use("/", router);
server.use('/api', require('./routes'));

server.listen(PORT, () => {
    console.log('I am listening...for a contact.');
  });