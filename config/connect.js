var http = require('http');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
    host: 'LOCALHOST',
    user: 'ROOT',
    password:'YOURPASSWORD',
    database:'YOUR_node_DB',
    debug: false
});
	
module.exports = pool;