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
    var imageUrl = gitlab.GitlabConverBlobPathToRaw(gitlab.GitlabParseImageUrl(getText(event.target.firstChild,"\r\n")));
    console.log('first child is:',imageUrl);
    if(!imageUrl){
      return;
    }
    var frame = document.createElement("div");
    frame.style.position = "absolute";
    var w = 720;
    var h = 480;
    var left = (window.innerWidth/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    frame.style.top = (top + window.scrollY)+'px';
    frame.style.left = left+'px';
    frame.style.width = w+'px';
    frame.style.height = h+'px';
    frame.style.zIndex = "99999";
    frame.style.pointerEvents = "none";
    var title = document.createElement("a");
    title.text = imageUrl;
    title.style.backgroundColor = "white";
    frame.appendChild(title);
    var image = document.createElement("img");
    image.src = imageUrl;
    image.style.width = w+'px';
    image.style.height = 'auto';
    frame.appendChild(image);
    // frame.style.backgroundColor = "white";

    document.body.appendChild(frame);
    if(!showedIframe){
      showedIframe = $(frame).fadeIn(300, "swing");
    }
  }
}, false);

function myMain () {

}
