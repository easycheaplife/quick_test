var pm2 = require('pm2');
pm2.connect(function(err) {
	if (err) {
		console.error(err);
		process.exit(2);
	}

	// pm2 start app.js -i 0 --name "api"
	// monitor the status
	pm2.describe('api',function(err,processDescription){
		console.log(processDescription);
		pm2.disconnect();   // Disconnects from PM2
		if (err) throw err
	});

});
