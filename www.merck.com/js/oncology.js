$(document).ready(function() {

    TweenMax.from(".oncology .hero-section .header", 3, { opacity: 0, scale: 0.3, top:"100px", ease: Power1.easeOut, y: 0 });
                 
    $(".content-section.past-present-future button").click(function(e){
        window.location="../featured-stories/immuno_oncology_info.pdf";
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

    new WOW().init();

    $('.wow').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (!(isInView)) {
            new WOW().init({
                reset: true
            });
        }
    });

});
