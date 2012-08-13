'use strict';

/* Controllers */

function DataCtrl($scope, $routeParams) {
    var buildUrl = '/data';
    $scope.path = [{part: 'data', url: buildUrl}];
    
    for (var i = 1; i <= 4; i++) {
        var part = $routeParams['path' + i];
        if (part != undefined) {
            buildUrl += '/' + part;
            $scope.path.push({part: part, url: buildUrl});
        } else {
            break;
        }
    }
}
