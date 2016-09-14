angular.module('smarthome')
  .controller('addCtrl', ($scope, addService) => {
    $scope.settings = {};

    $('#breech-start').timeDropper({
      setCurrentTime: true
    });
    $('#breech-end').timeDropper({
      setCurrentTime: true
    });
    $('#smoke-start').timeDropper({
      setCurrentTime: true
    });
    $('#smoke-end').timeDropper({
      setCurrentTime: true
    });
    $('#sound-start').timeDropper({
      setCurrentTime: true
    });
    $('#sound-end').timeDropper({
      setCurrentTime: true
    });
    $('#motion-start').timeDropper({
      setCurrentTime: true
    });
    $('#motion-end').timeDropper({
      setCurrentTime: true
    });

    $("#door-window-settings").hide();
    $("#smoke-settings").hide();
    $("#sound-settings").hide();
    $("#motion-settings").hide();

    let gotoElement = eID => {
      addService.scrollTo(eID);
  };

    $scope.$watch('module_type', value => {
      switch (value) {
        case "breech":
          {
            $("#door-window-settings").slideDown();
            $("#smoke-settings").hide();
            $("#sound-settings").hide();
            $("#motion-settings").hide();
            break;
          }
        case "smoke_detector":
          {
            $("#smoke-settings").slideDown();
            $("#door-window-settings").hide();
            $("#sound-settings").hide();
            $("#motion-settings").hide();
            break;
          }
        case "sound":
          {
            $("#sound-settings").slideDown();
            $("#door-window-settings").hide();
            $("#smoke-settings").hide();
            $("#motion-settings").hide();
            break;
          }
        case "motion":
          {
            $("#motion-settings").slideDown();
            $("#door-window-settings").hide();
            $("#smoke-settings").hide();
            $("#sound-settings").hide();
            break;
          }
      }
    });

    $scope.addBreech = settings => {
      addService.addDevice(settings).then(response => {
        addService.addBreech(settings).then(response => {
          return response;
        })
      })
    };

  });
