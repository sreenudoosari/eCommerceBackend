function log(req,res,next){
    console.log("Requested login url:" , req.originalUrl);
    next();
}
module.exports = log;