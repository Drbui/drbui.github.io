//=====================================================
// 125th_anniversary.js
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

    //to center text vertically, need to set the size of textual divs the same size as the
    //sliding omages
    $(".plain-template .blindnessText").css("height", $(".blindness-section").css("height"));
    $(".plain-template .mfmText").css("height", $(".mfm-section").css("height"));
    $(window).resize(function() {
         $(".plain-template .blindnessText").css("height", $(".blindness-section").css("height"));
         $(".plain-template .mfmText").css("height", $(".mfm-section").css("height"));       
    });

     //===============================================
     //scale background image size for zoom-out effect
     //===============================================
      $( ".plain-template .main-hero-section" ).animate({ "background-size": "100%"
            }, 5000, function() {
              // Animation complete.
            });

      //=====================
      //fade in "125 image"
      //=====================
      $('.plain-template .main-hero-section img').fadeIn(1500, function(){
          //then fade up text
           $('.plain-template .main-hero-section p').transition({ opacity: 1 },500,'ease');
           $('.plain-template .main-hero-section p').transition({ top: 0 },1500,'ease');
      });



    //===========================================================
    // Turn off animations on mobile
    //===========================================================
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //So we need to manually set the element to the position to which they would otherwise normally animate
        $('.plain-template .content-section .callout1').css("opacity","1");
        $('.plain-template .content-section .callout1').css("right","0px");
        $('.plain-template .content-section .pamphlet').css("left","0%");
        $('.plain-template .blindness-section').css("left","-4%");
        $('.plain-template .mfm-section').css("right","0%");
        $('.plain-template .mfm-section').css("background-position-x","18px");
        $('#kenFrazierImage').css("top","0px"); 
    }else{
          $('.callout1Text').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
            if (isInView) {
              // element is now visible in the viewport
              if (visiblePartY == 'top') {
                // top part of element is visible
                 $('.plain-template .content-section .callout1').transition({ opacity: 1 },100,'ease');
                 $('.plain-template .content-section .callout1').transition({ right: "0px" },2500,'ease');
              } else if (visiblePartY == 'bottom') {
                // bottom part of element is visible
                 $('.plain-template .content-section .callout1').transition({ opacity: 1 },100,'ease');
                 $('.plain-template .content-section .callout1').transition({ right: "0px" },2500,'ease');
              } else {
                // whole part of element is visible
              }
            } else {
              // element has gone out of viewport
              $('.plain-template .content-section .callout1').transition({ right: "-555px" },2500,'ease');
              $('.plain-template .content-section .callout1').transition({ opacity: 0 },100,'ease');        
            }
          });

          $('.plain-template .content-section .pamphlet').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
           
                if (isInView) {
                  // element is now visible in the viewport
                  if (visiblePartY == 'top') {            
                    // top part of element is visible
                     $('.plain-template .content-section .pamphlet').transition({ left: "0%" },2500,'ease');
                  } else if (visiblePartY == 'bottom') {
                    // bottom part of element is visible
                     $('.plain-template .content-section .pamphlet').transition({ left: "0%" },2500,'ease');
                  } else {
                    // whole part of element is visible
                  }
                } else {
                  // element has gone out of viewport           
                  $('.plain-template .content-section .pamphlet').transition({ left: "-47%" },2500,'ease');
                }
              });


            $('.plain-template .blindnessText').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {       
                if (isInView) {
                  // element is now visible in the viewport
                  if (visiblePartY == 'top') {            
                    // top part of element is visible
                     $('.plain-template .blindness-section').transition({ left: "0%" },2500,'ease');
                  } else if (visiblePartY == 'bottom') {
                    // bottom part of element is visible
                     $('.plain-template .blindness-section').transition({ left: "0%" },2500,'ease');
                  } else {
                    // whole part of element is visible
                  }
                } else {
                  // element has gone out of viewport           
                  $('.plain-template .blindness-section').transition({ left: "-47%" },2500,'ease');
           //       $('.plain-template .blindness-section').transition({ opacity: 0 },100,'ease');
                }
              });


              $('.plain-template .mfmText').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                if (isInView) {
                  // element is now visible in the viewport
                  if (visiblePartY == 'top') {            
                    // top part of element is visible
                     $('.plain-template .mfm-section').transition({ right: "0%"},2500,'ease');
                  } else if (visiblePartY == 'bottom') {
                    // bottom part of element is visible
                     $('.plain-template .mfm-section').transition({ right: "0%"},2500,'ease');
                  } else {
                    // whole part of element is visible
                  }
                } else {
                  // element has gone out of viewport           
                  $('.plain-template .mfm-section').transition({ right: "-50%"},2500,'ease');
                }
              });


              $('#kenFrazierImage').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
                if (isInView) {
                  // element is now visible in the viewport
                  if (visiblePartY == 'top') {            
                    // top part of element is visible
                     $('#kenFrazierImage').transition({ top: "0px" },3500,'ease');            
                  } else if (visiblePartY == 'bottom') {
                    // bottom part of element is visible
                     $('#kenFrazierImage').transition({ top: "0px" },3500,'ease');              
                  } else {
                    // whole part of element is visible
                  }
                } else {
                  // element has gone out of viewport    
                  $('#kenFrazierImage').transition({ top: "-55px" },3500,'ease');                   
                }
              });

      }


      //================ MOUSE SCROLL EASING START================================
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
function playVideo() 
{
  var video = document.getElementById("video1");      
     
  video.play();         
      
}
