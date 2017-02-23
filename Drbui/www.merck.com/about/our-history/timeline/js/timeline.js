//=====================================================
// timeline.js
// Version 1.9
//
// Version 1.9 Changes:
// + Changed nth-child pseudo selector to nth-type-of for Safari support. - Tom (March 2015)
// Version 1.8 Changes:
// + Added "firstCategory" class to first rendered category so we can target it for proper
//   indentatiuon in IE8 where we cannot rely on nth-child pseudo selector.
// Version 1.7 Changes:
// - Remove tooltip pop-ups.
// + Allow event names to be cickable and allow full description viewing by an event name click.
// + Add persistent highlighting for selected event name.
// + Added persistent "dot" highlighting where the "dot" in the timeline stays highlighted for the timperiod that contains the selected event.
// + Added long/short alternating "event lines"
// Version 1.6 Changes:
// + Added back the left/right tooltip orientation feature that was removed in the last version.
// Version 1.5 Changes:
// + Altered tooltip display. Use one tooltip DIV in index.html, outside of all other divs, to avoid clipping.
// Version 1.4 Changes:
// + Fixed bug where previous "active category" retained coloring in 'ghost' mode
// + Changed popup box functionality: removed "tab" image on eventname and replaced it with a simple highlight. Also altered popup background image.
// + Fixed timeline click bug where repeated clicking on timeline arrows would result in unpredicted timeline locking/movements.
// Version 1.3 changes:
// + fixed spelling error of bakgroundImageUrl in scripy and XML.
// Version 1.2 changes:
// - Removed ability to "toggle" on/off the Categories ( once selected, further clicks will NOT un-select the selected Category ).
// + Moved backgoundImageUrl and backgroundColor from being <fullDescription/> attributes to being <category/> attributes.
// + Added defaultBackgroundColor and defaultBackgroundImageUrl as attributes to <categories/> element.
// + Added 'ghosting' (transparency) to non-selected categories.
// + Updated tooltip structure ( used a per-div hidden tooltip instead of a single div, and then try to position it)
//   Also allowed for left-facing tooltip if the tooltip os too clode to the right side of the timeline.
//   This was done to prevent clipped(hidden) toolip body.
// Version 1.1 changeds
// + Added fade in/out of full description div if the user clicks on a the
//   "Click Here for Full Story" link WHILE the descripotion div is already being dispalyed.
//=====================================================


//====================================================
//Page variables START
//====================================================
var XML_CONFIG_FILE = 'assets/xml/timeline.xml'; /* Main XML config file URL */

var CYCLE_COLOR_SPEED                =  300; /* In Milliseconds ( 1000 = 1 sec ) */
var TIMELINE_SCROLL_SPEED            =   10; /* In Milliseconds ( 1000 = 1 sec)  */
var MOVE_TIMELINE_COVER_DOWN_SPEED   = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_TIMELINE_COVER_UP_SPEED     = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_CATEGORIES_DOWN_SPEED       = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_CATEGORIES_UP_SPEED         = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_FULL_DESCRIPTION_DOWN_SPEED = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_FULL_DESCRIPTION_UP_SPEED   = 1500; /* In Milliseconds ( 1000 = 1 sec ) */
var MOVE_FULL_DESCRIPTION_FADEINOUT_SPEED = 1000; /* In Milliseconds ( 1000 = 1 sec ) */

/* For a list of EASINGS you can use (below): refer to http://api.jqueryui.com/easings/ */
var ANIMATION_PRESET_TIMELINE_COVER_DOWN   = "easeOutSine";
var ANIMATION_PRESET_TIMELINE_COVER_UP     = "easeOutSine";
var ANIMATION_PRESET_FULL_DESCRIPTION_DOWN = "easeOutSine";
var ANIMATION_PRESET_FULL_DESCRIPTION_UP   = "easeOutSine";
var ANIMATION_PRESET_CATEGORIES_DOWN       = "easeOutSine";
var ANIMATION_PRESET_CATEGORIES_UP         = "easeOutSine";

