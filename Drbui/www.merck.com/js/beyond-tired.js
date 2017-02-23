$(document).ready(function() {

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

	// modal triggers
	$('#videoOneModal').click(function() {
		//$('#videoChapterOne').html('<iframe id="chapterOnePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/4E-ERBlPQ2Q?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$('#videoChapterOne').html('<iframe id="chapterOnePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/q1RG-4hlpck?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$("#videoChapterOne").show();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#videoTwoModal').click(function() {
		$('#videoChapterTwo').html('<iframe id="chapterTwoPlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/sF4lTSaSkeg?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").show();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#videoThreeModal').click(function() {
		$('#videoChapterThree').html('<iframe id="chapterThreePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/38A6BU-UEGA?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").show();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#videoFourModal').click(function() {
		$('#videoChapterFour').html('<iframe id="chapterFourPlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/yYZKLxGCS30?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").show();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#videoFiveModal').click(function() {
		$('#videoChapterFive').html('<iframe id="chapterFivePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/qCPglqc6RRI?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").show();
		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
	});

	//modals
	$('#chapterOne').click(function() {

		// video player source
		$('#videoChapterOne').html('<iframe id="chapterOnePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/q1RG-4hlpck?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');

		//load video player
		$("#videoChapterOne").show();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#chapterTwo').click(function() {

		// video player source
		$('#videoChapterTwo').html('<iframe id="chapterTwoPlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/sF4lTSaSkeg?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');

		// load video player
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").show();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#chapterThree').click(function() {

		// video player source
		$('#videoChapterThree').html('<iframe id="chapterThreePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/38A6BU-UEGA?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');

		// load video player
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").show();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterFourPlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#chapterFour').click(function() {

		// video player source
		$('#videoChapterFour').html('<iframe id="chapterFourPlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/yYZKLxGCS30?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');

		// load video player
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").show();
		$("#videoChapterFive").hide();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFivePlayer').remove();
	});
	$('#chapterFive').click(function() {

		// video player source
		$('#videoChapterFive').html('<iframe id="chapterFivePlayer" class="embed-responsive-item" src="https://www.youtube.com/embed/qCPglqc6RRI?wmode=opaque&rel=0&autoplay=1&showinfo=0&modestbranding=1&autohide=1" frameborder="0" allowfullscreen></iframe>');

		// load video player
		$("#videoChapterOne").hide();
		$("#videoChapterTwo").hide();
		$("#videoChapterThree").hide();
		$("#videoChapterFour").hide();
		$("#videoChapterFive").show();

		//remove video player
		$('#chapterOnePlayer').remove();
		$('#chapterTwoPlayer').remove();
		$('#chapterThreePlayer').remove();
		$('#chapterFourPlayer').remove();
	});

	$("#videoOne").on('hidden.bs.modal', function (e) {
	            $("#videoOne iframe").each(function () {
	                $(this).attr("src", $(this).attr("src"));
	            });
	        });
	$('#videoOne').on('hidden.bs.modal', function () {
	    $('#videoOne iframe').removeAttr('src');
	})

	window.sr = new scrollReveal();
});