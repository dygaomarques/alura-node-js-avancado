/**
 * Class to handle payaments CRUD
 */
class PayamentsDao {

  constructor( connection ) {

    /* Receiving the connection with database */
    this._connection = connection;

  }

  /**
   * Save the payament to DataBase
   * 
   * @param {json} data the payament
   * 
   * @returns {promise} payament save status
   */
  save( data ) {
    
    /* Returning the promise */
    return new Promise( ( resolve, reject ) => {

      /* Executing the query */
      this._connection.query( "INSERT INTO payaments SET ?", data, ( error, result ) => {

        /* Return the errors */
        if ( error ) { return reject( error ) }

        /* Return the result of the query */
        return resolve( result );

      });

    });

  }

  /**
   * Read a payament from the database
   * 
   * @returns {promise} payaments list
   */
  read() {
    
    /* The SQL Syntrax */
    let sql = 'SELECT * FROM payaments';
    
    /* Return the promise */
    return new Promise( ( resolve, reject ) => {
      
      /* Executing the query */
      this._connection.query(sql, ( error, results, fields ) => {
        
        /* Return the errors */
        if( error ) { return reject( error.stack ) }
        
        /* Rerturn the payaments list */
        return resolve( results );

      });

    });

  }

  /**
   * Read a payament from the database
   * 
   * @param {int} id payament ID
   * 
   * @returns {promise} payaments list
   */
  readByID( id ) {
    
    /* The SQL Syntrax */
    let sql = 'SELECT * FROM payaments WHERE id = ?';
    
    /* Return the promise */
    return new Promise( ( resolve, reject ) => {
      
      /* Executing the query */
      this._connection.query(sql, id, ( error, results, fields ) => {
        
        /* Return the errors */
        if( error ) { return reject( error.stack ) }
        
        /* Rerturn the payaments list */
        return resolve( results[0] );
        
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