var categories      = [];
var timeline        = [];
var allEvents       = []
var XMLLoaded       = false;
var mouseX;
var mouseY;
var leftScrollTimeout;
var rightScrollTimeout;
var leftScrollPosition = 0;
var totalTimePeriodDivWidth;
var MAX_SCROLL_OFFSET; /* calculated val */
var MIN_SCROLL_OFFSET = 0;
var lastEventHovered = undefined;
var toolTipImageHeight;
var toolTipTextHeight;
var toolTipTotalHeight;
var currentTimelineEvent = undefined;
var activeCategory       = undefined;
var ENABLE_TOUCH         = true;
var fullDescriptionIsBeingDisplayed = false;
var allowCategoryToggle      = false;
var defaultBackgroundColor    = "";
var defaultBackgroundImageUrl = "";
var NUM_EVENTS_TO_SKIP        = 5;
var EVENT_WIDTH               = 133; 
var SKIP_WIDTH                = ( NUM_EVENTS_TO_SKIP * EVENT_WIDTH );

//An "Object" representing a single category item (and all its time-line entries)
//( i.e. a single <category> section ( from XML ))
function Category()
{
    this.id           = "";
    this.name         = "";
    this.spriteSheet  = "";
    this.backgroundColor    = "";
    this.backgoundImageUrl  = "";
}

//An "Object" representing a single TimePeriod (year) (and all its Events)
//( i.e. a single <timPeriod> section ( from XML ))
function TimePeriod()
{
    this.id     = "";
    this.year   = "";
    this.events = [];
    this.eventCategories = [];
}

//An "Object" representing a single Event
//( i.e. a single <event> section ( from XML ))
function Event(){
    this.id           = "";
    this.categories   = [];
    this.name         = "";
    this.shortDescription         = "";
    this.shortDescriptionImageUrl = "";
    this.longDescription          = "";
    this.longDescriptionImageUrl  = "";
    this.imageOffsetX             = 0;
    this.imageOffsetY             = 0;
    this.textColor                = ""; 
}
//====================================================
//Page variables END
//====================================================




