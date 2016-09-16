angular.module('smarthome')
  .directive('breechLine', function () {
    return {

    restrict: 'E',
    scope: {
      id: "=",
      nickname: "="
    },
    templateUrl: "./app/component/widgets/breechLine.html",
    link(scope, element, attrs) {

    },
    controller($scope, dashboardSrvc) {
        dashboardSrvc.getHistory($scope.id).then(
          function (response) {
            var rawData = response;
            console.log('response', response);
      let dates = [];
      for (let i = 29; i >= 0; i--) {
        dates.push({date: moment().subtract(i, 'days').format("MM-DD"),
          count: 0, stamp: moment().subtract(i, 'days')})
      }
      for (let i = 0; i < rawData.length; i++) {
        for (let j = 0; j < dates.length; j++) {
          if (moment(rawData[i].time_stamp).format("MM-DD") == dates[j].date) {
            dates[j].count++;
            break;
          }
        }
      }
      var FrequencyValues = [];
      for (let i = 0; i < dates.length; i++) {
        FrequencyValues.push({x: dates[i].stamp, y: dates[i].count})
      }
      var maxValue = 0;
      for (let i = 0; i < FrequencyValues.length; i++) {
        if (FrequencyValues[i].y > maxValue) {
          maxValue = FrequencyValues[i].y;
        }
      }
      // var minDate = getDate(data[0]),
      //   maxDate = getDate(data[data.length-1]);


      // var  y = d3.scale.linear().domain([0, 50]).range([h, 0]),
      // var  x = d3.time.scale().domain([minDate, maxDate]).range([0, w]);
      // var tickMultiFormat = d3.time.format.multi([
      //     ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
      //     ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
      //     ["%Y", function() { return true; }]
      // ]);
      // for (let i = 0; i < rawData.length; i++) {
      //   if (rawData[i].status == "Open") {
      //     for (let j = 0; j < dates.length; j++) {
      //       if (dates[j].date == moment(rawData[i].time_stamp).format("MM-DD")) {
      //         dates[j].count++;
      //         break;
      //         console.log(moment(rawData[i]).time_stamp);
      //       }
      //     } dates.push({date: moment(rawData[i].time_stamp).format("MM-DD"),
      //       stamp: moment(rawData[i].time_stamp), count: 1})
      //   }
      // }
      // var FrequencyValues = [];
      // for (let i = 0; i < dates.length; i++) {
      //   console.log(dates[i]);
      //   FrequencyValues.push({x: dates[i].stamp, y: dates[i].count})
      // }
// dates[i].date


      $scope.options = {
            chart: {
                type: 'lineChart',
                height: 400,
                forceY: maxValue + Math.floor(maxValue*.15),
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 75
                },
                xScale: d3.time.scale(),
                yScale: d3.scale.linear(),
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (days)',
                    tickFormat: function (d) {
                      return moment(d).format("MMM D")
                    }
                },
                yAxis: {
                    axisLabel: 'Times Opened/Duration',
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){

            },
            title: {
                enable: true,
                text: 'Open Frequency/Duration',
                css: {
                  'font-family': 'Source Sans Pro',
                  'max-width': '50%',
                  'margin-left': 'auto',
                  'margin-right': 'auto',
                  'color': '#eee',
                  'font-size': '1.5em'
                }
            },
            subtitle: {
                enable: false,
                text: '',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: false,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px',
                    'color': '#eee'
                }
            }
        };

        $scope.data = [
                {
                    values: FrequencyValues,
                    key: 'Times Opened',
                    color: '#ff7f0e',
                    strokeWidth: 2,
                    classed: 'breech-dashed'
                },
                // {
                //     values: [{x: 3, y: 4},{x: 4, y: 7},{x: 5, y: 14},{x: 6, y: 54}],
                //     key: 'Duration Open',
                //     color: '#77a1ff',
                //     area: true
                // }
            ];
      })
    }
  }
  })

// UPDATE history SET time_stamp = '2016-09-07T20:41:45.000Z' WHERE id IN (13, 14, 15, 16);

// 2016-09-01T20:41:45.000Z
