var express = require('express');
var RingBuffer = require('./ring.js');
var bodyParser = require('body-parser');
var multer = require('multer'); 

var app = express();

var ring = new RingBuffer(parseInt(process.env.CONFIG_BUFFER_SIZE || 5));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({strict: false}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.all('*', function(request, response) {
    var body = { 
        "time": new Date().toISOString(),
        "message": request.url
    };
    ring.enq(body);
    response.status(200).json(body);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
