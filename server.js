var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
}); 
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

var fs = require("fs"),
    json;

// var tsvToJson = require('./app/tsv-to-json.js');
var csvToJson = require('./app/csv-to-json.js');
app.use(express.static(publicPath));

app.all('/data/:id', function (req, res) {
  
  fs.readFile('data/div_' + req.params.id + '.csv', 'utf8', function (err,data) {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({}));
      return console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    var result = csvToJson(data);
    res.send(result);
  });
});


if (!isProduction) {

  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });



  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {
    // Just catch it
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  }); 

} else {

  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}



