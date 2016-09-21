angular.module('smarthome')
  .directive('nicolasCage', function () {
    return {

    restrict: 'E',
    scope: {
      // id: "@",
      // nickname: "@"
    },
    templateUrl: "./app/component/widgets/nicolasCage.html",
    link(scope, element, attrs) {

    },
    controller($scope, dashboardSrvc) {
      var colors = ['#ff7f0e', '#17A2C6', '#26ca28', '#C52128', '#dfe923', '#2f55b6'];
      $scope.options = {
            chart: {
                type: 'pieChart',
                color: function (d, i) {
                  return (d.data && d.data.color) || colors[i % colors.length]
                },
                height: 350,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            }
        ];

    },
  }
})
