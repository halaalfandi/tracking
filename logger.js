const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

function initLogger(rTracer) {
  // a custom format that outputs request id
  const rTracerFormat = printf((info) => {
    const rid = rTracer.id();
    return rid
      ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
      : `${info.timestamp}: ${info.message}`;
  });

  const logger = createLogger({
    format: combine(timestamp(), rTracerFormat),
    transports: [new transports.Console()],
  });

  return logger;
}

module.exports = initLogger;