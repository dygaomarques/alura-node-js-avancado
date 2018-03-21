const cluster = require('cluster');
const os      = require('os');
const LoggerFactory = require('./services/LoggerFactory.js')();

let cpus = os.cpus();

if(cluster.isMaster){

  /* Logging info */
  new LoggerFactory().log('info', 'Executing main thread.');

  /* Creating an threads */
  cpus.forEach( () => cluster.fork() );

  cluster.on('listening', ( worker ) => new LoggerFactory().log('info',   `Creating new cluster with PID: ${worker.process.pid}`) );
  cluster.on('exit', ( worker ) => {
    new LoggerFactory().log( 'error',  `Cluster with PID: ${worker.process.pid} disconnected.` );
    cluster.fork();
  });
} else {
  require('./index.js');
  new LoggerFactory().log( 'info', 'Executing slave thread.' );
}