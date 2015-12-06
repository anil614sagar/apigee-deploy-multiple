var inquirer = require('inquirer');
var apigeetool = require('apigeetool');
var path = require('path');
var fs = require('fs');
var async = require('async');

module.exports = {
  deployProxies: deployProxies
};

var questions = [
  { name: 'baseuri',      message: 'Base URI?', default: 'https://api.enterprise.apigee.com' },
  { name: 'organization', message: 'Organization?' },
  { name: 'username',     message: 'User Id?'  },
  { name: 'password',     message: 'Password?', type: 'password' },
  { name: 'environments',  message: 'Environment?'  },
  { name: 'virtualhosts', message: 'Virtual Hosts?', default: 'default,secure' }
];

function deployProxies(options, cb) {
  console.log("Initiating Apigee Deployment..");
  var source = options.source || path.join(__dirname, '.');
  var proxies = getDirectories(source);
  if(source.substr(-1) === '/') {
    source = source.substr(0, source.length - 1);
  }
  // check for options vs prompt , don't ask questions if options are supplied..
  if (options.baseuri && options.organization && options.username && options.password
    && options.environments && options.virtualhosts) {
    var deploymentOptions = {};
    deploymentOptions.baseuri = options.baseuri;
    deploymentOptions.organization = options.organization;
    deploymentOptions.username = options.username;
    deploymentOptions.password = options.password;
    deploymentOptions.environments = options.environments;
    deploymentOptions.virtualhosts = options.virtualhosts;

    async.eachSeries(proxies, function iterator(proxy, callback) {
        deploymentOptions.directory = source + "/" + proxy;
        var dirPath = source + "/" + proxy;
        var list = fs.readdirSync(dirPath + "/apiproxy");
        for(var i=0; i<list.length; i++)
        {
          if(path.extname(list[i])===".xml")
          {
            var file = list[i];
            var apiName = file.replace(/\.[^/.]+$/, "")
            deploymentOptions.api = apiName;
            console.log("Deploying API Proxy : " + apiName);
            apigeetool.deployProxy(deploymentOptions, function (err) {
              if (err) {
                callback(err, {});
              }
              console.log("Deployment Completed : " + apiName);
              callback(null, {});
            })
          }
        }
      },
      function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        if (err) {
          return cb(err, {});
        }
        return cb(null, {});
      });
  }
  else {
    inquirer.prompt(questions, function (answers) {
      async.eachSeries(proxies, function iterator(proxy, callback) {
          answers.directory = source + "/" + proxy;
          var dirPath = source + "/" + proxy;
          var list = fs.readdirSync(dirPath + "/apiproxy");
          for(var i=0; i<list.length; i++)
          {
            if(path.extname(list[i])===".xml")
            {
              var file = list[i];
              var apiName = file.replace(/\.[^/.]+$/, "")
              answers.api = apiName;
              console.log("Deploying API Proxy : " + apiName);
              apigeetool.deployProxy(answers, function (err) {
                if (err) {
                  callback(err, {});
                }
                console.log("Deployment Completed : " + apiName);
                callback(null, {});
              })
            }
          }
        },
        function(err, results) {
          // results is now equal to: {one: 1, two: 2}
          if (err) {
            return cb(err, {});
          }
          return cb(null, {});
        });
    });
  }
}


function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
