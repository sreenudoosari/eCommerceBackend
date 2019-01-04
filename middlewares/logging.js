const logger=require('../utils/logger');
function logging(req,res,next){
    logger.log("logging the details.......123");
    next();
}
module.exports=logging;