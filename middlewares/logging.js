function logging(req,res,next){
    console.log("logging the details.......");
    next();
}
module.exports=logging;