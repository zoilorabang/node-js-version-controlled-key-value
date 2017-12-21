var http = require('http');
var pool = require('../config/connect');
var moment = require('moment');
var table = 'zr_version_tb';
/* get the latest value from the keys */
module.exports.getdatainfo = function (callback,req){

	var zkey = req.params.key;
	var timestamp=req.query.timestamp;
	if(timestamp){
		where="zr.key=? AND zr.timestamp=?";
		conVal=[zkey,timestamp];
	}else{
		where="zr.key=?";
		conVal=[zkey];
	}
    pool.getConnection(function(err,connection){
		if(err) {
		  callback(err, {"code" : 100, "status" : "Error in connection database"});
        }else{
			console.log('connected as id ' + connection.threadId);
			connection.query("select zr.key,zr.value from "+table+" zr where "+where+" order by zr.timestamp DESC limit 1",conVal,function(err,rows){	
				if (err) throw err;
				connection.release();
				callback(err, rows);
			});
		}			
	});
}

/* get all the data from database */
module.exports.getall = function (callback,req) {	
    pool.getConnection(function(err,connection){
		if(err) {
		  callback(err, {"code" : 100, "status" : "Error in connection database"});
        }else{
			console.log('connected as id ' + connection.threadId);
			connection.query("select * from "+table,function(err,rows){	
				if (err) throw err;
				connection.release();
				callback(err, rows);
			});
		}			
	});
}

/* insert new data into table */
module.exports.doinsert = function (callback,req) {	
    pool.getConnection(function(err,connection){
		if(err) {
		  callback(err, {"code" : 100, "status" : "Error in connection database"});
        }else{
		connection.query("INSERT INTO "+table+" ("+table+".key,"+table+".value,"+table+".timestamp) VALUE('"+req.body.user.key+"','"+req.body.user.value+"',UNIX_TIMESTAMP())",function(err,rows){	
			if (err) throw err;
			/* show latest data */
			connection.query("select * from "+table+" zr where zr.key=? order by zr.timestamp DESC limit 1",[req.body.user.key],function(err,rows){	
					if (err) throw err;
					callback(err, rows);
				});
		});
		}			
	});
}

/* update existing data from the current table */
module.exports.doupdate = function (callback,req) {	
    pool.getConnection(function(err,connection){
		if(err) {
		  callback(err, {"code" : 100, "status" : "Error in connection database"});
        }else{
		connection.query("UPDATE "+table+" SET "+table+".value='"+req.body.user.value+"',"+table+".timestamp=UNIX_TIMESTAMP() WHERE "+table+".key=?",[req.body.user.key],function(err,rows){	
			if (err) throw err;
				/* show latest data */
				connection.query("select * from "+table+" zr where zr.key=? order by zr.timestamp DESC limit 1",[req.body.user.key],function(err,rows){	
					if (err) throw err;
					callback(err, rows);
				});
		});
		}			
	});
}


