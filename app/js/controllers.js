/*jslint vars: true, white: true, browser: true, devel: true, maxlen: 80*/
/*global angular*/
'use strict';

/* Controllers */
var controllers = angular.module('anylogr.controllers', ['anylogr.services']);

controllers.controller('DataCtrl',
    function DataCtrl($scope, $location, anylogr, itemTypes) {

      // define views for every anylogr type
      var views = {};
      views[itemTypes.group] = 'partials/groupview.html';
      views[itemTypes.metric] = 'partials/metricview.html';



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

      

      // Get the data
      anylogr.get($scope.location + '.json').then(function (data) {

        $scope.content = views[data.type];

        $scope.errorMsg = '';
        $scope.data = data;
      }, function (msg) {
        $scope.errorMsg = msg;
      });

    }
);

controllers.controller('GroupCtrl',
    function GroupCtrl($scope, itemTypes) {

      $scope.group = $scope.data;

      $scope.getItemUrl = function (item) {
        return $scope.location + '/' + item.name;
      }

      $scope.isGroup = function (item) {
        return item.type === itemTypes.group;
      };

      $scope.isMetric = function (item) {
        return item.type === itemTypes.metric;
      };

    }
);

controllers.controller('MetricCtrl',
    function GroupCtrl($scope) {

      $scope.metric = $scope.data;

      $scope.charttype = 'bar';


    }
);