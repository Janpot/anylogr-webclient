/// <reference path="~/app/lib/angular/angular.js" />

'use strict';

angular.module('anylogr', ['anylogr.controllers', 'anylogr.services', 'anylogr.directives'])

  .config(function ($routeProvider) {
    var dataRoute = {
      templateUrl: 'partials/data.html',
      controller: 'DataCtrl',
      resolve: {
        anylogrTree: function (anylogrData) {
          return anylogrData.getTree();
        },
        delay: function ($timeout) {
          return $timeout(function() {console.log('simulate network')}, 300);
        }
      }
    };

    // todo: change to a single route when this angular functionality becomes available
    $routeProvider
        .when('/data', dataRoute)
        .when('/data/:path1', dataRoute)
        .when('/data/:path1/:path2', dataRoute)
        .when('/data/:path1/:path2/:path3', dataRoute)
        .when('/data/:path1/:path2/:path3/:path4', dataRoute)
        .when('/data/:path1/:path2/:path3/:path4/:path5', dataRoute)
        .otherwise({ redirectTo: '/data' });
  });