//====================================================
// JQuery Document Ready Block START
//====================================================
$(document).ready(function() {

    //Disable caching of AJAX responses
    $.ajaxSetup ({
        cache: false
    });


    //For IE: IE 8 and below do not have the Array.prototype.indexOf method. 
    //Note: this block MUST appear somewhere before the call to readXML()
    if(!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(needle) {
            for(var i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    return i;
                }
            }
            return -1;
        };
    }

    clearTooltip();

    //read XML
    readXML();

    //render categories
    renderCategories();

    //render time-line
    renderInitialTimeline();

    //hook up category clicks
    $(".category").click(function()
    {
        //clear then tooltip in case it is visible
        clearTooltip();

        //get and set the "active" categoyt
        selectedCategoryId = parseInt($(this).attr('id'));


        //here, we handle the category "toggle" functionality.
        //If the category that was clicked is equal to the current active category, then 
        //we are toggling the category "off". Therefore, we reset the background to the non-hover versiob,
        //and reset the active category back to 'undefined'.
        if( selectedCategoryId == activeCategory){
            
            //If we are allowing category toggling, go ahead and toggle
            //then fall through ( after the outer else statement ) and rerender timeline
            if( allowCategoryToggle == true){
                //$("#"+selectedCategoryId).css('background-position','0 0');
                $("#"+selectedCategoryId).removeClass('activeCategory');

                activeCategory = undefined;

            }else{
                //otherwise, just return ( do not execute rerender code after else statement)
                return;
            }

        }else{
            //otherwise, we have selected a new category (toggling it on), in which case we set the old category's background
            //to the non-hover version, set the clicked category backgrounf to the hover version and lastly
            //set the active categoey to the one just clicked
            //set clicked category to hover color

            //remove coloring from old active category
            $("#"+activeCategory).removeClass('activeCategory');

            //Ghost all other categories
            $(".category").addClass('ghost');

            //Remove ghosting and add coloring to new active category
            $("#"+selectedCategoryId).removeClass('ghost');
            $("#"+selectedCategoryId).addClass('activeCategory');

            activeCategory = selectedCategoryId;

        }

        //finally, re-render the timeline
        rerenderTimeline();

        //ensure timeline cover is down
        moveTimelineCover("down");
    });

    //hook up view complete timeline button 
    $("#viewCompleteHistoryBtn").click(function(){
        moveTimelineCover("down");
    });

    //hook up close button click
    $("#btnClose").click(function(){
        //Removing ghosting from all categories
        $(".category").removeClass('ghost');

        moveTimelineCover("up");

        moveCategories("up");
    });



    //hook up Event Name clicks
    $(".eventName").click(function(){

        //Update tootip text
        currentTimelineEvent = getEventForId(this.id);

        //Remove highlighted name from all events
        $(".eventName").removeClass("selectedEvent");
        $(".eventYear").removeClass("selectedEvent");
        //$(".yearLineDot").attr('src','assets/images/dot.png');

        //Add the "viewed" status to the event
        $(this).addClass("eventViewed");

        //Now add in a highlight for this event
        $(this).addClass("selectedEvent");
        $(this).siblings(".eventYear").addClass("selectedEvent");
        //$(this).siblings(".yearLine").find(".yearLineDot").attr('src','assets/images/dot_hover.png');
        $(this).siblings(".yearLine").find(".yearLineDot").attr('src','assets/images/dot_viewed.png');
        $(this).siblings(".yearLine").find(".yearLineDot").addClass("yearLineDotViewed");

        if(fullDescriptionIsBeingDisplayed){
            $("#fullDescriptionDiv").fadeOut(MOVE_FULL_DESCRIPTION_FADEINOUT_SPEED, function(){
                setFullDescriptionData();
                $("#fullDescriptionDiv").fadeIn(MOVE_FULL_DESCRIPTION_FADEINOUT_SPEED);
            });
        }else{
            setFullDescriptionData();
            moveCategories("down");
        }

    });

 

    //hook up back to timeline button
    $("#backToTimelineBtn").click(function(){
        //clear then tooltip in case it is visible
        clearTooltip();

        moveCategories("up");
    });

    //set up mouse tracking for tooltip placement
    $(document).mousemove( function(e) {
       mouseX = e.pageX; 
       mouseY = e.pageY;
    }); 

    //set up time-periods hover
    $(".timePeriod").hover(
        function(){
            if( ! $(this).find("img").hasClass("yearLineDotViewed") ){
                $(this).find(".yearLineDot").attr('src','assets/images/dot_hover.png');
            }
        },
        function(){
            //On Hover Exit
           
            //Decide if we want to remove the highlihted "dot" in the timeline when we leave the hover.
            //We want to leave the dot in a highlighted state if the current selected event is in this time period.
            //Otherwise, we remove the highlighted dot, replacing it with the non-highlighted version.
            var $tp = $(this);
            var tpContainsSelectedEvent = timePeriodContainsSelectedEvent($tp);
           
            if(  ( tpContainsSelectedEvent == false )  &&  (! $(this).find("img").hasClass("yearLineDotViewed"))){
               $(this).find(".yearLineDot").attr('src','assets/images/dot.png');
            }
        }

    );


    //hook up left scroll arrow HOVER
    $('#leftScrollArrow').on('mouseenter', function() {

            //clear tool tip in case it's visible
            clearTooltip();

            leftScrollTimeout = setTimeout(function() {
                scrollTimeline("left"); 
            }, TIMELINE_SCROLL_SPEED);
        }).on('mouseleave', function(){
            clearTimeout(leftScrollTimeout);
    });

    //hook up right scroll arrow HOVER
    $('#rightScrollArrow').on('mouseenter', function() {

            //clear tool tip in case it's visible
            clearTooltip();

            rightScrollTimeout = setTimeout(function() {
                scrollTimeline("right"); 
            }, TIMELINE_SCROLL_SPEED);
        }).on('mouseleave', function(){
            clearTimeout(rightScrollTimeout);
    });

    
    //for touch devices, hook-up left scroll arrow CLICK-and-HOLD
    $('#leftScrollArrow').click(function() {
            
            skip("left");

            //clear tool tip in case it's visible
            clearTooltip();

            //stop the timeline if its moving
            stopTimelineScrolling();

            leftScrollTimeout = setTimeout(function() {
                scrollTimeline("left"); 
            }, TIMELINE_SCROLL_SPEED);
        });

    //for touch devices, hook-up right scroll arrow CLICK-and-HOLD
    $('#rightScrollArrow').click(function() {
                
            skip("right");

            //clear tool tip in case it's visible
            clearTooltip();

            //stop the timeline if its moving
            /*
            stopTimelineScrolling();

            rightScrollTimeout = setTimeout(function() {
                scrollTimeline("right"); 
            }, TIMELINE_SCROLL_SPEED); */
        });



    /*======================================================================*/
    /*                    TOUCH EVENTS SECTION - START                      */
    /*======================================================================*/
    if( ENABLE_TOUCH == true){
        
        var TOUCH_POS;

        $(".eventName").click(function(){
            
        });

        $("#timePeriodsContainer").bind("touchstart",function(e){
            //e.preventDefault();

            stopTimelineScrolling();

            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            TOUCH_POS = touch.pageX;
        });


        $("#timePeriodsContainer").bind("touchend",function(e){
            //e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            TOUCH_POS = touch.pageX;
        });

        $("#timePeriodsContainer").bind("touchmove",function(e){
            e.preventDefault();

            clearTooltip();

            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var elm = $(this).offset();
              var x = touch.pageX - elm.left;
              var y = touch.pageY - elm.top;
              if(x < $(this).width() && x > 0){
                  if(y < $(this).height() && y > 0){   
                          if( (touch.pageX  > TOUCH_POS)  &&  (leftScrollPosition < MIN_SCROLL_OFFSET) ){
                            $("#timePeriods").animate({left: leftScrollPosition+=5 }, TIMELINE_SCROLL_SPEED, "linear");
                          }else if( (touch.pageX < TOUCH_POS)  && (leftScrollPosition > MAX_SCROLL_OFFSET)){
                            $("#timePeriods").animate({left: leftScrollPosition-=5 }, TIMELINE_SCROLL_SPEED, "linear");
                          }
                  }
              }
            
        });
    }
    /*======================================================================*/
    /*                    TOUCH EVENTS SECTION - END                        */
    /*======================================================================*/


    //In order to calculate div widths on dynamically created ivs, we need to ensure all
    //images/etc. are done loading befor we try to calculate.
    //This code below ensures we calculate the measurements after assets are loaded.
    $(window).load(function () {       
        calculateMaxScrollOffset();

        toolTipImageHeight = parseInt($(".tooltipImage").css('height'));
        toolTipTextHeight  = parseInt($(".tooltipText").css('height'));
        toolTipTotalHeight = toolTipImageHeight + toolTipTextHeight;

        clearTooltip();

        cycleColors();
    });

   

});
//====================================================
// JQuery Document Ready Block END
//====================================================


