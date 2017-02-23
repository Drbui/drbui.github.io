$(document).ready(function() {

    // custom formatting example
    $('.timer').data('countToOptions', {
        formatter: function(value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });
    // start all the timers
    $('.timer').each(count);

    $('.timer').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            $('.timer').each(count);
        }
    });

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }
    if (matchMedia) {
        var mqMobile = window.matchMedia("(max-width: 767px)");
        mqMobile.addListener(WidthChange);
        WidthChange(mqMobile);
    }

    function WidthChange(mqMobile) {
        if (mqMobile.matches) {
            $('.wow').css("visibility", "visible").addClass('wow-removed').removeClass('wow');
        } else {
            $('.wow-removed').addClass('wow').removeClass('wow-removed');
            new WOW().init({
                reset: true
            });
            $('.wow').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                if (!(isInView)) {
                    new WOW().init({
                        reset: true
                    });
                }
            });
        }
    }




});
