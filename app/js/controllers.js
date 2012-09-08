/// <reference path="~/app/lib/angular/angular.js" />

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
    function GroupCtrl($scope, $timeout) {

      $scope.metric = $scope.data;

      $scope.series = [
        {
          data: [
              [Date.UTC(2012, 0, 1), 30],
              [Date.UTC(2012, 2, 1), 70],
              [Date.UTC(2012, 3, 1), 100]
          ]
        }
      ];

      $scope.series.push({
        data: [
            [Date.UTC(2012, 0, 1), 20],
            [Date.UTC(2012, 2, 1), 50],
            [Date.UTC(2012, 3, 1), 70]
        ]
      });
      
      $timeout(function () {
        $scope.series[0].name = 'joehoe';
        $scope.series[0].data = [
              [Date.UTC(2012, 0, 1), 70],
              [Date.UTC(2012, 2, 1), 20],
              [Date.UTC(2012, 3, 1), 60]
          ]
      }, 3000);

    }
);