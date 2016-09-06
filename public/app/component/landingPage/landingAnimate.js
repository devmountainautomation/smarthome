angular.module('smarthome')
    .directive('landingDir', () => {
        return {
            restrict: 'EA',
            link: (scope, elem, attrs) => {
                $(document).ready(() => {
                    $(window).scroll(() => {
                        let winScroll = $(window).scrollTop() - 35;
                        if (winScroll < $('.landing-banner').offset().top - ($(window).height() / 2)) {
                            console.log(winScroll);
                            $('.skew-right').css("transform", "skewY(" + (winScroll / 2) + "deg)");
                            $('.skew-left').css("transform", "skewY(" + (-winScroll / 2) + "deg)");
                        }
                    });
                });
            }
        };
    });
