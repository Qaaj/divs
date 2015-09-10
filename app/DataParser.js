module.exports = function(name,input) {

    // return json;
    var data = {data:{},grid:{x:{lines:[]}}};
    var divs = ["Dividend"];
    var x = ["x"];

    var axis = {
          'x': {
              'type': 'timeseries',
              'tick': {
                  'format': '%Y-%m-%d'
              }
          }
      }

     data["axis"] = axis;
     data["legend"] = {'show':false};

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
        
    data.data.types = {};
    data.data.types["Dividend"] = 'area-step';
    data.data["x"] = "x";
    data.data.columns = [];
    data.data.columns.push(x);
    data.data.columns.push(divs);

    console.log(data)
    return data;

}