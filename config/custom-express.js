const express     = require('express');
const consign     = require('consign');
const bodyParser  = require('body-parser');
const validate    = require( 'express-validator' );

module.exports = () => {

  const app = express();

  /* Middlewares */
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );
  app.use( validate() );

  consign()
    .include('controllers')
    .then('services')
    .then('dao')
    .into(app);
  
  return app;

}