//===============================================================================
//===============================================================================
//                            Functions below
//===============================================================================
//===============================================================================
function timePeriodContainsSelectedEvent(timeperiod)
{
    var containesEvent = false;

    if( currentTimelineEvent == null || timePeriodContainsSelectedEvent === undefined){
        return containesEvent;
    }

     $(timeperiod).find(".eventName").each(function(){
        if( currentTimelineEvent.id === this.id){
            containesEvent = true;
        }
     });

     return containesEvent;
}//end timePeriodContainsSelectedEvent


function skip(direction)
{
    var pos;

    var numVisible = $('.timePeriod').not(':hidden').length;
    if( numVisible <= 8){
        return;
    }


    if( direction == 'left'){
        
        if( leftScrollPosition <  ( MIN_SCROLL_OFFSET - SKIP_WIDTH ) ){
            
            pos = ( leftScrollPosition + SKIP_WIDTH );  
           
            leftScrollPosition = pos;
        }else{
            leftScrollPosition = MIN_SCROLL_OFFSET;
            $("#timePeriods").css('left',leftScrollPosition);
        }
    }else{
        
        if( leftScrollPosition > ( MAX_SCROLL_OFFSET + SKIP_WIDTH ) ){

            pos = ( leftScrollPosition - SKIP_WIDTH );
           
            leftScrollPosition = pos;
        }else{
            leftScrollPosition = MAX_SCROLL_OFFSET;
            $("#timePeriods").css('left',leftScrollPosition);
        }
    }


}


function getActiveCategory()
{
    if( activeCategory != undefined){
        for( var i=0 ; i < categories.length; i++){
            if( categories[i].id == activeCategory){
                return categories[i];
            }
        }
    }
    return null;
}

function setFullDescriptionData()
{
    var bgColor;
    var bgUrl;

    //Get the active category
    var ac = getActiveCategory();

    //Set defaulr backgrounf color/url ( used when no category is selected )
    if( ac != null ){
        bgColor = ac.backgroundColor;
        bgUrl   = ac.backgoundImageUrl;
    }else{
        bgColor = defaultBackgroundColor;
        bgUrl   = defaultBackgroundImageUrl;
    }

 
    //set the long description color
    $("#fullDescriptionText").css('color',currentTimelineEvent.textColor);

    //set the long description background image
    $("#fullDescriptionDiv").css('background-image','url('+bgUrl+')');
    //set the long description background golor
    $("#fullDescriptionDiv").css('background-color',bgColor);

    //set the long description main image and offsets
    $("#fullDescriptionImage img").attr('src',currentTimelineEvent.longDescriptionImageUrl);
    $("#fullDescriptionImage img").css('top',currentTimelineEvent.imageOffsetX+"px");
    $("#fullDescriptionImage img").css('left',currentTimelineEvent.imageOffsetY+"px");

   

    //set the long description
    $("#fullDescriptionText").html(currentTimelineEvent.longDescription);
}


