const logger=require('../utils/logger');
function logging(req,res,next){
   // console.log(`Requested login url:`,req.originalUrl);
    //logger.log("hello");
    next();
}
module.exports = logging;