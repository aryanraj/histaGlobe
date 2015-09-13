var request = require('request');
var crypto = require('crypto');

var rootURL = "https://api.quikr.com";

var data = {};

var apiname = {
	"AdsByLocation" : "/public/adsByLocation",
	"AdsByCategory" : "/public/adsByCategory",
	"Trending"		: "/public/trending",
	"LiveOnQuikr"	: "/public/liveOnQuikr"
}

function today (argument) {
	var dateStringMap = [
		"00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
		"10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
		"20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
		"30", "31"
	];
	var _today = new Date();
	return _today.getFullYear()+'-'+dateStringMap[_today.getMonth()+1]+'-'+dateStringMap[_today.getDate()];
}

function getSignature(index) {
	return crypto
		.createHmac('sha1', data.token)
		.update(data.appId+apiname[index]+today())
		.digest('hex')
}

function getHeaders(index) {
	return {
		"X-Quikr-App-Id" : data.appId,
		"X-Quikr-Token-Id" : data.tokenId,
		"X-Quikr-Signature" : getSignature(index)
	}
}

var quikr = function (_apiname, options, cb, err_cb) {
	var opt = {
		url : rootURL+apiname[_apiname],
		qs : options,
		headers : getHeaders(_apiname),
		json : true
	};
	// console.log(opt);
	request.get(opt, function (error, response, body) {
		if(error) {
			err_cb = err_cb || function(){};
			err_cb(error);
		} else {
			cb(body);
		}
	});
}

module.exports = function(config, cb) {
	data.appId = config.appId;
	data.appSecret = config.appSecret;
	data.email = config.email;

	request.post({
		url : rootURL+"/app/auth/access_token",
		json : {
			"appId" : data.appId,
			"signature" : crypto
					.createHmac('sha1', data.appSecret)
					.update(data.email+data.appId+today())
					.digest('hex')
		}
	}, function (error, response, body) {
		if(error)
	        console.log(error);
	    else {
	    	data.tokenId = body.tokenId;
	    	data.token = body.token;
	    	cb(quikr);
	    }
	});
}

// quikr(config, function (obj) {
	
	// obj("LiveOnQuikr",{}, function(data) {
	// 	console.log(data);
	// });
	
	// obj("AdsByLocation", {
	// 	lat : 25.6000,
	// 	lon : 85.1000
	// }, function(data) {
	// 	console.log(data);
	// });

	// obj("AdsByCategory", {
	// 	categoryId : 71,
	// 	city : "Delhi"
	// }, function(data) {
	// 	console.log(data);
	// });

	// obj("Trending", {
	// 	city : 31
	// }, function(data) {
	// 	console.log(data);
	// });


// });