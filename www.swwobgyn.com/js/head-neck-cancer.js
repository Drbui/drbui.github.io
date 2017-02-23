jQuery(function($) {
    $('img.youtube-video').click(function(){
        video = '<div class="embed-responsive embed-responsive-16by9"><iframe src="'+ $(this).attr('data-video') +'" height="350" width="750" frameborder="0" scrolling="no"></iframe></div>';
        $(this).replaceWith(video);
    });
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