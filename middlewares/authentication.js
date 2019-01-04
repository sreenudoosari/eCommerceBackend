function authenticate(req,res,next){
    console.log("Authenticating the login.....");
    next();
}
module.exports=authenticate;