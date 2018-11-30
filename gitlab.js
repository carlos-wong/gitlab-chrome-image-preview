var axios = require('axios');
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

let api={};

api.QueryProjectMr = QueryProjectMr;
api.GitlabCommentMr= GitlabCommentMr;
api.GitlabCommentissue = GitlabCommentissue;

module.exports = api;
