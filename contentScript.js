var config = require('./config');
var axios = require('axios');
var lodash = require('lodash');
var gitlab = require('./gitlab');

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

document.addEventListener("click", function(event){
  console.log('click event is:',event);
  if (event.metaKey)  {
    event.preventDefault();
    console.log('first child is:',getText(event.target.firstChild,"\r\n"));
  }
}, false);

function myMain () {

}
