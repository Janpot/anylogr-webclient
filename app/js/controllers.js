/// <reference path="~/app/lib/angular/angular.js" />

'use strict';

/* Controllers */
var controllers = angular.module('anylogr.controllers', ['anylogr.services']);

controllers.controller('DataCtrl',
    function DataCtrl($scope, $location, itemTypes, anylogrTree, $rootScope) {
      
      // define views for every anylogr type
      var views = {};
      views[itemTypes.group] = 'partials/groupview.html';
      views[itemTypes.metric] = 'partials/metricview.html';


      // get the path
      // todo: get the segments from the routeparams when angular supports something like
      // regex in routedefinitions
      $scope.location = $location.path();

      var segments = $scope.location.substring(1).split('/');
      if (segments[0] === '') {
        segments = [];
      }


      // Build the breadcrumb from the current location. 
      var partialPath = '';
      $scope.breadcrumb = segments.map(function (segment) {
        partialPath += '/' + segment;
        return {
          name: segment,
          path: partialPath
        };
      });


      var currentItem = {
        name: anylogrTree.user,
        type: itemTypes.group,
        members: anylogrTree.groups
      }

      $scope.errorMsg = '';
      for (var i = 1; i < segments.length; i++) {
        if (currentItem.members == undefined) {
          $scope.errorMsg = 'item is not a group';
          break;
        }
        currentItem = currentItem.members.filter(function (item) {
          return item.name === segments[i];
        })[0];
        if (currentItem === undefined) {
          $scope.errorMsg = 'item does not exist';
          break;
        }
      }

      $scope.content = views[currentItem.type]
      $scope.data = currentItem;
      $scope.currentItem = currentItem;

    }
);

controllers.controller('GroupCtrl',
    function GroupCtrl($scope, itemTypes) {

      $scope.group = $scope.data;

      $scope.getItemUrl = function (item) {
        return '#' + $scope.location + '/' + item.name;
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