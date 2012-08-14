/*jslint vars: true, white: true, browser: true, devel: true, maxlen: 80*/
/*global angular, DataCtrl*/
'use strict';

/* App Module */

angular.module('anylogr', ['anylogr.controllers']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/:user', {
          templateUrl: 'partials/data.html',
          controller: 'DataCtrl'
      })
      .when('/:user/:path1', {
          templateUrl: 'partials/data.html',
          controller: 'DataCtrl'
      })
      .when('/:user/:path1/:path2', {
          templateUrl: 'partials/data.html',
          controller: 'DataCtrl'
      })
      .when('/:user/:path1/:path2/:path3', {
          templateUrl: 'partials/data.html',
          controller: 'DataCtrl'
      }).
      when('/:user/:path1/:path2/:path3/:path4', {
          templateUrl: 'partials/data.html',
          controller: 'DataCtrl'
      }).otherwise({redirectTo: '/janpotoms'});
}]);
