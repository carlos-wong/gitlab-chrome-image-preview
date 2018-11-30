var config = require('./config');
var axios = require('axios');
var lodash = require('lodash');
var gitlab = require('./gitlab');

console.log('extension loaded');

var gitlab_axios_instance = axios.create({
  baseURL: config.api_url,
  timeout: 10000,
  headers: { "PRIVATE-TOKEN": config.token}
});

window.addEventListener ("load", myMain, false);

function myMain () {

}
