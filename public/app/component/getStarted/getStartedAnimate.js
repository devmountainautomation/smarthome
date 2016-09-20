angular.module('smarthome')
  .directive('slider', () => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/getStarted/slider.html',
      controller: 'getStartedCtrl',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {

          var scrolling = false;
          var contentSections = $('.cd-section'),
            bounceCount = 0,
            sectionArray = ['#section1', '#section2', '#section3', '#section4', '#section5', '#section6'],
            verticalNavigation = $('.cd-vertical-nav'),
            navigationItems = verticalNavigation.find('a'),
            navTrigger = $('.cd-nav-trigger'),
            removeArrow = false,
            scrollArrow = $('.slider-arrow-circle');

          $(window).on('scroll', checkScroll);

          var bounceFunc = function() {
            scrollArrow.effect("bounce", { times:3 }, 1000);
            bounceCount++
            setTimeout(function() {
              if (bounceCount < 3 && $(window).scrollTop() === 0) {
                bounceFunc();
              }
            }, 1000);
          };

          bounceFunc();
          //smooth scroll to the selected section
          verticalNavigation.on('click', 'a', function(event) {
            event.preventDefault();
            smoothScroll($(this.hash));
            verticalNavigation.removeClass('open');
          });

          //smooth scroll to the second section
          scrollArrow.on('click', function(event) {
            var bottomPagePercentage = (event.pageY / $(window).height()).toString().charAt(2);
            var sectionIndex = Math.floor((event.pageY / $(window).height()) - 1);
            if (bottomPagePercentage >= 8) sectionIndex++;
            event.preventDefault();
            smoothScroll($(sectionArray[sectionIndex]));
          });

          // open navigation if user clicks the .cd-nav-trigger - small devices only
          navTrigger.on('click', function(event) {
            event.preventDefault();
            verticalNavigation.toggleClass('open');
          });

          $(window).scroll(() => {
            if ($(window).scrollTop() > ($(window).height() * (sectionArray.length - 1))) {
              if (removeArrow === false) {
                removeArrow = true;
                scrollArrow.toggle();
              }
            }
            if ($(window).scrollTop() < ($(window).height() * (sectionArray.length - 1))) {
              if (removeArrow === true) {
                removeArrow = false;
                scrollArrow.toggle();
              }
            }
          });

          function checkScroll() {
            if (!scrolling) {
              scrolling = true;
              (!window.requestAnimationFrame) ? setTimeout(updateSections, 300): window.requestAnimationFrame(updateSections);
            }
          }

          function updateSections() {
            var halfWindowHeight = $(window).height() / 2,
              scrollTop = $(window).scrollTop();
            contentSections.each(function() {
              var section = $(this),
                sectionId = section.attr('id'),
                navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]');
              ((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop)) ?
              navigationItem.addClass('active'): navigationItem.removeClass('active');
            });
            scrolling = false;
          }

          function smoothScroll(target) {
            $('body,html').animate({
                'scrollTop': target.offset().top
              },
              300
            );
          }
        });
      }
    };
  });
