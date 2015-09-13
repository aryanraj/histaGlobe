var express = require('express');
var app = express();

var files_map = {
	"category" : "./data/state_city_category_count.json",
	"category_list" : "./data/category_list.json",
	"cities_list" :  "./data/city.json"
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


app.get('/cities', function(req, res){
	var category_id = req.params.id;
	var cities = require(files_map["cities_list"]);
	var catergoryList = require(files_map["category"]);
	var outData = {};
	for(city in cities) {
	//	console.log(city);
	//	console.log(cities[city]);	
	//	console.log(cities[city].name);
		for(categoryl in catergoryList)
		{
			for(something in catergoryList[categoryl])
			{
				if(something.toLowerCase() === cities[city].name.toLowerCase())
				{
					//	console.log("hi");
					console.log(catergoryList[categoryl][something]);
					console.log()
					outData[something.toLowerCase()] = 0;
					outData[something.toLowerCase()] = {};
					outData[something.toLowerCase()].name = (cities[city].name.toLowerCase());
					outData[something.toLowerCase()].val1 = (catergoryList[categoryl][something][71]);
					outData[something.toLowerCase()].val2 = (catergoryList[categoryl][something][72]);
					outData[something.toLowerCase()].val3 = (catergoryList[categoryl][something][147]);
					outData[something.toLowerCase()].val4 = (catergoryList[categoryl][something][149]);
					outData[something.toLowerCase()].lat = (cities[city].lat);
					outData[something.toLowerCase()].lon = (cities[city].lon);
			//		console.log("----");
			//		console.log(outData[something.toLowerCase()].val1);
			//		console.log(outData[something.toLowerCase()].val2);
			//		console.log(outData[something.toLowerCase()].val3);
			//		console.log(outData[something.toLowerCase()].val4);
			//		console.log(outData[something.toLowerCase()].lat);
			//		console.log(outData[something.toLowerCase()].lon);
					break;
				
				}
			}
			// break;	
		}
	}
	console.log(outData);
	res.end(JSON.stringify(outData));
});


app.get('/list/category', function(req, res){
	var data = require(files_map["category_list"]);
	res.end(JSON.stringify(data));
});

app.listen(process.env.PORT || 8080);

