'use strict'
var dispatcher = require('../Emitter');
var DataParser = require('../DataParser');
import React from 'react';
var random_id = "none";

var Graph = React.createClass({

    getInitialState: function() {
        random_id = "ID_" + Math.round(Math.random() * 10000000);
        return {
           id: random_id
        };
    },

    componentDidMount: function() {
      this.addListeners();
    },

    addListeners: function(){
        
        var that = this;

        // get dividend data
        $.ajax({
            type: "POST",
            url: "/dividends/" + that.props.ticker,
            success: function(html){
                var dividends = DataParser.parseDividends(html);
                var chartData = DataParser.createChartObject(dividends,that.state.id)
                
                var chart = c3.generate(chartData);   
            }
        });

       // $.ajax({
       //      type: "POST",
       //      url: "/historical/" + that.props.ticker,
       //      success: function(html){
       //          var obj = DataParser.parseHistorical(html);
       //          obj["bindto"] = "#" + that.state.id;
       //          var chart = c3.generate(obj);   
       //      }
       //  });

     
    },

    render: function() {
    
    return <div> 
            <div id={random_id}> </div>
        </div>

    }



});


module.exports = Graph;