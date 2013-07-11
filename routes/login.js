/*
 * project add
 *
 * TODO:增加dao
 */


var Project = require('../dao/Project');
var Version = require('../dao/Version');
var Picture = require('../dao/Picture');


//var http = require('http');

var qs=require('querystring');

//   var request = require('request');



   // module dependencies
var http = require('http'),
    url = require('url');
 
 
exports.urlReq = function(reqUrl, options, cb){
    if(typeof options === "function"){ cb = options; options = {}; }
 
    // parse url to chunks
    reqUrl = url.parse(reqUrl);
 
    // http.request settings
    console.log(reqUrl);
    var settings = {
        host: reqUrl.hostname,
        port: reqUrl.port || 80,
        path: reqUrl.path,
        headers: options.headers || {},
        method: options.method || 'GET'
    };
 
    // if there are params:
    if(options.params){
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        settings.headers['Content-Length'] = options.params.length;
    };
 
 console.log(settings);
    // MAKE THE REQUEST
    var req = http.request(settings);

    console.log(req);
 
    // if there are params: write them to the request
    if(options.params){ req.write(options.params) };
 
    // when the response comes back
    req.on('response', function(res){
        res.body = '';
        res.setEncoding('utf-8');
 
        // concat chunks
        res.on('data', function(chunk){ res.body += chunk });
 
        // when the response has finished
        res.on('end', function(){
            
            // fire callback
            cb(res.body, res);
        });
    });
 
    // end the request
    req.end();
}
 
 
 


exports.login = function (req, res) {


      exports.urlReq('http://api.yunpan.alibaba.com/oauth/access_token?grant_type=password&site=BUC&username=jianfeng.jjf&password=K@4868526&client_id=106362801917443616&client_secret=bccdbbe3145941bfbe947fdd8668a668', {
    method: 'POST',
    params:{
      grant_type:"password",
      site:"BUC",
      username:"jianfeng.jjf",
      password:"K@4868526",
      client_id:"106362801917443616",
      client_secret:"bccdbbe3145941bfbe947fdd8668a668"
      
    }
}, function(body, res){
 
    // do your stuff
    console.log(body);
 
});
/*


var post_data={grant_type:"password",site:"BUC",username:"jianfeng.jjf",password:"K@4868526",client_id:"106362801917443616",client_secret:"bccdbbe3145941bfbe947fdd8668a668"};

var content=qs.stringify(post_data);
console.log(content.length);
var options = {
            host: 'api.yunpan.alibaba.com',
            port:80,
            path: '/oauth/access_token?grant_type=password&site=BUC&username=jianfeng.jjf&password=K@4868526&client_id=106362801917443616&client_secret=bccdbbe3145941bfbe947fdd8668a668',
            method: 'POST',
            headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
            }
    };

    var reqHttps = http.request(options, function(resHttps) {


     ///   console.log("statusCode: ", resHttps.statusCode);
     //   console.log("headers: ", resHttps.headers);
console.log("fff");
        resHttps.on('data', function(body1) {
               console.log("body:"+body1);
        });
    });

    reqHttps.on('error', function(e) {
        console.log("error:"+e);
    });

    
reqHttps.write('data\n');
reqHttps.write('data\n');
reqHttps.end();

   res.render('login');
*/


/*request.post(
    'http://api.yunpan.alibaba.com/oauth/access_token',
    { form: {grant_type:"password",site:"BUC",username:"jianfeng.jjf",password:"K@4868526",client_id:"106362801917443616",client_secret:"bccdbbe3145941bfbe947fdd8668a668"} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);*/ res.render('login');

     

    
       


};

