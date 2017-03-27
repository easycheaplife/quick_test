var cheerio = require("cheerio");

var http = require("http");
function download(url, callback) {
	http.get(url, function(res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		 });
		res.on("end", function() {
		      callback(data);
		      });
		}).on("error", function() {
		    callback(null);
	  });
}
/*
var url = "http://www.dailymail.co.uk/news/article-2297585/Wild-squirrels-pose-charming-pictures-photographer-hides-nuts-miniature-props.html";
download(url,function(data){
	if (data) {
		console.log(data);
	}else{
		console.log(data);
	}		
});

download(url,function(data){
	if(data){
		var $ = cheerio.load(data);
		$("div.artSplitter > img.blkBorder").each(function(i, e) {
			console.log($(e).attr("src"));
		});
		console.log("done");
	}else{	
		console.log(data);
	}		
});
*/
var url = "http://www.echojs.com/";
download(url, function(data) {
	if (data) {
	    var $ = cheerio.load(data);
	    $("article").each(function(i, e) {
    	    var link = $(e).find("h2>a");
	    	var poster = $(e).find("username").text();
        	console.log(poster+": ["+link.html()+"]("+link.attr("href")+")");
	    });
	 }
});
