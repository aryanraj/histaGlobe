var express = require('express');
var app = express();
var config = require('./config/config');
var quikr = require('./src/quikr');

quikr(config, function (app) {
	
	app("AdsByCategory",{
		categoryId : 71,
		city : "Delhi" 
	}, function(data) {
		console.log(data);
	});

});

app.use(express.static('public'));

app.listen(process.env.PORT || 8080);