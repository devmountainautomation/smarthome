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
            verticalNavigation = $('.cd-vertical-nav'),
            navigationItems = verticalNavigation.find('a'),
            navTrigger = $('.cd-nav-trigger'),
            scrollArrow = $('.cd-scroll-down');

          $(window).on('scroll', checkScroll);

          //smooth scroll to the selected section
          verticalNavigation.on('click', 'a', function(event) {
            event.preventDefault();
            smoothScroll($(this.hash));
            verticalNavigation.removeClass('open');
          });

          //smooth scroll to the second section
          scrollArrow.on('click', function(event) {
            event.preventDefault();
            smoothScroll($(this.hash));
          });

          // open navigation if user clicks the .cd-nav-trigger - small devices only
          navTrigger.on('click', function(event) {
            event.preventDefault();
            verticalNavigation.toggleClass('open');
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

          // var contentSections = $('.cd-section'),
          // navigationItems = $('.cd-vertical-nav a');
          //
          // updateNavigation();
          //
          // $(window).on('scroll', function(){
          // 	updateNavigation();
          // });
          //
          // //smooth scroll to the section
          // navigationItems.on('click', function(event){
          //       event.preventDefault();
          //       console.log("should scroll");
          //       smoothScroll($(this.hash));
          //   });
          //   //smooth scroll to second section
          //   $('.cd-scroll-down').on('click', function(event){
          //       event.preventDefault();
          //       smoothScroll($(this.hash));
          //   });
          //
          //   //open-close navigation on touch devices
          //   $('.touch .cd-nav-trigger').on('click', function(){
          //   	$('.touch #cd-vertical-nav').toggleClass('open');
          //
          //   });
          //   //close navigation on touch devices when selectin an elemnt from the list
          //   $('.touch #cd-vertical-nav a').on('click', function(){
          //   	$('.touch #cd-vertical-nav').removeClass('open');
          //   });
          //
          // function updateNavigation() {
          // 	contentSections.each(function(){
          // 		// $this = $(this);
          // 		var activeSection = $('#cd-vertical-nav a[href="#'+$(this).attr('id')+'"]').data('number') - 1;
          // 		if ( ( $(this).offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop() ) ) {
          // 			navigationItems.eq(activeSection).addClass('is-selected');
          // 		}else {
          // 			navigationItems.eq(activeSection).removeClass('is-selected');
          // 		}
          // 	});
          // }
          //
          // function smoothScroll(target) {
          //       $('body,html').animate(
          //       	{'scrollTop':target.offset().top},
          //       	600
          //       );
          // }
        });
      }
    };
  });
