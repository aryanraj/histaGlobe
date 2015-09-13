var express = require('express');
var app = express();

var files_map = {
	"category" : "./data/state_city_category_count.json",
	"category_list" : "./data/category_list.json"
}

app.use(express.static('public'));

app.get('/category/:id', function(req, res){
	var category_id = req.params.id;
	var data = require(files_map["category"]);
	var outData = {};
	for(state in data) {
		outData[state] = 0;
		for(city in data[state])
			if(category_id in data[state][city])
				outData[state] += data[state][city][category_id];
	}
	res.end(JSON.stringify(outData));
});

app.get('/list/category', function(req, res){
	var data = require(files_map["category_list"]);
	res.end(JSON.stringify(data));
});

app.listen(process.env.PORT || 8080);