function stopTimelineScrolling()
{
    clearTimeout(leftScrollTimeout);
    leftScrollTimeout = null;
    clearTimeout(rightScrollTimeout);
    rightScrollTimeout = null;
}//end stopTimelineScrolling


function clearTooltip()
{
    //clear then tooltip in case it is visible
    //$("#tooltip").hide();
    $("#tooltip").hide();
    $(".eventName").removeClass("tooltipTab");
}//end clearTooltip


function getEventForId(Id)
{
    var evt = null;

    $(allEvents).each(function(){
        evt = this;
        if( evt.id === Id){
            return false; //jQuery version of break. Must return false to break out of loop;
        }
    });

    return evt;
}//end getEventForId


function calculateMaxScrollOffset()
{
        //get num of "visible" time periods
        var numVisibleTimePeriods = $('.timePeriod:visible').length;
        var numTimePeriods  = $('.timePeriod').length;
        var timePeriodWidth = $("#timeperiod_1").outerWidth(true);

        //totalTimePeriodDivWidth = numTimePeriods * timePeriodWidth;
        totalTimePeriodDivWidth = numVisibleTimePeriods * timePeriodWidth;

        $("#timePeriods").css('width',totalTimePeriodDivWidth);

        MAX_SCROLL_OFFSET =  $("#timePeriodsContainer").width() - totalTimePeriodDivWidth;
       
}//end calculateMaxScrollOffset


function scrollTimeline( direction )
{
    
    var pos;

    if( direction == 'left'){
        if( leftScrollPosition < MIN_SCROLL_OFFSET ){
            
            pos = leftScrollPosition++ + "px";

            $("#timePeriods").animate({left: leftScrollPosition }, TIMELINE_SCROLL_SPEED, "linear");


            leftScrollTimeout = setTimeout(function() {
                scrollTimeline( "left"); 
            }, TIMELINE_SCROLL_SPEED);
        }
    }else{
        

        if( leftScrollPosition > MAX_SCROLL_OFFSET ){

            pos = leftScrollPosition-- + "px";

            $("#timePeriods").animate({left:leftScrollPosition}, TIMELINE_SCROLL_SPEED, "linear");

            rightScrollTimeout = setTimeout(function() {
                scrollTimeline( "right"); 
            }, TIMELINE_SCROLL_SPEED);
        }else{
            
            clearTimeout(rightScrollTimeout);
        }
    }
}//end scrollTimeline



function moveFullDescriptionDiv( direction )
{
     if( direction == "down" ){
        $("#fullDescriptionDiv").animate({top:"468px"},MOVE_FULL_DESCRIPTION_DOWN_SPEED, ANIMATION_PRESET_FULL_DESCRIPTION_DOWN);
        fullDescriptionIsBeingDisplayed = false;
    }else{
        $("#fullDescriptionDiv").animate({top:"38px"},MOVE_FULL_DESCRIPTION_UP_SPEED, ANIMATION_PRESET_FULL_DESCRIPTION_UP);
        fullDescriptionIsBeingDisplayed = true;
    }
}//end moveFullDescriptionDiv





function moveCategories( direction )
{


    if( direction == "down" ){
        $("#categories").animate({top:"415px"},MOVE_CATEGORIES_DOWN_SPEED, ANIMATION_PRESET_CATEGORIES_DOWN, function(){ moveFullDescriptionDiv("up"); });
    }else{
       $("#fullDescriptionDiv").animate({top:"468px"},MOVE_FULL_DESCRIPTION_DOWN_SPEED, ANIMATION_PRESET_FULL_DESCRIPTION_DOWN, function(){ 
                            $("#categories").animate({top:"0px"},MOVE_CATEGORIES_UP_SPEED, ANIMATION_PRESET_CATEGORIES_UP);
                            fullDescriptionIsBeingDisplayed = false;
                        });
    }
    
}//end moveCategories



