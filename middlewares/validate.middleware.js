const { validationResult } = require('express-validator');

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${param} ${msg}`;
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = errors.formatWith(errorFormatter).mapped();
        const key = Object.keys(error)[0];
        const message = error[key];
        return res.status(400).json({ status: 'ERROR', message });
    }

    return next();
}

module.exports.validateRequest = validateRequest;