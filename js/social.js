var carloAppSocial = (function() {

	// Twitter Fetcher
	var twitterConfig = {
		"id": '571407933888823296',
		"domId": 'twitter-feed',
		"maxTweets": 5,
		"enableLinks": true,
		"showUser": true,
		"showTime": true
	};

	return {
		initTwitter: function() {
			twitterFetcher.fetch(twitterConfig);
		}
	};

})();

carloAppSocial.initTwitter();