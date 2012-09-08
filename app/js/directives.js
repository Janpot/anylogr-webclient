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
      var currId = 0;

      scope.$watch(attrs.hcSeries, function (newSeriesList) {
        // copy the chart series for removal later on
        var toRemoveChartSeries = chart.series.map(function (chartSeries) {
          return chartSeries;
        });
        
        newSeriesList.forEach(function (newSeries) {
          if (newSeries.$id === undefined) {
            // this is a new series
            newSeries.$id = currId;
            chart.addSeries(newSeries, false);
            currId += 1;
          } else {
            var i = 0;
            while (i < toRemoveChartSeries.length && toRemoveChartSeries[i].options.$id !== newSeries.$id) {
              i += 1;
            }

            if (i >= toRemoveChartSeries.length) {
              // something is messed up, do nothing
              console.error('the new series already has an $id but does not exist yet');
            } else {
              // update series
              var chartSeries = toRemoveChartSeries[i];
              toRemoveChartSeries.splice(i, 1);
              chartSeries.setData(newSeries.data, false);

            }
          }
        });

        // remove left over series
        while (toRemoveChartSeries.length > 0) {
          toRemoveChartSeries[0].remove(false);
        }

        chart.redraw();
      }, true);

    }
  };
});