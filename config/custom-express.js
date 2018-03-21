const express     = require('express');
const consign     = require('consign');
const bodyParser  = require('body-parser');
const validate    = require('express-validator');
const morgan      = require('morgan');

const LoggerFactory = require('../services/LoggerFactory.js')();

module.exports = () => {

  const app = express();

  /* Middlewares */
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );
  app.use( validate() );
  app.use( morgan('dev', {
    stream: {
      write: ( message ) => {
        new LoggerFactory().log('info', message);
      }
    }
  }) );

  consign()
    .include('controllers')
    .then('services')
    .then('dao')
    .into(app);
  
  return app;

}