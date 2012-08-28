/*jslint vars: true, white: true, browser: true, devel: true, maxlen: 80*/
/*global angular*/
'use strict';

/* Controllers */
var controllers = angular.module('anylogr.controllers', ['anylogr.services']);

controllers.controller('DataCtrl',
    function DataCtrl($scope, $location, $http, anylogr) {

      $scope.location = $location.path();

      // Build the breadcrumb from the current location.    
      var segments = $scope.location.split('/').splice(1);
      var partialPath = '';
      $scope.breadcrumb = segments.map(function (segment) {
        partialPath += '/' + segment;
        return {
          name: segment,
          path: partialPath
        };
      });

      var views = {
        'group': 'partials/groupview.html',
        'metric': 'partials/metricview.html'
      }

      // Get the data
      anylogr.get($scope.location + '.json').then(function (data) {

        $scope.content = views[data.type];

        $scope.errorMsg = '';
        $scope.tree = data;
      }, function (msg) {
        $scope.errorMsg = msg;
      });

      $scope.isGroup = function (item) {
        return item.type === 'group';
      };

      $scope.isMetric = function (item) {
        return item.type === 'metric';
      };


    }
);