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
                            "type": "number",
                            "unit": "kg",
                            "description": "Beef it up, bitch"
                        },
                        {
                            "id": 4,
                            "name": "training-time",
                            "type": "number",
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
                    "type": "image",
                    "description": "Fuck yeah, grow that mother of an olive tree"
                },
                {
                    "id": 7,
                    "name": "stinkzwam",
                    "type": "image",
                    "description": "Motherfucking champi's yoo"
                }
            ]
        }
    ]
};
    
var services = angular.module('anylogr.services', []);

services.factory('anylogr', function($http, $q) {
    
    var userid = 'janpotoms';
    
    return {
        get: function(url) {
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
                    result = result.content.filter(function(item) {
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