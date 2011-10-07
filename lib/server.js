/**
 * Module dependencies.
*/

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', root('views'));
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(root('public')));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index', {
        title: 'Story Teller'
    });
});

// Only listen on $ node app.js

if (!module.parent) {
    app.listen(3000);
    console.log("Express server listening on port %d", app.address().port);
}

function root(path) {
    return __dirname+'/../'+path;
}