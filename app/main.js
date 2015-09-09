// require("./main.css");
var dispatcher = require('./Emitter');
var Graph = require("./components/Graph.jsx");

import React from 'react';


$('.chartr').each(function(i, obj) {
        var ticker = $(obj).text();
        React.render(<Graph  ticker={ticker} />, obj);
        $("#content").append(obj);
});

dispatcher.setMaxListeners(100);


               
