let restify = require('restify');
let clients = require('restify-clients');

class CardValidationFactory {

  constructor() {

    throw new Error('This class is not be invoked with new');

  }

  static validate( card ) {

    return new Promise(( resolve, reject ) => {

      let restifyClient = clients.createJsonClient({
        url: 'http://localhost:3001'
      });

      restifyClient.post( '/card/authorize', card, ( err, req, res, body ) => {
        console.log(err);
        if( err ) {
          return reject( err );
        }

        return resolve( body );
  
      });

    });

  }

}

module.exports = () => CardValidationFactory;