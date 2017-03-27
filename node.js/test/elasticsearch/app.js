var elasticsearch = require('elasticsearch');
 
var connectionString = 'http://localhost:9200';
 
var client = new elasticsearch.Client({
	host: connectionString
});

function searchAll(index,type){
	client.search({
		index: index,
		type: type,
			body: {
				"from":0,
				"size":50,
				"fields":['doctorId','name'],
				"query" : {
					"matchAll" : {'boost':2.0}	
				}
			}
		}).then(function (resp) {
				 console.log("%j",(resp));
			}, function (err) {
				console.log(err.message);

			}
		)
}

function searchAll2(index,type){
	client.search({
		index: index,
		type: type,
			body: {
				"from":0,
				"size":50,
				"query" : {
					"matchAll" : {'boost':2.0}	
				}
			}
		}).then(function (resp) {
				 console.log("%j",(resp));
			}, function (err) {
				console.log(err.message);

			}
		)
}
	
function pushData(){
	// get the current status of the entire cluster.
	// // Note: params are always optional, you can just send a callback
	client.cluster.health(function (err, resp) {
		if (err) {
			console.error(err.message);
		 } else {
            console.dir(resp);
		 }
	 });

	client.index({
		index: 'blog',
		type: 'post',
		//id: 1,
		 body: {
			title: 'JavaScript Everywhere!',
			content: 'It all started when...',
			date: '2013-12-17'
			}
		}, function (err, resp) {
	 // ...
	});
}
	
pushData();
searchAll('youyi','doctor');
searchAll2('blog','post');

