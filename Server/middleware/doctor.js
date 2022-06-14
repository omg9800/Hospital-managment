
module.exports = function( req,res,next) {
    //401 Unauthorized
    //403 Forbidden

    if(!req.user.isDoctor) return res.status(403).send('Acess denied');
    
    next();
}