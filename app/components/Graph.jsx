'use strict'
var dispatcher = require('../Emitter');
var dataParser = require('../DataParser');
import React from 'react';
var random_id = "none";

var Graph = React.createClass({

    getInitialState: function() {
        random_id = "ID_" + Math.round(Math.random() * 10000000);
        return {
           postObj: {},
           id: random_id
        };
    },

    componentDidMount: function() {
      this.addListeners();
    },

    render: function() {
    
    return <div> 
            <div id={random_id}> </div>
        </div>

    },


    addListeners: function(){
        
        var that = this;
        console.log("graph created");
        $.ajax({
            type: "POST",
            url: "/data/" + that.props.ticker,
            success: function(html){
                var obj = dataParser(html);
                obj["bindto"] = "#" + that.state.id;
                var chart = c3.generate(obj);   
            }
        });
     
    }
});


module.exports = Graph;