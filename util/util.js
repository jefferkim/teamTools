var qs = require('querystring');

var http = require('http');
var url = require('url');


exports.urlReq = function (reqUrl, options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = {};
    }


    var buildParams = function( params ) {

        var tmp = [];
        if(typeof  params == "object"){
            for(var p in params){
               tmp.push(p+'='+params[p]);

            }
            return tmp.join("&");
        }

    }

    // parse url to chunks

    //reqUrl = url.parse(reqUrl);

    // http.request settings
    var settings = {
       // host: "10.232.68.82",
        host: "api.yunpan.alibaba.com",
        port: reqUrl.port || 80,
        path: reqUrl,
        headers: options.headers || {},
        method: options.method || 'GET'

    };

    // if there are params:
    if (options.params) {
        settings.path = settings.path+"?"+buildParams(options.params);
        options.params = JSON.stringify(options.params);
        settings.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        settings.headers['Content-Length'] = options.params.length;
    }

  //  console.log(settings);
    // MAKE THE REQUEST
    var req = http.request(settings);

    // if there are params: write them to the request
    if (options.params) {
        req.write(options.params)
    }
    ;

    // when the response comes back
    req.on('response', function (res) {
        res.body = '';
        res.setEncoding('utf-8');

        // concat chunks
        res.on('data', function (chunk) {
            res.body += chunk
        });

        // when the response has finished
        res.on('end', function () {

            // fire callback
            cb(res.body, res);
        });
    });

    // end the request
    req.end();
}
