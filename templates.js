var exports = module.exports = {};

var util = require('util');
var glob = require("glob");
var fs = require('fs');

var templates = {};

exports.getTemplate = function(name) {
    return templates[name];
};

glob("templates/*.json", function (error, files) {
    if (error) {
        console.log(error);
    } else {
        files.forEach(function (filename) {
            fs.readFile(filename, 'utf8', function (error, data) {
              if (error) {
                console.log(err);
              } else {
                var templateName = filename
                    .replace(/^templates\//, '')
                    .replace(/\.json$/, '');
                templates[templateName] = data;
                console.log(util.format('Template %s loaded', templateName));
              }
            });
        });
    }
});