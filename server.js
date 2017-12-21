/*
#Author Name: Zoilo Rabang Jr
#Designation: Software Engineer
#Version: 1.0.0
#Date: Dec. 21, 2017
#exam
*/

var http = require('http');
var https = require('https');
var express = require('express');
var url = require('url');
var data = require('./models/models');
var app = express();
var moment = require('moment');
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/* POST FORM PAGE  */
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname+'/views/form.html'));
})


/* GET response in segment */
app.get('/object/:key(*)',function (req, res){
	var totalkeys = Object.keys(req.query).length;
	if(totalkeys<=1){
		data.getdatainfo(function(err, results) {
			console.log(results);
			if(results.length>0){
				res.json(results);
			}else{
				res.json({"code":13,"status":"Invalid"});
			}	
		},req);		
	}else{
		res.json({"code" : 13, "status" : "Invalid key parameters"});
	}
});

/* GET all the records from the database table */
app.get('/records',function (req, res){
	var totalkeys = Object.keys(req.query).length;
	if(totalkeys<1){
		data.getall(function(err, results) {
			console.log(results);
			if(results.length>0){
				res.json(results);
			}else{
				res.json({"code":200,"status":"empty records"});
			}	
		},req);		
	}else{
		res.json({"code" : 13, "status" : "Invalid key parameters"});
	}
});

/* POST Request */
app.post('/object', function (req, res) {
   if(req.body.user.key!='' && req.body.user.value!=''){
		data.doinsert(function(err, results) {
			console.log(results);
			if(results.length>0){
				res.json(results);
			}else{
				res.json({"code":200,"status":"empty records"});
			}	
		},req);		   
   }else{
	   res.json({"code" : 300, "status" : "Fields are Required!"});
   }
   
})


var server = app.listen(8081, function (){
   var host = server.address().address
   var port = server.address().port
   
   console.log("Running....", "PORT: "+port);
});

