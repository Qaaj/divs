require("./main.css");
var dispatcher = require('./Emitter');
var GraphContainer = require("./components/GraphContainer.jsx");

import React from 'react';


$('.chartr').each(function(i, obj) {
        var ticker = $(obj).text();
        React.render(<GraphContainer  ticker={ticker} />, obj);
        $("#content").append(obj);
});

$(".ticker-input").keyup(function (e) {
    if (e.keyCode == 13) {
    	var ticker = $(".ticker-input").val();
    	var dv = document.createElement("div");
        React.render(<GraphContainer  ticker={ticker} />, dv);
        $("#content").append(dv);
    }
});

$(".clear").click(function(){
	$("#content").html("");
});

dispatcher.setMaxListeners(100);


               
