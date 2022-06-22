
module.exports = function (req, res, next) {
    //401 Unauthorized
    //403 Forbidden

    if ((req.user.role !== 'admin') && (req.user.role !== 'doctor') && (req.user.role !== 'staff')) return res.status(403).send('Acess denied');

    next();
}