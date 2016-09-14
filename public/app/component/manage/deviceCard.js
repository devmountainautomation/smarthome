angular.module('smarthome')
  .directive('deviceCard', (manageService, $compile) => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/manage/deviceCard.html',
      scope: {
        type: "@",
        nickname: "@",
        id: "@"
      },
      link: (scope, element, attrs) => {
        switch (scope.type) {
          case "Door/Window Sensor":
            {
              scope.icon_url = '/assets/img/window-door_icon.png';
              break;
            }
          case "Sound Sensor":
            {
              scope.icon_url = './assets/img/sound-placeholder.jpg';
              break;
            }
          case "Smoke Detector":
            {
              scope.icon_url = './assets/img/thermometer-icon.png';
              break;
            }
          case "Motion Sensor":
            {
              scope.icon_url = './assets/img/motion-placeholder.jpg';
              break;
            }
          default:
            {
              scope.icon_url = './assets/img/protect-icon-01.png';
            }
        }
        manageService.getSettings(scope.id).then(response => {
          let settings = response;
          element.find('i').on('click', () => {
            let id = scope.id;
            let startTime = settings.start_time;
            let endTime = settings.end_time;
            // let active = setting.active;
            // let email;
            // let sms = setting.sms;
            let content;
            /// Door + Window Sensor ///
            if (scope.type == "Door/Window Sensor") {
                content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                      <h2>Notification Window</h2>
                      <h3>Start Time</h3>
                    <input type="text" id="start${id}" value="${startTime}"></input>
                      <h3>End Time</h3>
                    <input type="text" id="end${id}" value="${endTime}"></input>
                    </div>
                    <div class="checkbox-section">
                      <h2>Notifications</h2>
                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" id="settings-email-radio" ng-model="settings.email"/>
                            <label for="settings-email-radio"></label>
                          </div>
                          <h4> Send me an email </h4>
                        </div>
                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" id="settings-text-radio" ng-model="settings.sms" />
                            <label for="settings-text-radio"></label>
                          </div>
                          <h4> Send me a text </h4>
                        </div>

                      </div>
                      <hr>
                      <div class="enable-section">
                          <div class="slide-checkbox">
    		                      <input type="checkbox" ng-model="settings.active" id="checkboxThreeInput"/>
	  	                        <label for="checkboxThreeInput"></label>
	                         </div>
                         <h4>Enable/Disable Device</h4>
                      </div>
                      <div>
                      <hr>
                      <button type="button" ng-click="saveSettings()"> Save Settings </button>
                      </div>`)(scope);
            } else if (scope.type == "Smoke Detector") {
              let startTime = setting.start_time;
              let endTime = setting.end_time;
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                      <h2>Notification Window</h2>
                      <h3>Start Time</h3>
                        <input type="text" id="start${id}" value="${startTime}"></input>
                      <h3>End Time</h3>
                        <input type="text" id="end${id}" value="${endTime}"></input>
                    </div>

                    <div class="checkbox-section">
                      <h2>Notifications</h2>
                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />
                            <label for="settings-email-radio"></label>
                          </div>
                          <h4> Send me an email </h4>
                        </div>

                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />
                            <label for="settings-text-radio"></label>
                          </div>
                          <h4> Send me a text </h4>
                        </div>

                      </div>
                      <hr>
                      <div class="enable-section">
                          <div class="slide-checkbox">
    		                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />
	  	                        <label for="checkboxThreeInput"></label>
	                         </div>
                         <h4>Enable/Disable Device</h4>
                      </div>
                      <button type="button" ng-click="saveSettings()"></button>
                    `)(scope);
            } else if (scope.type == "Sound Sensor") {
              let startTime = setting.start_time;
              let endTime = setting.end_time;
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                      <h2>Notification Window</h2>
                      <h3>Start Time</h3>
                        <input type="text" id="start${id}" value="${startTime}"></input>
                      <h3>End Time</h3>
                        <input type="text" id="end${id}" value="${endTime}"></input>
                    </div>

                    <div class="checkbox-section">
                      <h2>Notifications</h2>
                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />
                            <label for="settings-email-radio"></label>
                          </div>
                          <h4> Send me an email </h4>
                        </div>

                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />
                            <label for="settings-text-radio"></label>
                          </div>
                          <h4> Send me a text </h4>
                        </div>

                      </div>
                      <hr>
                      <div class="enable-section">
                          <div class="slide-checkbox">
    		                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />
	  	                        <label for="checkboxThreeInput"></label>
	                         </div>
                         <h4>Enable/Disable Device</h4>
                      </div>
                      <button type="button" ng-click="saveSettings()"></button>
                    `)(scope);
            } else if (scope.type == "Motion Sensor") {
              let startTime = setting.start_time;
              let endTime = setting.end_time;
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                      <h2>Notification Window</h2>
                      <h3>Start Time</h3>
                    <input type="text" id="start${id}" ng-value="settings.startTime" ng-model="settings.start_time"></input>
                      <h3>End Time</h3>
                    <input type="text" id="end${id}" ng-value="settings.endTime"></input>
                    </div>

                    <div class="checkbox-section">
                      <h2>Notifications</h2>
                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="true" ng-value="settings.email" id="settings-email-radio"/>
                            <label for="settings-email-radio"></label>
                          </div>
                          <h4> Send me an email </h4>
                        </div>

                        <div class="check-box">
                          <div class="squaredOne">
                            <input type="checkbox" value="true" ng-value="settings.text" id="settings-text-radio"/>
                            <label for="settings-text-radio"></label>
                          </div>
                          <h4> Send me a text </h4>
                        </div>

                      </div>
                      <hr>
                      <div class="enable-section">
                          <div class="slide-checkbox">
    		                      <input ng-value="settings.active" type="checkbox" value="1" id="checkboxThreeInput" checked />
	  	                        <label for="checkboxThreeInput"></label>
	                         </div>
                         <h4>Enable/Disable Device</h4>
                      </div>
                      <hr>
                      <button type="button" ng-click="saveSettings()"></button>
                    `)(scope);
            }
            $(element.find('section')).html(content);
            $('.devices').css("overflow", "hidden")
            $("#start" + scope.id).timeDropper();
            $("#end" + scope.id).timeDropper();
            $(element.find('section')).slideDown();
          })
        })
        $(element.find('section')).on('click', '#appended-close', () => {
          $(element.find('section')).slideUp('slow', () => {
            $('.devices').css("overflow", "auto")
            $('#appended').remove();
          })
        })
      },
      controller: ($scope, manageService) => {

        manageService.getSettings($scope.id).then(function(response) {
          $scope.settings = response;
        })
        $scope.saveSettings = function () {
          console.log('saved settings', $scope.settings);
          var crazy = $('#start' + $scope.id).val();
          console.log('start', crazy)
          $scope.settings.start_time = $('#start' + $scope.id).val();
          $scope.settings.end_time = $('#end' + $scope.id).val();
          manageService.saveSettings($scope.settings).then(
            function (response) {
              $('#appended').closest('section').slideUp('slow', () => {
                  $('.devices').css("overflow", "auto")
                  $('#appended').remove();
                })
            }
          )
        }
      }
    }
  }); //End directive
