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

// Controller

carloApp.config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'splash_page'
	})
	.when('/pix', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'pix_page'
	})
	.when('/news', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
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
}]).controller('carloController', ['$scope', '$route', '$location', '$http', 'cfpLoadingBar', function($scope, $route, $location, $http, cfpLoadingBar) {

	// App variables

	$scope.pageSections = [
		new PageSection('Home', '/'),
		new PageSection('Pix', '/pix'),
		new PageSection('Ceremony', '/news'),
		new PageSection('Give', '/give'),
		new PageSection('Cats', '/cats')
	];

	$scope.splashTributes = [
		new SplashTribute('The last text I got from @lolcatstevens was so Carlo it hurts: "<3. Happy Valentine\'s Day a little early!" I miss you','Diego Prats','https://twitter.com/mexitlan/status/568542288504160256'),
		new SplashTribute('Then he looked at me earnestly and said, "I\'m going to rock for you today, Thomas." He broke into giggles as he swivelled back to his computer-machine','Thomas Dunlap','http://imgoingtorockforyou.today/'),
		new SplashTribute('I share most everything with anyone who asks, who seems genuinely interested, but you Carlo, you get it all, the good and the bad','Vyki Englert','https://medium.com/@vyki_e/love-you-carlo-8c8bb642a238'),
		new SplashTribute('@lolcatstevens was the only person I knew with the balls to tell people "I love you" for no apparent reason. i wish i\'d responded in kind','Dan Yoder','https://twitter.com/dyoder/status/568265570883235840'),
		new SplashTribute('And I really did like this young man.  He was technically awesome, personally friendly and unbelievably respectful to me','John Willis','http://itrevolution.com/karojisatsu/')
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

	$scope.type = function(string,element){
		(function writer(i){
			if(string.length <= i++){
				element.value = string;
				return;
			}
			element.value = string.substring(0,i);
			if( element.value[element.value.length-1] != " " )element.focus();
			var rand = Math.floor(Math.random() * (100)) + 40;
			setTimeout(function(){writer(i);},rand);
		})(0)
	}

	$scope.getRandomElement = function(array) {
		return array[Math.floor(Math.random() * array.length)]
	}

	$scope.makeTribute = function() {
		$scope.displayedTribute = $scope.getRandomElement($scope.splashTributes);
	}

}]).directive("scroll", function() {
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