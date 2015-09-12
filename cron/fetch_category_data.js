#!/usr/bin/env node
var quikr = require('../src/quikr');
var config = require('../config/config');
var city_state_map = require('../data/city_state_map');
var category_list = require('../data/category_list');
var fs = require('fs');
var path = require('path');

var outData = {};

var flag = 0;

function saveToFile() {
	if(flag == 0)
		fs.writeFile(path.join(__dirname,"..","data/state_city_category_count.json"), JSON.stringify(outData), function (err) {
			if(err)
				console.error(err);
		});
	if(flag%100 == 0)
		console.log(flag);
}

quikr(config, function(obj) {
	for(state in city_state_map) {
		outData[state] = {};
		var cities = city_state_map[state];
		for(city in cities) {
			outData[state][cities[city]] = {};
			for(category in category_list) {
				flag++;
				(function(state, city, category) {
					obj("AdsByCategory", {
						categoryId : category,
						city : city
					}, function(data){
						// console.log(state, city, category, data["AdsByCategoryResponse"]["AdsByCategoryData"]["total"]);
						try{
							outData[state][city][category] = data["AdsByCategoryResponse"]["AdsByCategoryData"]["total"];
						} catch(ex) {
							console.log(JSON.stringify(data));
							console.error(ex);
						}
						flag--;
						saveToFile();
					}, function(err){
						console.error(err);
						flag--;
						saveToFile();
					});
				})(state, cities[city], category);
			}
		}
	}
});
