module.exports = ( app ) => {

  /* POST to calculate the time of shipping */
  app.post('/shipping/calc/time', ( req, res ) => {

    let dataShipping = req.body;

    new app.services.CorreiosWsFactory().calcTime( dataShipping )
      .then(( response ) => {

        console.log(JSON.stringify( response, null, 2 ));
        res.send( response );

      })
      .catch(( err ) => {

        console.log( err );

        res.status( 400 ).send({ error: "Ocorreu um erro ao processar a requisição" });

      });

  });

}