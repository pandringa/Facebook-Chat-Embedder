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
	$("._38 a").each(function(i){
		var link = $(this);
		if(link.attr('hasBeenEmbedded')!='yes'){
			link.after('<div class="extension-embed-loading"><i class="fa fa-spinner fa-spin fa-3x"></i></div>');
			requestEmbed(link.attr('href'), $('._53').width())
				.done(function(data){
					link.next().after('<div class="extension-embedded-content">'+parseData(data)+'</div');
					link.attr('hasBeenEmbedded', 'yes');
					setTimeout(function(){
						link.next().remove();
					}, 1000);
				});
		}
	});
}

var parseData = function(data){
	if(data.html)
		return data.html;
	else if(data.type = 'photo' && data.url && data.provider_name != "Xkcd")
		return '<img src="'+data.url+'"/>';
	else if(data.thumbnail_url) //for stuff like Instagram and Xkcd that don't have embedded iframes
		return '<img src="'+data.thumbnail_url+'"/>';
	else
		return "";
}

var checker = null;

var checkLoad = function(){
	if($("._38").exists()){
		loadEmbeds();
	}
	checker = null;
}

//Checks for changes to the messenger, so that we can look for more links to change
$("#webMessengerRecentMessages").bind("DOMSubtreeModified", function() {
    if(checker == null)
    	checker = setTimeout(checkLoad, 1000); //so that we don't check multiple times per second
});