var carloApp = angular.module('carloApp', ['ngRoute', 'ngAnimate', 'angular-loading-bar']);

// Constructors

var PageSection = function(name, url) {
  this.name = name;
  this.url = url;
  this.error = null;
};

// Controller

carloApp.config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider', function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/templates/splash.html',
		controller: 'carloController',
		controllerAs: 'splash_page'
	})
    $locationProvider.html5Mode(true);
	cfpLoadingBarProvider.latencyThreshold = 0;
}]).controller('carloController', ['$scope', '$http', 'cfpLoadingBar', function($scope, $http, cfpLoadingBar) {

	// App variables

	$scope.pageSections = [
		new PageSection('About Carlo', '/')
	];

	// Page sections initialization

	$scope.currentPageSection = 'splash_page';

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