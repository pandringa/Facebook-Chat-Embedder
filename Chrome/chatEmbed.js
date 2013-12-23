$.fn.exists = function () {
    return this.length !== 0;
}

var requestEmbed = function(url, width){
	var requestURL = 'https://api.embed.ly/1/oembed?'
						+'key=aaa9b6a954424915878e74b73fbabb28&'
						+'url='+url+'&'
						+'maxwidth='+width;
	return $.ajax(requestURL);
}

var loadEmbeds = function(){
	var links = $("._38 a");
	links.css("color", "red");
	links.each(function(i){
		var link = $(this);
		requestEmbed(link.attr('href'), $('._53').width())
			.done(function(data){
				link.after(data.html);
			});
	});
}
var checkLoad = function(){
	if($("._38").exists()){
		loadEmbeds();
		clearInterval(checker);
	}
}
var checker = setInterval(checkLoad, 500)