const express = require("express");
const port = 3000;
const rTracer = require("cls-rtracer");
const initLogger = require("./logger");

const logger = initLogger(rTracer);

const app = express();
app.use(rTracer.expressMiddleware());

app.get("/", (req, res) => {
  const traceId = rTracer.id();
  logger.info(`Request Id: ${traceId}`);

  res.json({
    status: true,
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});