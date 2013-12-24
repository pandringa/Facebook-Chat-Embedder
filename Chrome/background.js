chrome.webRequest.onHeadersReceived.addListener(function(details){
  var headers = details.responseHeaders,
      blockingResponse = {};
  for( var i = 0, l = headers.length; i < l; i++ ) {
    if( headers[i].name == 'content-security-policy' ) {
      if (details.responseHeaders[i].name.toUpperCase() == "X-WEBKIT-CSP" || details.responseHeaders[i].name.toUpperCase() == "CONTENT-SECURITY-POLICY") {
        details.responseHeaders[i].value = "default-src *;script-src https://*.embed.ly https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl 'unsafe-inline' 'unsafe-eval' https://*.akamaihd.net http://*.akamaihd.net;style-src * 'unsafe-inline';connect-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.spotilocal.com:* https://*.akamaihd.net ws://*.facebook.com:* http://*.akamaihd.net https://*.embed.ly;"
      }
      break;
    }
    
  }
  blockingResponse.responseHeaders = headers;
  return blockingResponse;
},
{urls: ["*://*.facebook.com/*"]},
["blocking", "responseHeaders"]);