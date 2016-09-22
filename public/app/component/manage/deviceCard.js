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
              scope.icon_url = './assets/img/sound_icon.png';
              break;
            }
          case "Smoke Detector":
            {
              scope.icon_url = './assets/img/smoke_icon.png';
              break;
            }
          case "Motion Sensor":
            {
              scope.icon_url = './assets/img/motion_icon.png';
              break;
            }
          default:
            {
              scope.icon_url = './assets/img/protect_icon.png';
            }
        }
        manageService.getSettings(scope.id).then(response => {
          let settings = response;
          element.find('span').on('click', () => {
            let id = scope.id;
            if (settings.start_time === 'Invalid date') {
              var startTime = 'ALWAYS ON';
              var endTime = 'ALWAYS ON';
            } else {
              var startTime = settings.start_time;
              var endTime = settings.end_time;
            }
            let content;
            if (scope.type == "Door/Window Sensor") {
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                      <h2>${scope.nickname}</h2>
                      <hr>
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
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                    <h2>${scope.nickname}</h2>
                    <hr>
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
            } else if (scope.type == "Sound Sensor") {
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                    <h2>${scope.nickname}</h2>
                    <hr>
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
            } else if (scope.type == "Motion Sensor") {
              content = $compile(`
                  <div id="appended">
                    <i id="appended-close" class="fa fa-close"></i>
                    <div>
                    <h2>${scope.nickname}</h2>
                    <hr>
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
            }
            $(element.find('section')).html(content);
            $('body').addClass('menu-open');
            if (scope.type === 'Smoke Detector') {

            } else {
              $("#start" + scope.id).timeDropper();
              $("#end" + scope.id).timeDropper();
            }
            $(element.find('section')).slideDown();
          });
        });
        $(element.find('section')).on('click', '#appended-close', () => {
          $(element.find('section')).slideUp('slow', () => {
            $('body').removeClass('menu-open');
            $('#appended').remove();
          });
        });
      },
      controller: ($scope, manageService, $timeout) => {
        manageService.getSettings($scope.id).then(function(response) {
          $scope.settings = response;
        });
        $scope.deleteSensor = (id) => {
          swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
          }).then(() => {
            manageService.deleteSensor(id).then(results => {
              if (results.status === 200) {
                swal(
                  'Deleted!',
                  'Your device has been deleted.',
                  'success'
                );
              } else {
                swal('Hmm, There Was An Issue.', 'Please Try That Again.', 'error');
              }
            });
          }, function(dismiss) {
            if (dismiss === 'cancel') {
              swal(
                'Cancelled',
                'Your Sensor Is Safe!',
                'error'
              );
            }
          });
        };
        $scope.saveSettings = function() {
          var crazy = $('#start' + $scope.id).val();
          $scope.settings.start_time = $('#start' + $scope.id).val();
          $scope.settings.end_time = $('#end' + $scope.id).val();
          manageService.saveSettings($scope.settings).then(
            function(response) {
              $('#appended').closest('section').slideUp('slow', () => {
                $('body').removeClass('menu-open');
                $('#appended').remove();
              });
            }
          );
        };
      }
    };
  }); //End directive
