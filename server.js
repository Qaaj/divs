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
var fs = require("fs");
app.use(express.static(publicPath));

// var tsvToJson = require('./app/tsv-to-json.js');
var csvToJson = require('./app/csv-to-json.js');


function getDivURL(ticker){
   var options = {
      host: 'real-chart.finance.yahoo.com'
    , port: 80
    , path: '/table.csv?s=' + ticker +'&a=00&b=2&c=1990&d=08&e=9&f=2015&g=v&ignore=.csv'
    }
  return options;
}

function getStockDataURL(ticker){
  var options = {
      host: 'real-chart.finance.yahoo.com'
    , port: 80
    , path: '/table.csv?s=' + ticker +'&&a=00&b=2&c=1990&d=08&e=9&f=2015&g=d&ignore=.csv'
  }
  return options;
}

app.all('/dividends/:id', function (req, res) {
  var request = http.get(getDivURL(req.params.id), function(rs){
      var data = ''
      rs.on('data', function(chunk){
          data += chunk
      })
      rs.on('end', function(){
        res.setHeader('Content-Type', 'application/json');
        var result = csvToJson(data);
        res.send(result);
      })
  })
});

app.all('/save/:data', function (req, res) {
    var mongodb = require('mongodb');
    
    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;
    
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/divs';
    
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);
    
        // Get the documents collection
        var collection = db.collection('yields');
      
        var jsn = JSON.parse(req.params.data);      
    console.log(jsn);
        // Insert some users
        collection.insert(jsn, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
          }
          //Close connection
          db.close();
        });
      }
    });

});


app.all('/historical/:id', function (req, res) {
  var request = http.get(getStockDataURL(req.params.id), function(rs){
      var data = ''
      rs.on('data', function(chunk){
          data += chunk
      })
      rs.on('end', function(){
        res.setHeader('Content-Type', 'application/json');
        var result = csvToJson(data);
        res.send(result);
      })
  })
});


// Read locally stored data

// app.all('/data/:id', function (req, res) {
//   fs.readFile('data/div_' + req.params.id + '.csv', 'utf8', function (err,data) {
//     if (err) {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify({}));
//       return console.log(err);
//     }
//     res.setHeader('Content-Type', 'application/json');
//     var result = csvToJson(data);
//     res.send(result);
//   });
// });


// Production code

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



