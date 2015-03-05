(function() {
  var SLIDE_SPACING, SLIDE_TOTAL_WIDTH, SLIDE_WIDTH, app;

  app = angular.module('angular-slider', ['ngTouch']);

  SLIDE_WIDTH = 100;

  SLIDE_SPACING = 5;

  SLIDE_TOTAL_WIDTH = SLIDE_WIDTH + SLIDE_SPACING;

  app.directive('slider', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      replace: true,
      controller: [
        '$scope', '$element', '$swipe', function($scope, $element, $swipe) {
          var _this = this;
          this.slides = $scope.slides = [];
          this.index = $scope.index = 0;
          this.rails = angular.element($element.children()[0].children[0]);
          $scope.selectSlide = function(i) {
            _this.index = i;
            _this.offsetRails(0);
          };
          $scope.previousSlide = function() {
            if (_this.index > 0) {
              return $scope.selectSlide(_this.index - 1);
            }
          };
          $scope.nextSlide = function() {
            if (_this.index < _this.slides.length - 1) {
              return $scope.selectSlide(_this.index + 1);
            }
          };
          $scope.isSlideActive = function(i) {
            return _this.index === i;
          };
          this.addSlide = function(slide) {
            slide.index = _this.slides.length;
            return _this.slides.push(slide);
          };
          this.getMinOffset = function() {
            return (_this.slides.length - 1) * -SLIDE_TOTAL_WIDTH;
          };
          this.offsetRails = function(x) {
            var offset;
            offset = SLIDE_WIDTH * x / _this.rails[0].offsetWidth + _this.index * -SLIDE_TOTAL_WIDTH;
            offset = window.Math.min(0, window.Math.max(offset, _this.getMinOffset()));
            return _this.rails.css({
              left: offset + '%'
            });
          };
          this.onSwipeStart = function(e) {
            _this.initial = e.x;
            return _this.rails.css({
              transition: 'none'
            });
          };
          this.onSwipeMove = function(e) {
            return _this.offsetRails(e.x - _this.initial);
          };
          this.onSwipeFinish = function(e) {
            _this.offsetRails(0);
            return _this.rails.css({
              transition: null
            });
          };
          $swipe.bind(angular.element(this.rails), {
            start: this.onSwipeStart,
            move: this.onSwipeMove,
            end: this.onSwipeFinish,
            cancel: this.onSwipeFinish
          });
        }
      ],
      template: '<div class="slider">' + '<div class="slider__viewport">' + '<div class="slider__rails" ng-swipe-left="nextSlide()" ng-swipe-right="previousSlide()" ng-transclude></div>' + '</div>' + '<ul class="slider__links">' + '<li class="slider__link" ng-click="previousSlide()">&larr;</li>' + '<li class="slider__link" ' + 'ng-repeat="slide in slides" ' + 'ng-click="selectSlide(slide.index)" ' + 'ng-class="{\'slider__link--ghost\':isSlideActive(slide.index)}"> ' + '{{slide.index + 1}}' + '</li>' + '<li class="slider__link" ng-click="nextSlide()">&rarr;</li>' + '</ul>' + '</div>'
    };
  });

  app.directive('slide', function() {
    return {
      require: '^slider',
      restrict: 'E',
      transclude: true,
      scope: {
        src: '@'
      },
      replace: true,
      link: function(scope, element, attrs, slidesCtrl) {
        slidesCtrl.addSlide(scope);
        scope.style = {
          left: scope.index * SLIDE_TOTAL_WIDTH + '%'
        };
        if (scope.src) {
          return scope.style['background-image'] = 'url(' + scope.src + ')';
        }
      },
      template: '<div class="slider__slide" ng-style="style" ng-transclude></div>'
    };
  });

}).call(this);
