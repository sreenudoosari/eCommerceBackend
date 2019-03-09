const logger = require('./logger')(__filename);

function error(err,req,res,next){
    logger.error(err.message);
    res.status(500).send("Some error Occured now");
}
module.exports = error;