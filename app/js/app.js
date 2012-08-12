'use strict';

/* App Module */

angular.module('anylogr', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      otherwise({redirectTo: ''});
}]);
