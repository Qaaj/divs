class DataParser {

  constructor() {
    
  }
 
  static parseDividends(input) {
    // return json;
    var data = {};
    var x = ["x"];
    var divs = ["Dividends"];


    for (var i = 0; i < input.length; i++) {
        var entry = input[i];
        var date = entry["Date"];
        var payout = entry["Dividends"];
        if(i !=0) x.push(date);
        if(i !=0) {
            payout = 100 * parseFloat(payout);
            divs.push(payout);
        }
    }
        
    data.columns = [];
    data.columns.push(x);
    data.columns.push(divs);    
    if(data.types == null) data.types = {}; 
    data.types["Dividends"] = 'bar';
    data["x"] = "x";

    return data;
  }

  static parseHistorical(input,data) {
  
    var x = ["x"];
    var price = ["Price"];


    for (var i = 0; i < input.length; i+=10) {
        var entry = input[i];
        var date = entry["Date"];
        var payout = entry["Close"];
        if(i !=0) x.push(date);
        if(i !=0) {
            payout = parseFloat(payout);
            price.push(payout);
        }
    }
        
    if(data.columns == null) data.columns = [];
    // data.columns.push(x);
    data.columns.push(price);     
    data.types["Price"] = 'area';
    data["x"] = "x";
    data.groups = [
            ['Dividends', 'Price']
        ]

    return data;
  }

  static parseYields(historical,dividends,data,ticker){

    var dates = {};
    var yields = ["Yield"];

    for (var i = 0; i < historical.length; i++) {
      dates[historical[i]["Date"]] =historical[i];
    };

    var all = {'ticker':ticker};

    for (var i = 0; i < dividends.length; i++) {
      var all_obj = {};
      var div = dividends[i];
      var divAmount = parseFloat(div["Dividends"]);
      var price = parseInt(dates[div["Date"]]["Close"]);
      var yieldr = 400*parseFloat(divAmount/price);
      all_obj.yield = yieldr;
      all_obj.dividend = divAmount;
      all_obj.price = price;
      all[div["Date"]] = all_obj;

      yields.push(yieldr);
    };

    $.ajax({
        type: "POST",
        url: "/save/" + JSON.stringify(all),
        success: function(html){
           console.log("succes");
        }
    });

    data.columns.push(yields);     
    data.types["Yield"] = 'spline';
    data["x"] = "x";
    data.groups = [['Dividends', 'Price','Yields']]

    return data;
  }

  static createChartObject(data,id){

    var obj = {data:{},grid:{x:{lines:[]}}};
    // Add it to the correct DOM element
    obj["bindto"] = "#" + id;
    // create X axis information
    var axis = {
        'x': {
            'type': 'timeseries',
            'tick': {
                'format': '%Y-%m-%d'
            }
        }
    }
    obj["axis"] = axis;
    // Hide legend
    obj["legend"] = {'show':true};

    obj.data =data;

    return obj;
  }
}

module.exports = DataParser;
