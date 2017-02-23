(function($) {
    $(function() {
        $('#myCarousel').jcarousel({vertical: false});

        var theCarouselWidth = $('#2').width();
        var nmrElements = $('#myCarousel').children('li').length;

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
                $(this).removeClass('hidden');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
                $(this).addClass('hidden');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
                $(this).removeClass('hidden');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
                $(this).addClass('hidden');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();

            if (theCarouselWidth >= 768 && nmrElements <= 3) {
                $('.jcarousel-control-prev').addClass('hidden');
                $('.jcarousel-control-next').addClass('hidden');
            }
    });
})(jQuery);