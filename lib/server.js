var express = require('express')
  , app = express.createServer();

app.configure(function () {
  views();
  tools();
  environments();
});

require('./controller')(app);
app.listen(3000);
console.log("Express server listening on port %d", app.address().port);

function views() {
  app.use(express.static(root('/public')));
  app.set('views', root('/views'));
  app.set('view engine', 'jade');
}

function tools() {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
}

function environments() {
  app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });
  app.configure('production', function () {
    app.use(express.errorHandler());
  });
}

function root(path) {
  return __dirname + '/..' + path;
}