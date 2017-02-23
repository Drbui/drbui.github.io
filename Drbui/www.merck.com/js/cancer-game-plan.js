jQuery(function($) {
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

    //Animate Hero
    $(".cancer-game-plan .main-hero-section").animate({
        "background-size": "130%"
    }, 5000, function() {
        // Animation complete.
    });

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

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

});