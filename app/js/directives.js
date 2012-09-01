var directives = angular.module('anylogr.directives', []);


directives.directive('highchart', function () {

  return {
    restrict: 'E',
    link: function (scope, elm, attrs) {

      var options = {
        chart: {
          renderTo: elm[0],
          type: 'line',
        },
        title: {
          text: attrs.hcTitle || "Chart Title"
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
      };      

      var chart = new Highcharts.Chart(options);
      
      attrs.$observe('hcTitle', function (value) {
        var title = chart.options.title;
        title.text = value || null;
        chart.setTitle(title, undefined);
        chart.redraw();
      });
      attrs.$observe('hcSubtitle', function (value) {
        var subtitle = chart.options.subtitle;
        console.log(subtitle);
        subtitle.text = value || null;
        chart.setTitle(undefined, subtitle);
        chart.redraw();
      });
      
    }
  };
});