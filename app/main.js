require("./main.css");
var dispatcher = require('./Emitter');
var Post = require("./components/Post.jsx");


import React from 'react';


dispatcher.setMaxListeners(100);


// $.ajax({
//     type: "POST",
//     url: "php/getlikes.php",
//     success: function(html){//html = the server response html code
//         var result = html;
//         if(typeof html !='object')
//         {
//             result = JSON.parse(html);
//         }
        
//         dispatcher.emit("likesReceived",result);
//     }
// });
                    
