var express = require('express');
var app = express();
var ip = '127.0.0.1';
var port = 3000;

app.get('/', function(req, res) {
	res.send('working!');
});

app.listen(port, ip, function() {
	console.log('listening on http://' + ip + ':' + port);
});