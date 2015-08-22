var LongPolling = {

	timestamp    : null,
	url_server   : null,
	url_db       : null,
	container    : null,

	init: function(){
		LongPolling.url_server = 'servidor.php';
		LongPolling.url_db     = 'db.php';
		LongPolling.container1 = $("#container1");
		LongPolling.container2 = $("#container2");		
		LongPolling.check_server();
		LongPolling.check_server_db();
	},

	check_server: function(timestamp){
 		var data = { timestamp : timestamp };
 		LongPolling.__ajax(LongPolling.url_server, data, function(result){
 			var json = $.parseJSON(result);
 			var str  = json.content;
 			LongPolling.container1.empty().html(str);
 			LongPolling.check_server(json.timestamp);
 		});
	},

	check_server_db: function(timestamp){
 		var data = { timestamp : timestamp };
 		LongPolling.__ajax(LongPolling.url_db, data, function(result){
 			var json = $.parseJSON(result);
 			var str  = new Array();
 			for(var i=0; i<json.length; i++){
 				str.push("id: " + json[i].id);
 				str.push("name: " + json[i].name);
 				str.push("date: " + json[i].date_update);
 				str.push("<br/>");
 			}
 			LongPolling.container2.prepend(str.join("<br/>"));
 			LongPolling.check_server_db(json[0].date_update);
 		});
	},

	__ajax: function(url, data, callBack){
		$.ajax({
		    type : "POST",
		    url  : url,
		    data : data,
		    success: function (result) {
		    	if(!LongPolling.__is_empty(callBack)){
		    		callBack(result);
		    	}
		    },
		});
	},

	__is_empty: function(val){
		return (val == "" || val == null || val == undefined);
	}
}

$(document).ready(function(){
    LongPolling.init();
});