function moveTimelineCover( direction )
{
    //clear tool tip in case it's visible
    clearTooltip();

    if( direction == "down"){
        //first, ensure we remove the highligh on all the event names
        $(".eventName").removeClass("tooltipTab");
        $(".eventName").removeClass("selectedEvent");
        $(".eventYear").removeClass("selectedEvent");
        //$(".yearLineDot").attr('src','assets/images/dot.png');

        //reset timeline to 0 position
        resetTimelineToBeginning();

        $("#timelineCover").animate({top:"176px"},MOVE_TIMELINE_COVER_DOWN_SPEED, ANIMATION_PRESET_TIMELINE_COVER_DOWN); 
    }else{
        $("#timelineCover").animate({top:"0px"},MOVE_TIMELINE_COVER_UP_SPEED, ANIMATION_PRESET_TIMELINE_COVER_UP, function(){
                //anmation complete callback

                //de-select any selected category
                $("#"+activeCategory).removeClass('activeCategory');
                activeCategory = undefined;

                //reset timeline to 0 position
                resetTimelineToBeginning();

                //rerender the timeline
                rerenderTimeline();
        });       
    }
}//end moveTimelineCover



//Returns the passed string stripped of leading/trailing whitespace
//Created because IE doesn't support the string.trim() method.
//Instead, we can call jQuery's $.trim(str).
//We wrapped it in a function here so it can be easily swapped out in case of future incompatibilities.
function trimString(str){
    return $.trim(str);
}//end trimString



function renderCategories()
{
    var idx = 1;

    $(categories).each(function(){
        if( idx==1){
             $("#categories").append("<div id='"+this.id+"' class='firstcategory category shadow'><div class='categoryName'>" + this.name + "</div></div>");
        }else{
            $("#categories").append("<div id='"+this.id+"' class='category shadow'><div class='categoryName'>" + this.name + "</div></div>");
        }

        //$(".category:nth-child("+idx+")").css('background-image', "url('"+this.spriteSheet+"')");
		$(".category:nth-of-type("+idx+")").css('background-image', "url('"+this.spriteSheet+"')");
        
        idx++;
    });

   
}//end renderCategories



function renderInitialTimeline()
{
    var numTimePeriods = 0;
    var timePeriodDiv;
    var timePeriodsContainerDiv;
    var timePeriodsDiv;
    var eventArr;
    var counter = 0;

    var swipeBoxDiv;
    swipeBoxDiv = $("<div id='swipeBox' ontouchstart='touchStart(event,'swipeBox');' ontouchend='touchEnd(event);' ontouchmove='touchMove(event);' ontouchcancel='touchCancel(event);'></div>");
    //clear previous data
    $("#timeline").empty();

    $("#timeline").append("<div id='leftScrollArea'><img id='leftScrollArrow' src='assets/images/leftArrow.png'/></div>");

    timePeriodsContainerDiv = $("<div id='timePeriodsContainer'></div>");

    timePeriodsDiv = $("<div id='timePeriods'></div>");

    //Render time periods (years)
    $(timeline).each(function(){
        counter++;

        //first, check if this time period contains any events that are associated
        //with the current category...
        if(activeCategory != undefined && this.eventCategories.indexOf(activeCategory) == -1){
            //...if not, skip it and go to next time period
            return; //for a jQuery loop, this is equvalent to a "continue" statement 
        }

        //create a specific time period (year)
        timePeriodDiv = $('<div id="'+this.id+'">').addClass('timePeriod');

        //create horizontal year line
        timePeriodDiv.append("<div class='yearLine'><img class='yearLineDot' src='assets/images/dot.png'/></div>");

        //create the year header
        timePeriodDiv.append("<div class='eventYear'>"+this.year+"</div>");

        //create the "line" coming down from the year
        //Determine if we are using a short or long "event line"
        //(we alternate between the two)
        if( counter % 2 == 0){
            timePeriodDiv.append("<div class='eventLine'></div>");
        }else{
            timePeriodDiv.append("<div class='eventLine eventLine2'></div>");
        }

        //create the events for this time period
        eventArr = this.events;
        $(eventArr).each(function(){

            //only display events associated with the current category
            //or display them if currentCategory = 'undefined'
            if( activeCategory == undefined || this.categories.indexOf(activeCategory) > -1 ){
                
                //NEW TOOLTIP FUNCTIONALITY
                //timePeriodDiv.append("<div id='"+this.id+"' class='eventName'>"+this.name+"</div>");
                timePeriodDiv.append("<div id='"+this.id+"' class='eventName'>"+this.name+"</div>");

            }
        });
        

        timePeriodsDiv.append(timePeriodDiv);
        numTimePeriods++;
    });

    timePeriodsContainerDiv.append(timePeriodsDiv);

    //swipeBoxDiv.append(timePeriodsContainerDiv);
    $("#timeline").append(timePeriodsContainerDiv);

    //append right scroll area
    $("#timeline").append("<div id='rightScrollArea'><img id='rightScrollArrow' src='assets/images/rightArrow.png'/></div>");

    //add close btn
    $("#timeline").append("<div id='btnClose'></div>");

}//end renderInitialTimeline



