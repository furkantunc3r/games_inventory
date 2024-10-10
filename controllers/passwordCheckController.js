const {
    body,
    validationResult
} = require('express-validator');
require('dotenv').config();

const secretAdminPassword = process.env.PASS;

const adminMiddleware = [
    body('adminPassword')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty!'),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(403).render('passErr', {
                title: 'G.A.P',
                errors: errors.array(),
            });
        }

        const password = req.body.adminPassword;

        if (password.toString() === secretAdminPassword.toString()) {
            return next();
        } else {
            return res.status(403).render('passErr', {
                title: 'G.A.P',
                errors: [{
                    msg: 'Invalid Admin Password !'
                }],
            });
        }
    }
];

module.exports = adminMiddleware;