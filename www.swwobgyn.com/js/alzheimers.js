$(document).ready(function() {

	// toll section click when width below 992px
	var mediaQueryTablet = window.matchMedia( "(max-width: 991px)" );
	$(" .toll .caretakers").click(function() {
		if (mediaQueryTablet.matches) {
			if ($( ".toll .container .caretakers .fadein" ).css("opacity") == "0") {
				$( ".toll .container .caretakers .fadein" ).css("opacity", "1");
			} else if ($( ".toll .container .caretakers .fadein" ).css("opacity") == "1") {
				$( ".toll .container .caretakers .fadein" ).css("opacity", "0");
			}
			if ($( ".toll .container .caretakers .circle" ).css("opacity") == "0") {
				$( ".toll .container .caretakers .circle" ).css("opacity", "1");
			} else if ($( ".toll .container .caretakers .circle" ).css("opacity") == "1") {
				$( ".toll .container .caretakers .circle" ).css("opacity", "0");
			}
		}
	});
	$(" .toll .healthcare").click(function() {
		if (mediaQueryTablet.matches) {
			if ($( ".toll .container .healthcare .fadein" ).css("opacity") == "0") {
				$( ".toll .container .healthcare .fadein" ).css("opacity", "1");
			} else if ($( ".toll .container .healthcare .fadein" ).css("opacity") == "1") {
				$( ".toll .container .healthcare .fadein" ).css("opacity", "0");
			}
		if ($( ".toll .container .healthcare .circle" ).css("opacity") == "0") {
				$( ".toll .container .healthcare .circle" ).css("opacity", "1");
			} else if ($( ".toll .container .healthcare .circle" ).css("opacity") == "1") {
				$( ".toll .container .healthcare .circle" ).css("opacity", "0");
			}
		}
	});

	// reset opacity when screen resized back to 992 or above
	if (matchMedia) {
		var mediaQueryDesktop = window.matchMedia("(min-width: 992px)");
		mediaQueryDesktop.addListener(WidthChange);
		WidthChange(mediaQueryDesktop, mediaQueryTablet);
	}
	function WidthChange(mediaQueryDesktop) {
		if (mediaQueryDesktop.matches) {
			$( ".toll .container .caretakers .fadein" ).css("opacity", "0");
			$( ".toll .container .healthcare .fadein" ).css("opacity", "0");
			$( ".toll .container .caretakers .circle" ).css("opacity", "1");
			$( ".toll .container .healthcare .circle" ).css("opacity", "1");
			$( ".jumbo-inner .text-container" ).addClass( "wow fadeIn" );
			$( ".jumbo-inner .text-container" ).css("animation-duration", "1s");
			$( ".jumbo-inner .text-container" ).css("animation-name", "fadeIn");
			new WOW().init(
			{
				reset:  true
			});
		} else {
			$( ".jumbo-inner .text-container" ).removeClass( "wow fadeIn animated" );
			$( ".jumbo-inner .text-container" ).css("visibility", "visible");			
		}
	}


	jQuery(function ($) {
		// custom formatting example
		$('.timer').data('countToOptions', {
			formatter: function (value, options) {
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

		new WOW().init(
			{
				reset:  true
			});

		$('.wow').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
		  if (!(isInView)) {
			 new WOW().init(
				{
					reset:  true
				});
		  }
		});

	});
	window.sr = new scrollReveal();
});