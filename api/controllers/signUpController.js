'use strict'

module.exports = {
    load_signup: function(req, res) {
        res.sendFile(require('path').join(__dirname+ '/views/signup.html'));        
    },
    signup: function(req, res) {
        var database = require('../../database/database');
        var data = {};
        var insertQuery = 
            "INSERT INTO users (first_name, last_name, email, password, created) " +
            "SELECT * FROM (SELECT ? AS first_name, ? AS last_name, ? AS email, ? AS password, NOW()) AS tmp " +
            "WHERE NOT EXISTS (SELECT email FROM users WHERE email = ?) LIMIT 1";

        database.getConnection(function(err, connection) {
            if (err) {
                data["error"] = 1;
                data["data"] = "Internal Server Error";
                res.status(500).json(data);
            } else {
                connection.query(insertQuery, 
                    [req.body.first_name, req.body.last_name, 
                    req.body.email, req.body.password, 
                    req.body.email], 
                    function(err, rows, fields) {
                        if (!err) {
                            if (rows.affectedRows == 1) {
                                data["error"] = 0;
                                data["data"] = "User successfully registered!";
                                res.status(201).json(data);
                            } else {
                                data["error"] = 1;
                                data["data"] = "Email already exists!";
                                res.status(400).json(data);
                            }
                        } else {
                            console.log(err);
                            data["error"] = 1;
                            data["data"] = "Error Occured!";
                            res.status(400).json(data);
                        }
                    }
                )
            }
            connection.release();
        });

    }
}



