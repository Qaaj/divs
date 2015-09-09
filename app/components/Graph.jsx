'use strict'
var dispatcher = require('../Emitter');
import React from 'react';


var Graph = React.createClass({

    getInitialState: function() {
        return {
           postObj: {}
        };
    },

    componentDidMount: function() {
      this.addListeners();
    },

    render: function() {

    return <div> 
            <div className='chart'>
                    <div id='chart'></div>
                </div>
        </div>

    },


    addListeners: function(){
        
        console.log("graph created");
        $.ajax({
            type: "POST",
            url: "/data/",
            success: function(html){//html = the server response html code
                var result = html;
               
                 
                    console.log(result);
                    var chart = c3.generate(result);
                
            }
        });
     
    }
});


module.exports = Graph;