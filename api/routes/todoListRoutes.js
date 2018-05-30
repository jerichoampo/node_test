'use strict';
module.exports = function(app) {
    var bodyParser = require('body-parser'),
        loginController = require('../controllers/loginController.js'),
        signUpController = require('../controllers/signUpController.js');

    // parse application/json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));

    app.route('/login')
        .get(loginController.load_login)
        .post(loginController.login);
    
    app.route('/signup')
        .get(signUpController.load_signup)
        .post(signUpController.signup);
};