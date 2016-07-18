var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var requests = require('request');
var mustache = require('mustache');
var glob = require("glob");
var templates = require('./templates.js');

var hipchat_host = (process.env.HIPCHAT_HOST || 'https://hipchat.zalando.net');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.all('*', function(request, response) {

    var type = request.get('X-GitHub-Event');
    var token = request.body.auth_token;
    var room = request.body.room_id;

    if (!type || !token || !room || !request.body.payload) {
        response.status(400).send("This is not a valid event.");
        return;
    }

    console.log(request.body.payload);

    var payload = JSON.parse(request.body.payload.replace(/\\"/g, '"'));

    console.log(type + ' @ ' + room);

    var template = templates.getTemplate(type);
    if (!template) {
        response.status(400).send("Unknown event type " + type);
        return;
    }

    var body = mustache.render(template, payload);
    requests.post(hipchat_host + '/v2/room/' + room + '/notification',
        {
            json: JSON.parse(body),
            auth: { bearer: token }
        },
        function (error, res, b) {
            response.status(res.statusCode).send(b);
        }
    );
    
});

app.listen(app.get('port'), function() {
    console.log('Running on port', app.get('port'));
    console.log('Proxying to', hipchat_host);
});
