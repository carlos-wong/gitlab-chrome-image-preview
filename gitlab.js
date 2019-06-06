var axios = require('axios');
var lodash = require('lodash');
var config = require('./config');
var gitlab_axios_instance = axios.create({
  baseURL: config.api_url,
  timeout: 10000,
  headers: { "PRIVATE-TOKEN": config.token}
});

function QueryProjectMr(project,iid,callback){
  gitlab_axios_instance
    .get(
      "/projects/" +
        encodeURIComponent(project) +
        "/merge_requests/"+iid
    )
    .then(data => {
      callback(data.data);
    })
    .catch((err)=>{
      callback(err,null);
    });
}

function GitlabCommentMr(project_id,iid,comment,callback){
  gitlab_axios_instance
    .post("/projects/"+encodeURIComponent(project_id)+"/merge_requests/"+iid+"/notes",{
      body:comment
    })
    .then(()=>{
      callback();
    })
    .catch((error)=>{
      callback(error);
    });
}

function GitlabCommentissue(project_id,iid,comment,callback){
  gitlab_axios_instance
    .post("/projects/"+encodeURIComponent(project_id)+"/issues/"+iid+"/notes",{
      body:comment
    })
    .then(()=>{
      callback();
    })
    .catch((error)=>{
      callback(error);
    });
}

function GitlabParseImageUrl(originStr){
  if(originStr.match(/^\/uploads\/[0-9a-zA-z]/)){
    originStr = "https://www.lejuhub.com/product-commitee/mini"+originStr;
  }
  var splited_str = originStr.split(' ');
  var mutli_splited_str = lodash.flatten(lodash.map(splited_str,(str)=>{
    return str.split(/[)"]/);
  }));
  mutli_splited_str = lodash.flatten(lodash.map(mutli_splited_str,(str)=>{
    return str.split("https://");
  }));
  mutli_splited_str = lodash.flatten(lodash.map(mutli_splited_str,(str)=>{
    return str.split("http://");
  }));
  mutli_splited_str = lodash.flatten(lodash.map(mutli_splited_str,(str)=>{
    return "https://"+str;
  }));
  var ret =  lodash.filter(mutli_splited_str,(str)=>{
    return str.match(".*https://www.lejuhub.com/.*");
  });
  return ret[0];
}

function GitlabConverBlobPathToRaw(originstr){
  return originstr.replace(/\/blob\//,"/raw/");
}

let api={};

api.QueryProjectMr = QueryProjectMr;
api.GitlabCommentMr= GitlabCommentMr;
api.GitlabCommentissue = GitlabCommentissue;
api.GitlabParseImageUrl = GitlabParseImageUrl;
api.GitlabConverBlobPathToRaw = GitlabConverBlobPathToRaw;

module.exports = api;
