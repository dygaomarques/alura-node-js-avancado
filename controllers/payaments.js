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

    console.log('Requisição recebida!');

    /* Validating the fields */
    req.assert( 'method', 'The payament method is not null.' ).notEmpty();
    req.assert( 'value', 'The value is not valid.' ).notEmpty().isFloat();
    req.assert( 'currency', 'The currency is not valid').notEmpty();
    req.assert( 'description', 'The description is not be empty' ).notEmpty();

    let validateResult = req.validationErrors();

    /* Return error if validade result is true */
    if ( validateResult ) {

      console.log( validateResult );

      /* Return validations result */
      res.status(400).send( validateResult );
      return;

    } else {
      
      /* Configuring the payament */
      let payament = req.body;
      payament.status = 'CREATED';
      payament.date = new Date;
      
      console.log(payament);
      
      /* Create new connection */
      let connection = app.services.ConnectionFactory.connection();
      
      /* Saving the payament */
      new app.dao.PayamentsDao( connection ).save( payament )
        .then( ( result ) => {

          console.log( result );

          /* Return the location of new resource */
          res.location( `payaments/payament/${result.insertId}` );
          
          /* Return the payament status */
          res.status( 201 ).send( { message: "Payament created!", payament } );

        }).catch( ( err ) => {

          /* Return an error if payament save is not successful */
          res.status( 500 ).send( err );

        });
    }
  
  });

  /* Update payament */
  app.put( '/payaments/payament/:id', ( req, res ) => {

    let payament = {};

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

}