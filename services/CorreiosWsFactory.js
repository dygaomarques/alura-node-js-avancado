const soap = require('soap');

/**
 * Create a SOAP client to handle Correios webservice
 */
class CorreiosWsFactory {

  constructor() {
    this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
  }

  /**
   * Create a new SOAP client
   * 
   * @return {promise}
   */
  _startClient() {

    /* returning a promise */
    return new Promise(( resolve, reject ) => {

      soap.createClient(this._url, ( err, client ) => {
        
        if( err ) {
          return reject( err );
        }

        return resolve( client );

      });

    });

  }

  calcTime( dataShipping ) {

    return new Promise( async ( resolve, reject ) => {

      this._startClient().then(( client ) => {

        let params = {
          "nCdServico":   "40010",
          "sCepOrigem":   `${ dataShipping.originCep }`,
          "sCepDestino":  `${ dataShipping.destinyCep }`
        };
  
        client.CalcPrazo( params, ( err, response ) => {
          
          if( err ) {
            return reject( err );
          }
  
          return resolve( response );
  
        });

      })
      .catch(( err ) => {

        return reject( err );

      });

    });

  }

}

module.exports = () => CorreiosWsFactory;