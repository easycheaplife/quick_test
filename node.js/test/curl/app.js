var curl = require('curlrequest');
var iconv = require('iconv-lite');

var options = { url: 'http://ypk.39.net/786890/', include: true ,encoding :"binary"};

curl.request(options, function (err, parts) {
	var buf = new Buffer(parts, 'binary');
	var str  = iconv.decode(buf, 'gb2312');  	
	console.log(str);
});
