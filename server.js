var express = require('express');
var app = express();
var config = require('./config/config');
var quikr = require('./src/quikr');

app.use(express.static('public'));

quikr(config, function (obj) {
	
	obj("LiveOnQuikr",{}, function(data) {
		console.log(data);
	});
	
	obj("AdsByLocation", {
		lat : 25.6000,
		lon : 85.1000
	}, function(data) {
		console.log(data);
	});

	obj("AdsByCategory", {
		categoryId : 71,
		city : "Delhi"
	}, function(data) {
		console.log(data);
	});

	obj("Trending", {
		city : 31
	}, function(data) {
		console.log(data);
	});

	app.listen(process.env.PORT || 8080);

});

