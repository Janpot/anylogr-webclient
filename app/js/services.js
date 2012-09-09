/// <reference path="~/app/lib/angular/angular.js" />

'use strict';

var testTree = {
  "user": "testuser",
  "groups": [{
    "type": "group",
    "name": "group1",
    "id": 1,
    "members": [{
      "type": "metric",
      "name": "group1-metric1",
      "id": 3
    }, {
      "type": "metric",
      "name": "group1-metric2",
      "id": 4
    }, {
      "type": "group",
      "name": "subgroup1",
      "id": 5,
      "members": [{
        "type": "metric",
        "name": "subgroup1-metric1",
        "id": 6
      }, {
        "type": "metric",
        "name": "subgroup1-metric2",
        "id": 7
      }],
      "expanded": true
    }],
    "expanded": true
  },
{
  "type": "group",
  "name": "group2",
  "id": 2,
  "members": [],
  "expanded": true
}],
  "idCounter": 7
};

angular.module('anylogr.services', [])

  .factory('anylogrData', function ($q, $http) {
    return {
      getTree: function () {
        var deferred = $q.defer();

        // todo: get tree with ajax
        deferred.resolve(testTree);

        return deferred.promise;
      }
    };
  })

  .value('itemTypes', {
    group: 'group',
    metric: 'metric'
  });