const logger=require('../utils/logger');
function authenticate(req,res,next){
    
    console.log("Authenticating the login.....");
    logger.log(`Requested login url:`,req.originalUrl);
    next();
}
module.exports=authenticate;