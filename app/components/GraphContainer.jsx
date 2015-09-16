'use strict'
var dispatcher = require('../events/Emitter');
var dataParser = require('../core/DataParser');
var Graph = require("./Graph.jsx");
import React from 'react';
var random_id = "none";

var GraphContainer = React.createClass({

    getInitialState: function() {
        random_id = "ID_" + Math.round(Math.random() * 10000000);
        return {
          ticker : ""
        };
    },

    componentDidMount: function() {
        console.log("Graph container created ")
    },

    render: function() {

    return <div className="graph_container"> 
            <div className="graph_title">{this.props.ticker}</div>
            <div className="graph_holder"><Graph ticker={this.props.ticker} /></div>
            <div className="info_holder">Mumbo Jumbo</div>
        </div>

    },
});


module.exports = GraphContainer;