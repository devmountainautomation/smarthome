angular.module('smarthome')
    .directive('headDir', () => {
        return {
            restrict: 'EA',
            templateUrl: './app/component/header/header.html',
            link: (scope, elems, attrs) => {
                $(document).ready(() => {
                    $('.logged-in').hide();
                    $('.close').hide();
                    $('.hamburger').click(() => {
                        let elem = document.getElementById("menu");
                        let cssProp = window.getComputedStyle(elem, null).getPropertyValue("display");
                        if (cssProp === "none") {
                            $('.menu').toggle('slide', 'left', 500);
                            setTimeout(() => {
                                $('.close').fadeIn(200);
                            }, 500);
                        }
                        else {
                            $('.menu').toggle('slide', 'left', 500);
                            $('.close').fadeOut(500);
                        }
                    });

                    $('.close').click(() => {
                            $('.menu').toggle('slide', 'left', 500);
                            $('.close').fadeOut(500);
                    });
                });
            }
        };
    });
