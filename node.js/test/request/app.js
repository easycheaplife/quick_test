var iconv = require('iconv-lite');
var request = require('request');
var BufferHelper = require('bufferhelper');
var zlib = require('zlib');

var url = 'http://jbk.39.net/bw/nanke_p0#ps';
var url = 'http://ypk.39.net/786890/';
var url = 'http://jbk.39.net/jiancha/search/X';
var url = 'http://jbk.39.net/jiancha/search/F_p1';
var url = 'http://jbk.39.net/jiancha/search/F_p2';
var url = 'http://jbk.39.net/jiancha/search/G_p1';
var url = 'http://jbk.39.net/jiancha/search/K_p10';
var url = 'http://jbk.39.net/jiancha/search/x_p11';
var url = 'http://jbk.39.net/jiancha/search/Z_p14';
var url = 'http://jbk.39.net/jiancha/search/x_p46';
var url = require('url').parse('http://jbk.39.net/jiancha/search/F_p1');

var opt = {
         host: '125.39.225.4',
	     port: 18002,
	     method: 'GET',
	     uri: url,
		 encoding:'binary',
		 headers:{
			 "user-agent":'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
			 'accept':'text/html,application/xhtml+xml',
			 'Accept-Encoding':'gzip, deflate'
		 }
	}
request(opt, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var str = '';
		if(1){
			console.log(response.headers['content-encoding']);		
			if( -1 != response.headers['content-encoding'].indexOf('gzip')){
				//	ungzip
				//	reference from:
				//	https://cnodejs.org/topic/532269f4d7ede09c72000a8 
				//	http://homeway.me/2015/03/03/nodejs-gzip-deflate-compression/
				var buf = new Buffer(body, 'binary');
				zlib.gunzip(buf, function (err, decoded) {
					if(err){
						console.error();
					}
					str = iconv.decode(decoded, 'gb2312');
					console.log(str);
				});
			}
		}else{
			var bufferHelper = new BufferHelper();       
			bufferHelper.concat(body); 
			str = iconv.decode(bufferHelper.toBuffer(),'gb2312');
		}
		console.log(str);
	}
	if(error){
		console.error(error);
	}
})



