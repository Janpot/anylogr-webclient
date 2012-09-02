/// <reference path="~/app/lib/angular/angular.js" />

var directives = angular.module('anylogr.directives', []);

directives.directive('highchart', function () {

  return {
    restrict: 'E',
    link: function (scope, elm, attrs) {

      var options = {
        chart: {
          renderTo: elm[0],
          type: 'line'
        },
        title: {
          text: null
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: null
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        }
      };      

      var chart = new Highcharts.Chart(options);

      scope.$watch(attrs.hcSeries, function (newSeries) {
        // remove old series
        while (chart.series.length > 0) {
          chart.series[0].remove(false);
        }

        // add new series
        newSeries.forEach(function (serie) {
          chart.addSeries(serie, false);
        });
        
        chart.redraw();
      }, true);
      
    }
  };
});