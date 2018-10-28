const express = require('express');
const passport = require('passport');
const jwt  = require('jsonwebtoken');
let config = require('../helpers/config');
let router = express.Router();

router.get('/value',passport.authenticate('jwt', {session: false}),(req, res) => {
    res.send({
        session: req.user
    });
});
router.post('/login', function (req, res, next) {
    passport.authenticate('local',{session: false}, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info
            });
        }
        req.logIn(user,{session: false}, function (err) {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user'
                });
            }

            let jsonWebToken = jwt.sign(user,config.secret);
            res.status(200).send({
                status: 200,
                message:'Login Successful',
                token:jsonWebToken
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    res.status(200).send({
        status: 'Bye!'
    });
});

module.exports = router;