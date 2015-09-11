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


    for (var i = 0; i < input.length; i+=50) {
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
    data.types["Price"] = 'area-spline';
    data["x"] = "x";

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
