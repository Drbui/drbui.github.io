//===============================================================
// Version 1.5
//
// Version 1.5 Changes
// + Added getChildrenHeight() call after .animate() function to adjust the size of the title DIV for phase items.
// Version 1.4 changes
// + Altered CSS styles to properly return cells to their original states after expand/contract
// Version 1.3 changes
// + Ensure all plus/minus images revert to plus when a box is clicked.
// Version 1.2 Changes
// + Replaced "delegate" jQuery calls with "click" calls to support jQuery 1.4
// Version 1.1 Changes
// + Modified code so when user click on an already opened cell, 
//   the cell then cloded back to smaller size
// + Modified code to show a minus sign when the main element is open, 
//   and plus sign when it is closed.
//
//===============================================================

$(function() {

    // Set up variables
    var $el, $parentWrap, $otherWrap, 
        $allTitles = $("dt").css({
            padding: 15, // setting the padding here prevents a weird situation, where it would start animating at 0 padding instead of 5
            "cursor": "pointer" // make it seem clickable
        }),
        $allCells = $("dd").css({
            position: "relative",
            top: -1,
            left: 0,
            display: "none" // info cells are just kicked off the page with CSS (for accessibility)
        });
    
    // clicking image of inactive column just opens column, doesn't go to link   
    //$("#page-wrap").delegate("a.image","click", function(e) { 
    $("#page-wrap a.image").click(function(e) {   

        if ( !$(this).parent().hasClass("curCol") ) {         
            e.preventDefault(); 
            $(this).next().find('dt:first').click(); 
        } 
        
    });
    
    // clicking on titles does stuff
    //$("#page-wrap").delegate("dt", "click", function() {
    $("#page-wrap dt").click(function() {
        
        // cache this, as always, is good form
        $el = $(this);
        
        // if this is not already the active cell
        if (!$el.hasClass("current")) {

            $parentWrap = $el.parent().parent();
            $otherWraps = $(".info-col").not($parentWrap);
            
            // remove current cell from selection of all cells
            $allTitles = $("dt").not(this);
            
            // close all info cells
            $allCells.slideUp();
            
            // return all titles (except current one) to normal size
            $allTitles.animate({
                fontSize: "12px",
                paddingTop: 15,
                paddingRight: 15,
                paddingBottom: 15, /* was 5 */
                paddingLeft: 15
            });
            
            //Ensure all plus/minus images revert back to plus 
            $allTitles.find('img').attr('src','http://www.merck.com/images/plus.png');

            // animate current title to larger size  

            $el.animate({
                "font-size": "18px",
                paddingTop: 10,
                paddingRight: 5,
                paddingBottom: 135, /* was 0 then 95 */
                paddingLeft: 15
            },400,"swing",function(){ 
                            //$el.css('paddingBottom',95)
                            //Set DIV height to accoodate children
                            $el.css('paddingBottom',getChildrenHeight($el));
                        }).next().slideDown();
            
            // make the current column the large size
            $parentWrap.animate({
                width: 350
            }).addClass("curCol");
            
            // make other columns the small size
            $otherWraps.animate({
                width: 200 /* was 200 */
            }).removeClass("curCol");
            
            // make sure the correct column is current
            $allTitles.removeClass("current");
            $el.addClass("current");  

            //swap plus sign (open) to minus sign (close)
            $el.find('img').attr('src','http://www.merck.com/images/minus.png');
        
        }else{

            // this IS already the active cell, so...
            
            $allWraps = $(".info-col");
            $allWraps.animate({
                width: 250 /* was 200 */
            }).removeClass("curCol");

            // remove current cell from selection of all cells
            $allTitles = $("dt"); 
            
            // close the info cells
            $allCells.slideUp();

            // return this title to normal size
            $el.animate({
                fontSize: "12px",
                paddingTop: 15,
                paddingRight: 15,
                paddingBottom: 15, /* was 5 */
                paddingLeft: 15
            });


            // make current cell the small size
            $parentWrap = $el.parent().parent();
            $parentWrap.animate({
                width: 250
            }).removeClass("curCol");

             // make sure we reset all columns ( set to not current )
            $allTitles.removeClass("current");

             //swap plus minus sign (close) to sign (open) 
            $el.find('img').attr('src','http://www.merck.com/images/plus.png');
        }
        
    });

    
    $("#starter").trigger("click");
    
});