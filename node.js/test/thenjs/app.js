/*
then(function (defer) {

	    defer(err, ...);
}).then(function (defer, value) {

	    defer(err, ...);
}, function (defer, err) {

	    defer(err, ...);
}).then(function (defer) {
	  
	    defer(err, ...);
}).all(function (defer, err, value) {

	    defer(err, ...);
}).then(function (defer) {
	 
	    defer(err, ...);
}).fail(function (defer, err) {

});
*/

var thenjs = require('thenjs')
function thenjs_test() {
	thenjs((cont)=>{
		setTimeout(function(){
			console.log('step 1');
			cont(null);	
		},1000);
	}).then((cont) => {
		setTimeout(function(){
			console.log('step 2');
			cont(null,{'a':999});	
		},1000);
	}).then((cont,param) => {
		setTimeout(function(){
			console.log(param);
			console.log('step 3');
		},1000);
	}).fail((cont, err) => { 
		console.log('end');
	})
}

function thenjs_error_test(){
	thenjs((cont)=>{
		setTimeout(function(){
			console.log('step 1');
			cont('error test',{'key':'val'});	
		},1000);
	}).then((cont,param) => {
		setTimeout(function(){
			console.log(param);
			console.log('step 3');
		},1000);
	}).fail((cont, err) => { 
		console.log(err);
	})
}

if(0){
	thenjs_error_test();
}else{
	thenjs_test();
}

