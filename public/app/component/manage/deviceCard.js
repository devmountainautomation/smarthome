angular.module('smarthome')
  .directive('deviceCard', function () {
    restrict: 'EA',
    templateUrl: '/app/component/manage/deviceCard.html',
    scope: {
      type: "=",
      nickname: "=",
      id: "="
    },
    link: function (scope, element, attrs) {
      switch(type) {
        case "Door/Window Sensor":
          scope.icon_url = '/assets/img/window-door_icon.png';
          break;
      }
      element.find('#')
    },
    controller: function ($scope) {

    }
  })
