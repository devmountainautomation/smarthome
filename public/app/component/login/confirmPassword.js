angular.module('smarthome')
  .directive('compareTo', () => {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        otherValue: "=compareTo"
      },
      link: (scope, element, attrs, ngModel) => {
        ngModel.$validators.compareTo = modelValue => {
          return modelValue == scope.otherValue;
        };
        scope.$watch("otherValue", () => {
          ngModel.$validate();
        });
        element.on('blur', () => {
          if (element.hasClass('ng-invalid')) {
            $('.password-confirmation-alert').removeClass('hidden');
          }
        })
        element.on('keyup', () => {
          if (element.hasClass('ng-valid')) {
            $('.password-confirmation-alert').addClass('hidden');
          }
        })

      }
    }
  });
