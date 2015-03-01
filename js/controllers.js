var carloApp = angular.module('carloApp', ['ngRoute', 'ngAnimate', 'angular-loading-bar']);

// Constructors

var PageSection = function(name, url) {
	this.name = name;
	this.url = url;
	this.error = null;
};

var SplashTribute = function(content, author, link) {
	this.content = content;
	this.author = author;
	this.link = link;
	this.error = null;
}

var typewriterTimer1;
var typewriterTimer2;

// Controller

carloApp.config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'splash_page'
	})
	.when('/news', {
		templateUrl: '/templates/news.html',
		controller: 'carloNewsController',
		controllerAs: 'news_page'
	})
	.when('/give', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'give_page'
	})
	.when('/cats', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'cats_page'
	});
	cfpLoadingBarProvider.latencyThreshold = 0;
}])

.controller('carloController', ['$scope', '$route', '$location', '$http', 'cfpLoadingBar', function($scope, $route, $location, $http, cfpLoadingBar) {

	// App variables

	$scope.pageSections = [
		new PageSection('Home', '/'),
		new PageSection('Ceremony', '/news'),
		new PageSection('Give', '/give'),
		new PageSection('Cats', '/cats')
	];

	// Let's keep these focused on the positive impact that Carlo has made on all of us
	$scope.splashTributes = [
		new SplashTribute('The last text I got from @lolcatstevens was so Carlo it hurts: "<3. Happy Valentine\'s Day a little early!" I miss you','Diego Prats','https://twitter.com/mexitlan/status/568542288504160256'),
		new SplashTribute('Then he looked at me earnestly and said, "I\'m going to rock for you today, Thomas." He broke into giggles as he swivelled back to his computer-machine','Thomas Dunlap','http://imgoingtorockforyou.today/'),
		new SplashTribute('I share most everything with anyone who asks, who seems genuinely interested, but you Carlo, you get it all, the good and the bad','Vyki Englert','https://medium.com/@vyki_e/love-you-carlo-8c8bb642a238'),
		new SplashTribute('@lolcatstevens was the only person I knew with the balls to tell people "I love you" for no apparent reason. i wish i\'d responded in kind','Dan Yoder','https://twitter.com/dyoder/status/568265570883235840'),
		new SplashTribute('And I really did like this young man.  He was technically awesome, personally friendly and unbelievably respectful to me','John Willis','http://itrevolution.com/karojisatsu/'),
		new SplashTribute('@lolcatstevens as soon as you drop the mic, the whole industry turned into "head pigeons" and "kitten viewers"','Ryan Wolf','https://twitter.com/5000lobsters/status/568121045560868864')
	];

	$scope.displayedTribute = $scope.splashTributes[0];

	// Page sections initialization

	$scope.currentPageSection = $location.url();

	// Loading bar
	
	$scope.start = function() {
    	cfpLoadingBar.start();
    };

    $scope.complete = function() {
    	cfpLoadingBar.complete();
    }

    // Navigation

	$scope.sectionClick = function(tab) {
		$scope.currentPageSection = tab.url;
	}

	$scope.isActiveSection = function(tabUrl) {
		return tabUrl == $scope.currentPageSection;
	}

	// Tributes

	$scope.typewriter = function(){
		var i = 0;
		var string = $scope.displayedTribute.content;
		var element = angular.element(document.querySelector('#tribute-text'));
		(function type() {
			letter = string[i];
			if (i == string.length) {
				typewriterTimer1 = window.setTimeout(function(){element.html(''); $scope.displayedTribute = $scope.getRandomElement($scope.splashTributes); $scope.typewriter(); $scope.$apply();}, 3000);
				return;
			} else {
				element.html(element.html() + letter);
				// Grr Chrome repaint bugs
				element[0].style.display='none';
				element[0].offsetHeight;
				element[0].style.display='inline';
				i+=1;
				typewriterTimer2 = window.setTimeout(type, Math.random() * 100 + 30);
			}
		}());
	}

	$scope.getRandomElement = function(array) {
		return array[Math.floor(Math.random() * array.length)]
	}

	$scope.makeTribute = function() {
		window.clearTimeout(typewriterTimer1);
		window.clearTimeout(typewriterTimer2);
		$scope.displayedTribute = $scope.getRandomElement($scope.splashTributes);
		$scope.typewriter();
	}

	$scope.initTwitterFeed = function() {
		// Twitter Fetcher
		var twitterConfig = {
			"id": '571407933888823296',
			"domId": 'twitter-feed',
			"maxTweets": 6,
			"enableLinks": true,
			"showUser": true,
			"showTime": true,
	  		"showImages": false
		};

		twitterFetcher.fetch(twitterConfig);
	}

}])

.controller('carloNewsController', ['$scope', function($scope, $routeParams) {
     $scope.initGMap = function() {
     	var map;
		function initialize() {
			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644)
			};
			map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
		}

		google.maps.event.addDomListener(window, 'load', initialize);
     }
 }])

.directive("scroll", function() {
	var page = angular.element(window);
	return {
		restrict: 'C',
		link: function(scope, element, attrs) {
			page.bind('scroll', function(e) {
				var scrollSpeed = 1.75;
				var fade = false;
				if (element.hasClass('scroll-slow')) {
					scrollSpeed = 1.15;
					fade = true;
				}
				element.css({'margin-top': page[0].pageYOffset/scrollSpeed + 'px'});
				if (fade) {
					element.css({'opacity':1-page[0].pageYOffset/640});
				}
			});
		}
	};
});