function rerenderTimeline()
{
    var numTimePeriods = 0;
    var timePeriodDiv;
    var eventArr;
    var counter = 1;

    $("#timePeriods").fadeOut("slow","linear", function(){

        //Note: The following code is tucked into the callback function
        //      of the above "fadeOut" call, so we don't show the additions/subtractions
        //      being performed to the timeline. We waint until the fadeOut effect has completed animation
        //      before we do the timeline edits.
  
        //hide all data
        $(".timePeriod").hide();
        $(".eventName").hide();

        //reset timeline to default length by removing lonver version
        $('.eventLine').removeClass("eventLine2");

        //Determine which time periods to "show()"
        $(timeline).each(function(){
           
           

            //first, check if this time period contains any events that are associated
            //with the current category...
            if(activeCategory == undefined || this.eventCategories.indexOf(activeCategory) > -1){
                
                //determine if we are using a short or long "event line"
                //(we alternate between the two)
                counter++;
                if( counter % 2 != 0){
                     $('#'+this.id).find(".eventLine").addClass("eventLine2");
                }

                //if so, show it
                $('#'+this.id).show();  

            }else{
                //otherwise, iterate to next time period
                return; //same as "continue" statement
            }

            //Now, determine which elements to "show()"
            eventArr = this.events;
            $(eventArr).each(function(){
                //only display events associated with the current category
                //or display them if currentCategory = 'undefined'
                if( activeCategory == undefined || this.categories.indexOf(activeCategory) > -1 ){      
                    $("#"+this.id).show();      
                }else{
                    $("#"+this.id).hide();
                }
            });
            

        }); //end of timeline.each function


        //reset timeline to 0 position
        resetTimelineToBeginning();

    }); //end of fadeOut callback function


    //finally, fade the timeline back in
    $("#timePeriods").fadeIn("slow", "linear", function(){
         //re-calculat scroll offset
        calculateMaxScrollOffset();
    });

}//end rerenderTimeline



function resetTimelineToBeginning()
{
    //reset timeline to 0 position
    $("#timePeriods").css('left',MIN_SCROLL_OFFSET);
    leftScrollPosition = 0;  
}//end resetTimelineToBeginning



