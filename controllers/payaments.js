module.exports = ( app ) => {

  /* Read payaments */
  app.get( '/payaments', async ( req, res ) => {

    console.log('Requisição recebida!');
    
    /* Create an conection with database */
    let connection = app.services.ConnectionFactory.connection();

    /* Read the payaments from database */
    new app.dao.PayamentsDao( connection ).read()
      .then( ( result ) => res.send( result ) );
  
  });

  /* Save payament */
  app.post( '/payaments/payament', ( req, res ) => {

    /* Validating the fields */
    req.assert( 'payament.method', 'The payament method is not null.' ).notEmpty();
    req.assert( 'payament.value', 'The value is not valid.' ).notEmpty().isFloat();
    req.assert( 'payament.currency', 'The currency is not valid').notEmpty();
    req.assert( 'payament.description', 'The description is not be empty' ).notEmpty();

    let validateResult = req.validationErrors();

    /* Return error if validade result is true */
    if ( validateResult ) {

      console.log( validateResult );

      /* Return validations result */
      res.status(400).send( validateResult );
      return;

    } else {
      
      /* Configuring the payament */
      let payament = req.body['payament'];
      
      payament.status = 'CREATED';
      payament.date = new Date;
      
      /* Parse the card */
      let card = req.body['card'];
      
      console.log(payament);
      
      /* Create new connection */
      let connection = app.services.ConnectionFactory.connection();
      
      /* Saving the payament */
      new app.dao.PayamentsDao( connection ).save( payament )
        .then( ( result ) => {

          /* Defining the payament id */
          payament.id = result.insertId;

          /* Authorizing the card */
          if ( payament.method == 'card' ) {

             /* Invoking the card validation factory */
            app.services.CardValidationFactory.validate( card )
          
              /* Run if payament is authorized */
              .then(( data ) => { 
                
                console.log('Card authorized');

                /* Return the location of new resource */
                res.location( `payaments/payament/${payament.id}` );

                /* Response + HATEOAS */
                let response = {
                  payament: payament,
                  card:     data,
                  links: [
                    {
                      href:   "http://localhost:3000/payaments/payament/" + payament.id,
                      rel:    "Confirm payament",
                      method: "PUT"
                    },
                    {
                      href:   "http://localhost:3000/payaments/payament/" + payament.id,
                      rel:    "Cancel payament",
                      method: "DELETE"
                    }
                  ]
                }

                /* Return the payament status */
                res.status( 201 ).send( response );

                /* Stoping the execution */
                return;
      
              })
              
              /* Error handling */
              .catch(( err ) => {
                
                console.log(err);
                console.log('Card Unauthorized: ', err );
                payament.status = 'CREATED';
                return;
      
              });

          } else {

            /* Return the location of new resource */
            res.location( `payaments/payament/${payament.id}` );

            /* Response + HATEOAS */
            let response = {
              payament: payament,
              links: [
                {
                  href:   "http://localhost:3000/payaments/payament/" + payament.id,
                  rel:    "Confirm payament",
                  method: "PUT"
                },
                {
                  href:   "http://localhost:3000/payaments/payament/" + payament.id,
                  rel:    "Cancel payament",
                  method: "DELETE"
                }
              ]
            }
            
            /* Return the payament status */
            res.status( 201 ).send( response );

          }

        })
        
        /* Returning an error if payament is not created */
        .catch( ( err ) => {

          /* Return an error if payament save is not successful */
          res.status( 500 ).send( err );

        });
    }
  
  });

  /* Update payament */
  app.put( '/payaments/payament/:id', ( req, res ) => {

    payament.status = 'CONFIRMED';
    payament.id = req.params.id;

    /* Create new connection */
    let connection = app.services.ConnectionFactory.connection();

    new app.dao.PayamentsDao( connection ).update( payament )
      .then(( data ) => {
        let message = `Payament ${ payament.id } confirmed!`;

        console.log({
          message:  message,
          result:   data
        });

        res.status( 200 ).send({ message: message });

      }).catch(( error ) => {

        res.status( 500 ).send({ error });

      });

  });

  /**
   * Route to delete a payament
   */
  app.delete( '/payaments/payament/:id', ( req, res ) => {

    let payament = {};

    payament.status = 'CANCELLED';
    payament.id = req.params.id;

    /* Create new connection */
    let connection = app.services.ConnectionFactory.connection();

    new app.dao.PayamentsDao( connection ).update( payament )
      .then(( data ) => {
        let message = `Payament ${ payament.id } cancelled!`;

        console.log({
          message:  message,
          result:   data
        });
        
        res.status( 204 ).send({ message: message });

      }).catch(( error ) => {

        res.status( 500 ).send({ error });

      });

  });

}