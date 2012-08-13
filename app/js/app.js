'use strict';

/* App Module */

angular.module('anylogr', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/data', {templateUrl: 'partials/data.html',   controller: DataCtrl}).
      when('/data/:path1', {templateUrl: 'partials/data.html',   controller: DataCtrl}).
      when('/data/:path1/:path2', {templateUrl: 'partials/data.html',   controller: DataCtrl}).      
      when('/data/:path1/:path2/:path3', {templateUrl: 'partials/data.html',   controller: DataCtrl}).
      when('/data/:path1/:path2/:path3/:path4', {templateUrl: 'partials/data.html',   controller: DataCtrl}).
      otherwise({redirectTo: '/data'});
}]);
