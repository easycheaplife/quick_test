var request = require('request');
request('http://127.0.0.1:3000/test', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body) 
	}
})
