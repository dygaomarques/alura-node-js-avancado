class PayamentsDao {

  constructor( connection ) {

    this._connection = connection;

  }

  save( data ) {
    
    return new Promise( ( resolve, reject ) => {

      this._connection.query( "INSERT INTO payaments SET ?", data, ( error, result ) => {

        if ( error ) {
          return reject( error );
        }

        return resolve( result );

      });


    });

  }

  read() {
    
    let sql = 'SELECT * FROM payaments';
    
    return new Promise( ( resolve, reject ) => {
      
      this._connection.query(sql, ( error, results, fields ) => {
        if( error ) {
          return reject( error.stack );
        }
  
        return resolve( results );
      });

    });

  }

  /**
   * Method to update some payamente in the database
   * @param { json object } data
   * 
   * @return { json object }
   */
  update( data ) {
    
    /* Returning a promisse */
    return new Promise( ( resolve, reject ) => {

      /* Run SQL query in the database */
      this._connection.query( "UPDATE payaments SET status = ? WHERE id = ?", [ data.status, data.id ], ( error, result ) => {

        /* If have erros return it */
        if ( error ) return reject( error );

        /* Returning the result */
        return resolve( result );

      });


    });

  }



}

module.exports = () => PayamentsDao;