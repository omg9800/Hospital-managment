
module.exports = function (req, res, next) {
    //401 Unauthorized
    //403 Forbidden

    if ((req.user.role !== 'staff') && (req.user.role !== 'admin')) return res.status(403).send('Acess denied');

    next();
}