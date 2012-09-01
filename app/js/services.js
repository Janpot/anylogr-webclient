/*jslint vars: true, white: true, browser: true, devel: true, maxlen: 80*/
/*global angular*/
'use strict';



var testData = {
  "id": 0,
  "name": "janpotoms",
  "type": "group",
  "content": [
      {
        "id": 1,
        "name": "fitness",
        "type": "group",
        "content": [
            {
              "id": 2,
              "name": "bench",
              "type": "group",
              "description": "My bench program y'all",
              "content": [
                  {
                    "id": 3,
                    "name": "gewicht",
                    "type": "metric",
                    "unit": "kg",
                    "description": "Beef it up, bitch"
                  },
                  {
                    "id": 4,
                    "name": "training-time",
                    "type": "metric",
                    "unit": "minutes",
                    "description": ""
                  }
              ]
            }
        ]
      },
      {
        "id": 5,
        "name": "tuin",
        "type": "group",
        "description": "Yo bitch, grow that shit",
        "content": [
            {
              "id": 6,
              "name": "olijfboom",
              "type": "metric",
              "description": "Fuck yeah, grow that mother of an olive tree"
            },
            {
              "id": 7,
              "name": "stinkzwam",
              "type": "metric",
              "description": "Motherfucking champi's yoo"
            }
        ]
      }
  ]
};

var services = angular.module('anylogr.services', []);


services.factory('anylogr', function ($http, $q) {

  var userid = 'janpotoms';

  return {
    get: function (url) {
      var deferred = $q.defer();

      var segments = url.split('.')[0].split('/').splice(1);

      if (segments[0] !== userid) {
        deferred.reject('not authorized (test service: .../janpotoms)');
      } else {
        var result = testData;

        for (var i = 1; i < segments.length; i++) {
          if (result.content == undefined) {
            deferred.reject('is not a group');
            break;
          }
          result = result.content.filter(function (item) {
            return item.name === segments[i];
          })[0];
          if (result === undefined) {
            deferred.reject('does not exist');
            break;
          }
        }

        deferred.resolve(result);
      }

      return deferred.promise;
    }
  };
});

services.value('itemTypes', {
  group: 'group',
  metric: 'metric'
});



/*
services.directive('highChart', function () {

  return {
    restrict: 'A',
    link: function (scope, elm, attrs) {
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: elm[0],
          type: 'line',
        },
        title: {
          text: null
        },
        subtitle: {
          text: null
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
            this.x + ': ' + this.y + '°C';
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
      });
    }
  };
});
*/