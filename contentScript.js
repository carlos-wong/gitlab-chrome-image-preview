var config = require('./config');
var axios = require('axios');
var lodash = require('lodash');
var gitlab = require('./gitlab');

var showedIframe = null;

console.log('Gitlab Merge Request image preview extension loaded');

var gitlab_axios_instance = axios.create({
  baseURL: config.api_url,
  timeout: 10000,
  headers: { "PRIVATE-TOKEN": config.token}
});

function getText(node, lineSeparator){
  var text = "";
  while(node != null){
    if(node.nodeType == Node.TEXT_NODE){
      text += node.nodeValue.trim();
    }else if(node.nodeType == Node.ELEMENT_NODE){
      if($(node).is(':visible')){
        var childText = ""; 
        if(node.firstChild != null){
          if(node.parentNode.nodeName == "SELECT" && node.nodeName == "OPTION"){
            // Get selected option text only
            if(node.parentNode[node.parentNode.selectedIndex] == node){
              childText = getText(node.firstChild, lineSeparator);
            }
          }else{
            childText = getText(node.firstChild, lineSeparator);
          }
        }

        if(childText != ""){
          text += childText;
        }

        if(node.nodeName == "BR" || window.getComputedStyle(node, null).display.indexOf("inline") === -1){
          text += lineSeparator;
        }
      }
    }

    node = node.nextSibling;
  }

  return text.trim();
}

window.addEventListener ("load", myMain, false);

document.addEventListener("pointerup", function(event){
  if(showedIframe){
    showedIframe.fadeOut(300,"swing");
    showedIframe = null;
  }
});

document.addEventListener("pointerdown", function(event){
  if (event.metaKey)  {
    event.preventDefault();
    var rect = event.target.getBoundingClientRect();
    var frame = document.createElement("div");
    frame.style.position = "absolute";
    // frame.style.top = (rect.top + window.scrollY) + "px";
    // frame.style.left = (rect.left + window.scrollX) + "px";
    var w = 480;
    var h = 320;
    var left = (window.innerWidth/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    frame.style.top = (top + window.scrollY)+'px';
    frame.style.left = left+'px';
    frame.style.width = w+'px';
    frame.style.height = h+'px';
    // frame.style.border = "solid 2px gold";
    // frame.style.borderRadius = "5px";
    frame.style.zIndex = "99999";
    frame.style.pointerEvents = "none";
    var image = document.createElement("img");
    image.src = "http://www.lejuhub.com/mini/product/raw/master/Pando%E5%88%87%E5%9B%BE%E5%8C%85/3_%E6%95%88%E6%9E%9C%E5%9B%BE/01%E9%A6%96%E9%A1%B5-1.jpg";
    image.style.width = w+'px';
    image.style.height = 'auto';
    frame.appendChild(image);
    document.body.appendChild(frame);
    if(!showedIframe){
      showedIframe = $(frame).fadeIn(300, "swing");
    }
  }
}, false);

function myMain () {

}
