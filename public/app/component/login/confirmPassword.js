angular.module('smarthome')
  .directive('compareTo', function () {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        otherValue: "=compareTo"
      },
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherValue;
        };
        scope.$watch("otherValue", function () {
          ngModel.$validate();
        });
        element.on('blur', function () {
          if (element.hasClass('ng-invalid')) {
            $('.password-confirmation-alert').removeClass('hidden');
          }
        })
        element.on('keyup', function () {
          if (element.hasClass('ng-valid')) {
            $('.password-confirmation-alert').addClass('hidden');
          }
        })

      }
    }
  });
