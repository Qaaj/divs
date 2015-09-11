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
            payout = parseFloat(payout);
            divs.push(payout);
        }
    }
        
    data.columns = [];
    data.columns.push(x);
    data.columns.push(divs);     
    data.types = {"Dividends" : 'area-spline'};
    data["x"] = "x";

    return data;
  }

  static parseHistorical(input) {
   
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
    obj["legend"] = {'show':false};

    obj.data =data;
    
    return obj;
  }
}

module.exports = DataParser;
