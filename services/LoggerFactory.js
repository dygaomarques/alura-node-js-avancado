const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

class LoggerFactory {

  constructor() {

    this._loggerConfig = {
      format: combine(
        timestamp(),
        format.json(),
        prettyPrint()
      ),
      transports: [
        new transports.File({
          level: 'info',
          filename: './logs/payfast-log-info.log',
          maxFiles: 10,
          maxsize: 100000,
        }),
        new transports.File({
          level: 'error',
          filename: './logs/payfast-log-error.log',
          maxFiles: 10,
          maxsize: 100000,
        })
      ]
    };

    this._logger = createLogger(this._loggerConfig);

  }

  log( level, message ) {

    this._logger.log({ level, message });

  }

}

module.exports = () => LoggerFactory;