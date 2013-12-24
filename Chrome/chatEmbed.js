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

var parseData = function(data){
	if(data.html)
		return data.html;
	else if(data.type == 'link') // If their API doesn't have a result for this website
		return "";
	else if(data.type = 'photo' && data.url && data.provider_name != "Xkcd") 	//For stuff that doesn't have iframes
		return '<img src="'+data.url+'"/>';
	else if(data.thumbnail_url) 	// except for some, which don't have photo urls either, only thumbnails
		return '<img src="'+data.thumbnail_url+'"/>';
	else 	// man, this API is weird
		return "";
}


var loadEmbeds = function(loc){
	var selector = loc=='window' ? '.fbChatConvItem > .messages a._553k' : '._38 a._553k';
	$(selector).each(function(i){
		var link = $(this);
		if(link.attr('hasBeenEmbedded')!='yes'){
			link.attr('hasBeenEmbedded', 'yes');
			link.after('<div class="extension-embed-loading"><i class="fa fa-spinner fa-spin fa-3x"></i></div>');
			requestEmbed(link.attr('href'), $(this).parent().width())
				.done(function(data){
					link.next().after('<div class="extension-embedded-content">'+parseData(data)+'</div');
					setTimeout(function(){
						link.next().remove();
					}, 1000);
				})
				.fail(function(err){
					setTimeout(function(){
						link.next().remove();
					}, 1000);
				});
		}
	});
}

var checkerMain = null;
	checkerWindow = null;
var checkLoadMain = function(){
	if($("._38").exists())
		loadEmbeds('main');
	checkerMain = null;
}

var checkLoadWindow = function(){
	if($(".fbChatConvItem > .messages").exists())
		loadEmbeds('window');
	checkerWindow = null;
}

//Checks for changes to the messenger, so that we can look for more links to change
$("#webMessengerRecentMessages").bind("DOMSubtreeModified", function() {
    if(checkerMain == null)
    	checkerMain = setTimeout(checkLoadMain, 1000); //so that we don't check multiple times per second
});

$(function(){
	checkLoadMain();
	checkLoadWindow();
	console.log('testing');

	setInterval(checkLoadWindow, 1000);
});