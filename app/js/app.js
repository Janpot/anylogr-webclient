/// <reference path="~/app/lib/angular/angular.js" />

'use strict';

/* App Module */

angular.module('anylogr', ['anylogr.controllers', 'anylogr.services', 'anylogr.directives']).
  config(['$routeProvider', function ($routeProvider) {
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
        }).otherwise({ redirectTo: '/janpotoms' });
  }]);
