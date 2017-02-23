new WOW().init();

$('.wow').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
  if (!(isInView)) {
	 new WOW().init(
		{
			reset:  true
		});
  }
});
