var carloAppSocial = (function() {

	// Twitter Fetcher
	var twitterConfig = {
		"id": '571407933888823296',
		"domId": 'twitter-feed',
		"maxTweets": 9,
		"enableLinks": true,
		"showUser": true,
		"showTime": true,
  		"showImages": false
	};

	return {
		initTwitter: function() {
			twitterFetcher.fetch(twitterConfig);
		},
		initOAuth: function() {
			OAuth.initialize('');
			OAuth.popup('twitter',  {cache: true})
			.done(function(result) {
				//use result.access_token in your API request 
				//or use result.get|post|put|del|patch|me methods (see below)
			})
			.fail(function (err) {
				console.log(err);
			});
		}
	};

})();

carloAppSocial.initTwitter();