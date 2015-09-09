// require("./main.css");
var dispatcher = require('./Emitter');
var Graph = require("./components/Graph.jsx");


import React from 'react';

React.render(<Graph  />, document.getElementById("content"));

dispatcher.setMaxListeners(100);

               
