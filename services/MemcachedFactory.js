const memcached = require('memcached');

class MemcachedFactory {

  constructor() {

    this._client = new memcached('localhost:11211', {
      retries: 10,
      retry: 10000,
      remove: true
    });

  }
  /**
   * Method to get cache
   * 
   * @param {int} key
   * @returns {promise}
   */
  getCache( key ) {

    /* Returning a promise */
    return new Promise((resolve, reject) => {

      /* Getting the payament from the cache */
      this._client.get('payament-' + key, ( err, result ) => {
        
        /* Send if the cache key is not found */
        if( err || !result ) {
          reject('Key not found.');
        }

        console.log('Key founded in cache: ' + JSON.stringify(result, null, 2));

        /* Sending the result */
        resolve(result);

      });

    });
  }

  /**
   * Method to set cache
   * 
   * @param {int} key 
   * @param {json} data 
   * @return {promise}
   */
  setCache( key, data ) {

    /* Returnig a promise */
    return new Promise((resolve, reject) => {

      /* Set the cache with a key */
      this._client.set('payament-' + key, data, 60000, ( err, result ) => {
        
        /* Returning a error if a cache is not set */
        if( err || !result ) {
          console.log(err);
          reject('Key not set.');
        }

        /* Return the key created */
        resolve('Key created: ' + key);

      });

    });

  }

  /**
   * Method to delete a key
   * 
   * @param {int} key 
   * @returns {promise}
   */
  delCache( key ) {

    /* Returning a promisse */
    return new Promise((resolve, reject) => {

      /* Deleting a key from cache */
      this._client.del( 'payament-' + key, (err, result) => {
        
        /* Returning an error if the key is not deleted */
        if(err) {
          console.log(err);
          reject('Key not deleted.');
        }

        console.log(result);

        /* Returning if result is okay */
        resolve('Key is deleted');

      });

    });
  }
}


module.exports = () => MemcachedFactory;