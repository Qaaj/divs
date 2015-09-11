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

                var divResult = html;
                var dividends = DataParser.parseDividends(html);

                $.ajax({
                    type: "POST",
                    url: "/historical/" + that.props.ticker,
                    success: function(html){
                        var tickerResult = html;
                        var historical = DataParser.parseHistorical(html,dividends);
                        var yields = DataParser.parseYields(tickerResult,divResult,historical);
                        var chartData = DataParser.createChartObject(yields,that.state.id)
                        
                        var chart = c3.generate(chartData);   
                    }
                });
            }
        });

        //  $.ajax({
        //     type: "POST",
        //     url: "/historical/" + that.props.ticker,
        //     success: function(html){
        //         var historical = DataParser.parseHistorical(html);
        //         var chartData = DataParser.createChartObject(historical,that.state.id)
                
        //         var chart = c3.generate(chartData);   
        //     }
        // });

       

     
    },

    render: function() {
    
    return <div> 
            <div id={random_id}> </div>
        </div>

    }



});


module.exports = Graph;