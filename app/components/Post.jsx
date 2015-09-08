'use strict'
var dispatcher = require('../Emitter');
import React from 'react';
var PostTags = require("../components/PostTags.jsx");
var Tag = require('../components/Tag');


var Post = React.createClass({

    getInitialState: function() {
        return {
           postObj: {},
           likes: 0
        };
    },

    componentDidMount: function() {
      this.addListeners();
    },

    render: function() {

    var big_image = this.props.postObj.image.replace("img/","img/full_");
    return <div> 
           <img src={this.props.postObj.image}  />
                
                <div className="post-information">{this.props.postObj.title}</div>
                <div className="post-heart loved"><span className="option glyphicon glyphicon-heart" aria-hidden="true"></span></div>
                <div className="post-no-heart loved"><span className="option glyphicon glyphicon-heart-empty" aria-hidden="true"></span></div>
                <PostTags tags={this.props.postObj.tags} />
                <div className="options">
                     <a title="Visit Website" href={this.props.postObj.url} target="_blank"> <span className="option glyphicon glyphicon-globe" aria-hidden="true"></span></a>
                     <span title="Preview" className="option glyphicon glyphicon-fullscreen fullscreen" aria-hidden="true" href={big_image}></span>
                     <span title="Like" className="option glyphicon heart glyphicon-heart-empty" aria-hidden="true"></span>
                </div>
                <div className="more_info">{this.props.postObj.description}<div className="likes">{this.state.likes}<div className="glyphicon glyphicon-heart" aria-hidden="true"></div></div></div>
        </div>

    },


    addListeners: function(){

        window.activeTags = [];

        $(".explanation").show();

        var that = this;
        var node = this.getDOMNode();
         if(this.state.likes > 0){
            $(node).find('.likes').show();
        }else{
           $(node).find('.likes').hide();
        }

        $(node).find(".more_info").click(function(){
            if($(this).css("opacity") == 1){
                window.open(that.props.postObj.url, '_blank');
            }
        });

        $(node).hover(function() {
            dispatcher.emit("hideOthers",that.props.postObj);
            $(this).find('.options').show();
        });

        dispatcher.on("hideOthers",function(obj){
            if(that.props.postObj != obj){
                $(node).find('.options').hide();
            }
        });

        dispatcher.on("tagClicked",function(tag){
            // no active filters
            if(window.activeTags == []){
                $(that.getDOMNode()).parent().show();
            }else{
                var show = true;
                for (var i = 0; i < window.activeTags.length; i++) {
                    var tag = window.activeTags[i];
                    if(that.props.postObj.tags.indexOf(tag) == -1) show = false;
                }
                if(show){
                    $(that.getDOMNode()).parent().show();
                }
                else{
                     var obj = document.getElementById("lasttag");
                    $(obj).html("");
                    var title = tag;
                    React.render(<Tag tagName={title} />, obj);
                    $(that.getDOMNode()).parent().hide();
                }
            }
        });

        dispatcher.on("likesReceived",function(likeInfo){
            
          for (var i = 0; i < likeInfo.length; i++) {
              if(likeInfo[i].post_name == that.props.postObj.title){
                console.log(that.props.postObj.title + " has " + likeInfo[i].likes + " likes");
                var likes = likeInfo[i].likes;
                that.setState({likes: likes})
              }
          };
           if(that.state.likes > 0){
            $(node).find('.likes').show();
        }else{
           $(node).find('.likes').hide();
        }
        });



        $(node).find('.heart')[0].clicked = false;

        $(node).find('.heart').click(function(){
            if(this.clicked == false){
                // ADD THE LIKE to DB
                var title = that.props.postObj.title;
                var uid = window.uid;
                var url = "php/postlikes.php?post=%22"+ title +"%22&uid=" + uid;
                
                $.ajax({
                    type: "POST",
                    url: url,  
                    success: function(html){//html = the server response html code
                        $("#more").remove();//Remove the div with id=more
                        $("ul#updates").append(html);//Append the html returned by the server .
                    }
                });
                // Put the object into storage
                $(node).find(".post-heart").fadeTo( 250, 1,function(){
                    $(this).fadeTo( 1000, 0);
                });
                $(node).find(".post-no-heart").css("opacity",0.01);
                localStorage.setItem('loved_' + that.props.postObj.title, 'true');
                $(this).removeClass("glyphicon-heart-empty");
                $(this).addClass("glyphicon-heart");
                this.clicked = true;
                var likes = parseInt(that.state.likes) +1;
                that.setState({likes: likes});
                 if(that.state.likes > 0){
            $(node).find('.likes').show();
        }else{
           $(node).find('.likes').hide();
        }

            }else{
                // REMOVE THE LIKE from db
                // Removing a like
                var title2 = that.props.postObj.title;
                var uid2 = window.uid;
                var url2 = "php/removelikes.php?post=%22"+ title2 +"%22&uid=" + uid2;
                $.ajax({
                    type: "POST",
                    url: url2,
                    success: function(html){//html = the server response html code
                        $("#more").remove();//Remove the div with id=more
                        $("ul#updates").append(html);//Append the html returned by the server .
                    }
                });

                // Put the object into storage
                $(node).find(".post-no-heart").fadeTo( 250, 1,function(){
                    $(this).fadeTo( 1000, 0);
                });
                $(node).find(".post-heart").css("opacity",0.01);
                localStorage.setItem('loved_' + that.props.postObj.title, 'false');
                $(this).addClass("glyphicon-heart-empty");
                $(this).removeClass("glyphicon-heart");
                this.clicked = false;
                 var likes = parseInt(that.state.likes) -1;
                 that.setState({likes: likes});
                 if(that.state.likes > 0){
                    $(node).find('.likes').show();
                    }else{
                   $(node).find('.likes').hide();
                }
            }       
        });

        var retrievedObject = localStorage.getItem('loved_' + that.props.postObj.title);
        if(retrievedObject == 'true'){
            $(node).find('.heart')[0].clicked = true;
            $(node).find('.heart').removeClass("glyphicon-heart-empty");
            $(node).find('.heart').addClass("glyphicon-heart");
        }
    }
});


module.exports = Post;