//reads the XML file, storing all slide/music data into the slide objects
function readXML()
{
    //If XMl is already loaded, just return
    if(XMLLoaded){
        return;
    }

    //otherwise, load the XML
    $.ajax({
        type: "GET",
        url: XML_CONFIG_FILE,
        dataType: "xml",
        async: false,
        success: function(xml) {
            var currCategory   = "";
            var currTimePeriod = "";
            var currEvent      = "";
            var eventId        = 1;
            var timePeriodId   = 1;
            var categoryId;    

    
            //Read variables data
            CYCLE_COLOR_SPEED = parseInt($(xml).find('cycleColorSpeed').attr('val'));
            TIMELINE_SCROLL_SPEED = parseInt($(xml).find('timelineScrollSpeed').attr('val'));
            MOVE_TIMELINE_COVER_DOWN_SPEED = parseInt($(xml).find('moveTimelineCoverDownSpeed').attr('val'));
            MOVE_TIMELINE_COVER_UP_SPEED = parseInt($(xml).find('moveTimelineCoverUpSpeed').attr('val'));
            MOVE_CATEGORIES_DOWN_SPEED = parseInt($(xml).find('moveCategoriesDownSpeed').attr('val'));
            MOVE_CATEGORIES_UP_SPEED = parseInt($(xml).find('moveCategoriesUpSpeed').attr('val'));
            MOVE_FULL_DESCRIPTION_DOWN_SPEED = parseInt($(xml).find('moveFullDescriptionDownSpeed').attr('val'));
            MOVE_FULL_DESCRIPTION_UP_SPEED = parseInt($(xml).find('moveFullDescriptionUpSpeed').attr('val'));
            ANIMATION_PRESET_TIMELINE_COVER_DOWN = $(xml).find('animationPresetTimelineCoverDown').attr('val');
            ANIMATION_PRESET_TIMELINE_COVER_UP = $(xml).find('animationPresetTimelineCoverUp').attr('val');
            ANIMATION_PRESET_FULL_DESCRIPTION_DOWN = $(xml).find('animationPresetFullDescriptionDown').attr('val');
            ANIMATION_PRESET_FULL_DESCRIPTION_UP = $(xml).find('animationPresetFullDescriptionUp').attr('val');
            ANIMATION_PRESET_CATEGORIES_DOWN = $(xml).find('animationPresetCategoriesDown').attr('val');
            ANIMATION_PRESET_CATEGORIES_UP = $(xml).find('animationPresetCategoriesUp').attr('val');

            //Get default category data
            defaultBackgroundColor    = $(xml).find('categories').attr("defaultBackgroundColor");
            defaultBackgroundImageUrl = $(xml).find('categories').attr("defaultBackgroundImageUrl");

            //Get category data
            $(xml).find('category').each(function(){
                //set up main nav data
                currCategory = new Category();
                currCategory.id          =  parseInt($(this).attr('id'));
                currCategory.name        =  trimString($(this).find('name').text());
                currCategory.spriteSheet =  $(this).find('spriteSheet').attr('source');     
                currCategory.backgroundColor   = $(this).attr('backgroundColor');
                currCategory.backgoundImageUrl = $(this).attr('backgroundImageUrl');  

                //assign nav item to nav item list ( array )
                categories.push(currCategory);
                
            });       

            //Get Event Data
            $(xml).find('timePeriod').each(function(){
                currTimePeriod      = new TimePeriod();
                currTimePeriod.id   = 'timeperiod_' + timePeriodId++;
                currTimePeriod.year = $(this).attr('year');
               

                //get events for the current yime period
                $(this).find('event').each(function(){
                    currEvent = new Event();
                    
                    //To store category ID's, we split the comma-delimited string into an array,
                    //and convert each element into an integer
                    currEvent.categories =  $.map( ($(this).attr('categories')).split(","), function(value){ return parseInt(value,10);});
                    
                    //add the category to the parent TimePerios category list
                    //This helps us later to quickly determine if any event in the time period
                    //contains a particular category rather then perfoeming a search each time
                    $.map( ($(this).attr('categories')).split(","), function(value){ 
                        categoryId = parseInt(value,10);
                        if( currTimePeriod.eventCategories.indexOf(categoryId) == -1){
                            currTimePeriod.eventCategories.push(categoryId);
                        }
                    });
                    currEvent.id = "event_" + eventId++;
                    currEvent.name = trimString($(this).find('name').text());
                    currEvent.shortDescription =  trimString($(this).find('shortDescription').text());
                    currEvent.shortDescriptionImageUrl = $(this).find('shortDescription').attr('imageUrl');
                    currEvent.longDescription =  trimString($(this).find('fullDescription').text());
                    currEvent.longDescriptionImageUrl = $(this).find('fullDescription').attr('imageUrl');

                    currEvent.imageOffsetX = parseInt($(this).find('fullDescription').attr('imageOffsetX'));
                    currEvent.imageOffsetY = parseInt($(this).find('fullDescription').attr('imageOffsetY'));
                    currEvent.textColor    = $(this).find('fullDescription').attr('textColor');

                    //add event
                    currTimePeriod.events.push(currEvent);

                    //add event to list of ALL events
                    allEvents.push(currEvent);
                });
                
                //add TimeLine to timeline
                timeline.push(currTimePeriod);
            });
           

            //Mark XML file as loaded
            XMLLoaded = true;

         
        },
        error: function(){
            alert("Could not load timeline data.");
            
        }
    });
}//end readXML



function cycleColors()
{

    $("#categories").queue("colors", function( next ){ $("#1").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#1").removeClass('activeCategory'); next();});

    $("#categories").queue("colors", function( next ){ $("#2").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#2").removeClass('activeCategory'); next();});

    $("#categories").queue("colors", function( next ){ $("#3").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#3").removeClass('activeCategory'); next();});

    $("#categories").queue("colors", function( next ){ $("#4").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#4").removeClass('activeCategory'); next();});

    $("#categories").queue("colors", function( next ){ $("#5").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#5").removeClass('activeCategory'); next();});

    $("#categories").queue("colors", function( next ){ $("#6").addClass('activeCategory'); next(); });
    $("#categories").delay(CYCLE_COLOR_SPEED,"colors");
    $("#categories").queue("colors",function(next){ $("#6").removeClass('activeCategory'); next();});

    $("#categories").dequeue("colors");

}//end cycleColors