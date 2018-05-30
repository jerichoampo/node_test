'use strict';

module.exports = {
    load_login: function(req, res) {
        res.sendFile(require('path').join(__dirname+ '/views/login.html'));
    },
    login: function(req, res) {
        console.log(req.body);
        res.sendStatus(200);
    },
    forgotPassword: function(req, res) {

    }
}