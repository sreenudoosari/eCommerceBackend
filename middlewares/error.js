const logger = require("./logger")(__filename);

function error(err, req, res, next) {
  logger.error(err.message);
  res.status(500).send("An error cccured");
}
module.exports = error;
