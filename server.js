var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    database = require('./database/database'),
    routes = require('./api/routes/todoListRoutes');

routes(app);
//start Express server on defined port
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);