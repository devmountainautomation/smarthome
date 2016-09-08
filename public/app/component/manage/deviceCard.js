angular.module('smarthome')
  .directive('deviceCard', (manageService) => {
    return {

      restrict: 'EA',
      templateUrl: '/app/component/manage/deviceCard.html',
      scope: {
        type: "@",
        nickname: "@",
        id: "@"
      },
      link: function(scope, element, attrs) {
        switch (scope.type) {
          case "Door/Window Sensor":
            scope.icon_url = '/assets/img/window-door_icon.png';
            break;
        }
        // manageService.getSettings(scope.id).then(function(response) {
        element.find('i').on('click', function() {
          if (scope.type == "Door/Window Sensor") {
            var id = scope.id;
            var startTime = "10:45 am";
            var endTime = "4:45 pm";
            element.find('section').append(`
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
                      </div>`);
          }
          // })
          $(element.find('section')).slideDown();
          $("#start" + id).timeDropper();
          $("#end" + id).timeDropper();
        })
        $(element.find('section')).on('click', '#appended-close', function () {
          $(element.find('section')).slideUp('slow', function () {
            $('#appended').remove();
          })
        })
      },
      controller: function($scope) {


      }
    }


  });
