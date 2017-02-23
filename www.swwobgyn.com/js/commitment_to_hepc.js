//=====================================================
// commitment_to_hepc.js
// Version 1.0
//=====================================================

//====================================================
// JQuery Document Ready Block START
//====================================================
$(document).ready(function() {

    //Disable caching of AJAX responses
    $.ajaxSetup ({
        cache: false
    });

    $(".plain-template .main-hero-section h1").animate({
                                        opacity: 1,
                                        top:"0px"
                                    }, { duration: 1000, queue: false, complete: function(){/*unblur();*/} });


    $('.patientsAndWorld').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
          // element is now visible in the viewport
          if (visiblePartY == 'top') {
            // top part of element is visible
              $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    top: 0
                                                                                }, { duration: 1800, queue: false });
              $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    opacity: 1.0
                                                                                }, { duration: 1800, queue: false });                                                                                                  
          } else if (visiblePartY == 'bottom') {
            // bottom part of element is visible
              $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    top: 0
                                                                                }, { duration: 1800, queue: false });
              $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    opacity: 1.0
                                                                                }, { duration: 1800, queue: false }); 
          } else {
            // whole part of element is visible
          }
        } else {
          // element has gone out of viewport
           $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    top: -177
                                                                                }, { duration: 1800, queue: false });
              $(".plain-template .divider.tealBackground.patientsAndWorld img").animate({
                                                                                    opacity: 0
                                                                                }, { duration: 1800, queue: false }); 
        }
      });


    $('.plain-template .divider.whiteBackground.merckProud img').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
          // element is now visible in the viewport
          if (visiblePartY == 'top') {
                startImage2Animation();                                                                                       
          } else if (visiblePartY == 'bottom') {
             //no-op
          } else {
            // whole part of element is visible
          }
        } else {
            //no-op
        }
      });
   


  

    $(".eliav-barr-section .quoteAndCaption").html( $(".quoteSection .quoteAndCaption").html());


  //================ MOUSE SCROLL EASING START================================
  /*
    if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;

    var time = 1000;
    var distance = 300;

    function wheel(event) {
        if (event.wheelDelta) delta = event.wheelDelta / 120;
        else if (event.detail) delta = -event.detail / 3;

        handle();
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }
    function handle() {

        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time);
    }
    */
  //================ MOUSE SCROLL EASING END================================



});




//====================================================
// JQuery Document Ready Block END
//====================================================





//===============================================================================
//===============================================================================
//                            Functions below
//===============================================================================
//===============================================================================
function unblur()
{
    $(".plain-template .main-hero-section h1").css('filter','blur(0px)');
    $(".plain-template .main-hero-section h1").css('-webkit-filter','blur(0px)');
    $(".plain-template .main-hero-section h1").css('-moz-filter','blur(0px)');
    $(".plain-template .main-hero-section h1").css('-o-filter','blur(0px)');
    $(".plain-template .main-hero-section h1").css('-ms-filter','blur(0px)');
    $(".plain-template .main-hero-section h1").css('-ms-filter','progid: DXImageTransform.Microsoft.Blur(PixelRadius="0")');

}