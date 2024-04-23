const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    handler: (req, res) => {
        res.status(429).send({status: false, message: 'Too many requests from this IP, please try again after some time'});
    }
});

module.exports = limiter;