const logger=require('../utils/logger');
const jwt = require('jsonwebtoken');
const config = require('config');

function authenticate(req,res,next){
    console.log("Authenticating the login.....");
    logger.log(`Requested login url:`,req.originalUrl);

    const token = req.header("x-auth-token");
        if(!token) return res.status(401).send("Access denied... No token provided");
         try{
            const decodedPayLoad = jwt.verify(token, config.get('app.jwtPrivateKey'));
            req.user = decodedPayLoad;
            next();
        }catch(error){
            res.status(400).send("Access denied .Invalid token");
        }
}
module.exports = authenticate;