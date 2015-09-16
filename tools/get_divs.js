var http = require('http')
  , fs = require('fs')
  , options



var tickers = ["AAPL","AHGP","BX","COP","CVX","DIS","ED","GILD","GM","HCP","IEP","JPEP","KKR","KMI","KO","MIC","MO","NRZ","OHI","RDSA","SO","STNG","T","UNP","VGR","VZ","XOM"];
var countr = 0;

var getTicker = function (ticker){

	options = {
	    host: 'real-chart.finance.yahoo.com'
	  , port: 80
	  , path: '/table.csv?s=' + ticker +'&a=00&b=2&c=1990&d=08&e=9&f=2015&g=v&ignore=.csv'
	}

	var request = http.get(options, function(res){
    
    	var data = ''
	
    	res.on('data', function(chunk){
    	    data += chunk
    	})
	
    	res.on('end', function(){
    	    fs.writeFile('data/div_' + ticker + '.csv', data, function(err){
    	        if (err) throw err
    	        console.log('File saved.')
    	    	countr++;
    	    	if(countr < tickers.length){
    	    		console.log(countr);
    	    		getTicker(tickers[countr]);
    	    	}else{
    	    		return;
    	    	}
    	    })
    	})

	})
}


getTicker(tickers[countr]);
