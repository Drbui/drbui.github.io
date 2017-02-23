//=====================================================
// pipeline)_omni2.js
// Version 1.17 - OMNI
//
// Version 1.17 Changes
// + Removed dependency on SomplyModal in favr of bootstrap.js modal
// Version 1.16 Changes
// + Fixed bug where Firefox required passing the (event) param to jQuery click handler in order to call event.preventDefault ()
// Version 1.15 Changes
// + Fixed bug for jquery 1.4 not understansin $element.exists().
// Version 1.14 Changes:
// + Fixed bug where an apostophe in a filter name caused inaccurate search results.
// Version 1.13 Changes
// + Added isHidingMyStuff() and getChildrenHeight() functions to adjust the size of the title DIV for phase items.
// Version 1.12 Changes
// + Fixed bug wherer error message ( on search criteria ) was being "cached"
// + Added ID to phase item ( <pahse> elemnt in XML )
// + Added functionality to use different "advanced arrow" colors depending on phase
// + Updated image locations for various items ( arrows, plus/minus images ) 
// Version 1.11 Changes
// + Added Page Element elements (<pageElements/>) section to XML. ( Data is read from XML and rendered to page)
// - Removed Title Block elements in favor of Page Elements
// Version 1.10 Changes
// + Added Clear Selections back into main NAV area
// + Updated print click handler to display PPT file
// + Added share click handler
// + Added ability to read  PPT link fro XML 
// Version 1.9 Changes
// + Removed A link in Clear Filters links and wired up the DIVs to handle clicks.
//   to try to resolve IE page refresh problem.
// Version 1.8 Changes
// + Improved "Clear All Filters" click handling.
// Version 1.7 Changes
// + Fixed "Clear All Filters" link issue on index page.
// Version 1.6 Changes
// + Fixed recursion bug.
// Version 1.5 changes
// + Rewrote code that handles case when users' filter selection results in no results.
//   to resolve jQuery 1.4 problem where we cannot use "live" or "on" methods.
// + Refactored clear filters code into new clearAllFilters() function.
// Version 1.4 Changes
// + Replaced jQuery "on" calls with "click" to support jQuery version 1.4 as well as 1.9
// Version 1.3 Changes
// - Removed auto-generated "Print" link from nav header.
// + Replacd checkboxes with checkbox image to allow easier handling of clicking/unclicking
// + Added code to respect XML <columnHeading> elements' "col" attribute.
//   either sub-cayegory name or related 'checkbox'.
// Version 1.2 Changes
// - Removed '.modalVideo' jQuery click handler.
// + Added ability to pull column headings from XML.
// + added 'clearFiltersDiv' jQuery click handler.
// + Added comments.
// + Added ability to pull title and description from XML.
// Version 1.1 Changes
// + Replaced trim() method with trimString. IE doesn't have a string.trim() method.
//   Instead, you can call jQuery's $.trim(str).
//=====================================================


//====================================================
//Page variables START
//====================================================

//Main XML config file URL
var XML_CONFIG_FILE='xml/pipeline.xml';


var columnHeadings = [];      /* Holds column heading descriptions from XML */
var navItems       = [];
var phases         = [];
var footnotes      = [];
var XMLLoaded      = false;
var phaseFilter        = []; /* These arrays hold the current set of filters governing which items display */
var categoryFilter     = [];
var therapeuticFilter  = [];
var researchAreaFilter = [];
var hasAdvancedFilter  = [];
var printLinkURL       = ""; /* The link we navigate to when the PRINT button is cicked ( we get this fomr the XML ) */
var shareLinkURL       = ""; /* The  link we navigate to when the SHARE button is clicked ( we get this fomr the XML ) */
/* Page element vars velow */
var chartTitle_title        = "";
var chartTitle_superscript  = "";
var chartTitle_date         = "";
var pdfLink_sectionTitle    = "";
var pdfLink_linkText        = "";
var pdfLink_linkUrl         = "";
var forwardLookingStatementText_sectionTitle = "";
var forwardLookingStatementText_text         = "";
var noDutyText_sectionTitle                  = "";
var noDutyText_text                          = "";

//An "Object" representing a single navigational item ( and all its sub-items)
//( i.e. a single selectionOptions section ( from XML ))
function navItem(){
    this.id           = "";
    this.name         = "";
    this.displayName  = "";
    this.subItems     = [];
}
function navSubItem(){
    this.id         = "";
    this.name       = "";
}

//An "Object" representing a single "Phase" ( including "Under Review" )
function phase(){
    this.id               = "";
    this.name             = "";
    this.cssHeaderClasses = "";
    this.cssTitleClasses  = "";
    this.cssSummaryClasses= "";
    this.phaseItems = [];
}
function phaseItem(){
    this.name             = "";
    this.id               = "";
    this.shortSummary     = "";
    this.moved            = "false";
    this.searchAttributes = [];
}
function phaseItemSearchAttribute(){
    this.section = "";
    this.value   = "";
}

//An "Object" holding the footnotes
function footnote(){
    this.symbol = "";
    this.note   = "";
}

//An "Object" to hold column heading data
function columnHeading(){
    this.colNum  = "";
    this.colText = "";
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

    //read XML
    readXML();

    //render page elements
    renderPageElements();

    //render the navigation bar
    renderNavBar();

    //render the pipeline
    renderPipeline();

    //render footnotes
    renderFootnotes();

     //Initialize shadowbox (? this was in original files sent over)
    Shadowbox.init();

    //set up SHARE link hover
    $('#shareClick')
        // On mouse over, set image to hover image
       .mouseover(function() {
         $(this).attr('src', 'http://www.merck.com/images/btn-share-hover.gif');
       })
       // On mouse out, set image back
       .mouseout(function() {
         $(this).attr('src', 'http://www.merck.com/images/btn-share.gif');
   });

    //set up SHARE link hover
    $('#printClick')
        // On mouse over, set image to hover image
       .mouseover(function() {
         $(this).attr('src', 'http://www.merck.com/images/btn-print-hover.gif');
       })
       // On mouse out, set image back
       .mouseout(function() {
         $(this).attr('src', 'http://www.merck.com/images/btn-print.gif');
   });

    //hook up clear filter click
    //$("#clearFiltersDiv").on("click",function(){
    $(".clearFiltersClick").click(function(){    
        clearFiltersAndRedisplay();
        return false;
    });

    //hook up header click
    $(".headerClick").click(function(event){ 

        var isDevice =/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());
        if(isDevice) {
                    //console.log("MOBILE");
                    var hid= $(this).attr('href');
                    event.preventDefault();
                    event.stopPropagation();
                   //   $(this > " ul").css('pointer-events','none');

                   $("#navItem_1_sub").css('display','none');
                   $("#navItem_2_sub").css('display','none');
                   $("#navItem_3_sub").css('display','none');
                   $("#navItem_4_sub").css('display','none');
                   $("#navItem_5_sub").css('display','none');
                    
                    //console.log("HC2: id:" + hid);
                    if( hid == "navItem_1"){
                        $("#navItem_1_sub").css('display','block');
                    }else if( hid == "navItem_2"){
                        $("#navItem_2_sub").css('display','block');
                    }else if( hid == "navItem_3"){
                        $("#navItem_3_sub").css('display','block');
                    }else if( hid == "navItem_4"){
                        $("#navItem_4_sub").css('display','block');
                    }else if( hid == "navItem_5"){
                        $("#navItem_5_sub").css('display','block');
                    }

           }else{
                    var hid= $(this).attr('href');

                    /*

                   $("#navItem_1_sub").css('display','none');
                   $("#navItem_2_sub").css('display','none');
                   $("#navItem_3_sub").css('display','none');
                   $("#navItem_4_sub").css('display','none');
                   $("#navItem_5_sub").css('display','none');
*/

                   
                   if( hid == "navItem_1"){
                        $("#navItem_1_sub").css('display','block');
                    }else if( hid == "navItem_2"){
                        $("#navItem_2_sub").css('display','block');
                    }else if( hid == "navItem_3"){
                        $("#navItem_3_sub").css('display','block');
                    }else if( hid == "navItem_4"){
                        $("#navItem_4_sub").css('display','block');
                    }else if( hid == "navItem_5"){
                        $("#navItem_5_sub").css('display','block');
                    }
                    

           }
      //  $(this > " ul").css('pointer-events','all');
        return false;
    });

    //hook up share click
    $("#shareClick").click(function(){
        var popWin = window.open(shareLinkURL, "_shareSite","status=no,toolbar=no,width=500,height=450,top=100,left=250,scrollbars=no,menubar=no");
        try {popWin.focus();} catch(e) {}
        return false;
    });

    //hook-up Print click
    $("#printClick").click(function(){ 
        //window.print();
        window.open(printLinkURL); 
        return false;
    });

    //hook up nav sub-item clicks
    //$(".subItemClick").on("click",function(){
    $(".subItemClick").click(function(event){   

        //event.preventDefault();
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
        
        var cbxId = $(this).find('img').attr('id');
        var id = $(this).find('a').attr('id');
        var href = $(this).find('a').attr('href');

        if( id == "Research Areas"){
            manageFilterArray(researchAreaFilter, href, id, cbxId);
        }else if( id == "Therapeutic Areas"){
            manageFilterArray(therapeuticFilter, href, id, cbxId);
        }else if( id == "Category"){
            manageFilterArray(categoryFilter, href, id, cbxId);
        }else if( id == "Phase"){
            manageFilterArray(phaseFilter, href, id, cbxId);
        }else if( id == "Item Has Advanced"){
            manageFilterArray(hasAdvancedFilter, href, id, cbxId);
        }

        //show updated resulta
        filterResults();

        return false;
    });


    

    //hook up clode icon (for message div)
    $("#closeIcon").click(function(){
        $.modal.close();
        $("#message").html("");
        $("#clearFiltersLinkMessage").show();
    });


    //modal IFrame click
    //$('.modalIframe').on("click",function(){
    $('.modalIframe').click(function(){
        var href = $(this).attr("href");

        $("#clearFiltersLinkMessage").hide();

      //  $("#message").html("<iframe id='if' style='width: 98%;height: 83%;' src='"+href+"'></iframe>");
      //  $("#messageDiv").modal({
      //                              opacity:80,
      //                              overlayCss: {backgroundColor:"#fff"}
      //                          });
        displayNewModal("<iframe id='if' style='width: 98%;height: 83%;' src='"+href+"'></iframe>");

        return false;
    });


    //hook up clear criteria click
    //$('#clearCriteria').on("click",function(){
    $('#clearCriteria').click(function(){
    //$('#clearCriteria').delegate("a", "click", function(){   
           clearFiltersAndRedisplay();
    });

    //=======PRE_FILTER START==============================================
    //================= READ GET-variables for passed filters and display initial list "filtered" -
    //read GET variables for filtering
    var qs_filterType  = getParameterByName("filterType"); // Category |  Phase | Therapeutic Areas | Item Has Advanced
    var qs_filterValue = getParameterByName("filterValue"); //The href of the "checkboxed" item ( from the href )
    var computed_cbxId = qs_filterType +  '_' + qs_filterValue; //this value should have underscored between words ( e.g.  "Category_Small_Molecule")
    computed_cbxId = computed_cbxId.replace(/\s/g, "_");
    var computed_id = qs_filterType;  //this value should have spaces between words ( e.g. "Therapeudic Areas")
    var computed_href = qs_filterValue; //this value should have spaces between words ( e.g. "Small Molecule")

    /*
    console.log("qs_filterType: [" + qs_filterType + "]");
    console.log("qs_filterValue: [" + qs_filterValue + "]");
    console.log("computed_cbxId: [" + computed_cbxId + "]");
    console.log("computed_id: [" + computed_id + "]");
    console.log("computed_href: [" + computed_href + "]");
    */
    
    //exception ( the sing)
    if( qs_filterValue == "Womens Health"){
        computed_cbxId = "Therapeutic_Areas_Women";
    }

   if( qs_filterType == "Research Areas"){
        manageFilterArray(researchAreaFilter, computed_href, qs_filterType, computed_cbxId);
    }else if( qs_filterType == "Therapeutic Areas"){
        manageFilterArray(therapeuticFilter, computed_href, qs_filterType, computed_cbxId);
    }else if( qs_filterType == "Category"){
        manageFilterArray(categoryFilter, computed_href, qs_filterType, computed_cbxId);
    }else if( qs_filterType == "Phase"){
        manageFilterArray(phaseFilter, computed_href, qs_filterType, computed_cbxId);
    }else if( qs_filterType == "Item Has Advanced"){
        manageFilterArray(hasAdvancedFilter, computed_href, qs_filterType, computed_cbxId);
    }
     filterResults();
     //=======PRE_FILTER END==============================================


});
//====================================================
// JQuery Document Ready Block END
//====================================================


//===============================================================================
//===============================================================================
//                            Functions below
//===============================================================================
//===============================================================================
function displayNewModal( message )
{
        //Create dynamic message
        $('#pipelineModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget);
          var plmodal = $(this);
          //modal.find('.modal-title').text('New message to ' + recipient);
          plmodal.find('.modal-body').html(message);
        });

       $('#pipelineModal').modal();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function stopPropagation(id, event) {
    $(id).on(event, function(e) {
        e.stopPropagation();
        return false;
    });
}

function isHidingMyStuff($s){
    //var $s = $(el);

    $s.wrapInner('<div />'); // wrap inner contents
    var hidden = $s.height() < $s.children('div').height();
    var childrenHeight = $s.children('div').height();
    $s.children('div').replaceWith( $s.children('div').html() ); //unwrap

    //console.log("hiding:" + hidden + " height:" + $s.height() + " children height:" + childrenHeight);
    return hidden;
}

function getChildrenHeight($s){
    //var $s = $(el);
    var childrenHeight = 0;

    if( $s != null ){ 

        $s.wrapInner('<div />'); // wrap inner contents


        var hidden = $s.height() < $s.children('div').height();
        childrenHeight = $s.children('div').height();
        $s.children('div').replaceWith( $s.children('div').html() ); //unwrap

        //Adjust
        childrenHeight -= 50;
        //console.log("children height:" + childrenHeight);
    }

    return childrenHeight;
}

function renderPageElements()
{
    $("#chartTitle_title").html(chartTitle_title);
    $("#chartTitle_superscript").html(chartTitle_superscript);
    $("#chartTitle_date").html(chartTitle_date);
    $("#pdfLink_sectionTitle").html(pdfLink_sectionTitle);
    $("#pdfLink").text(pdfLink_linkText);
    $("#pdfLink").attr('href',pdfLink_linkUrl);
    $("#forwardLookingStatementText_sectionTitle").html(forwardLookingStatementText_sectionTitle);
    $("#forwardLookingStatementText_text").html(forwardLookingStatementText_text);
    $("#noDutyText_sectionTitle").html(noDutyText_sectionTitle);
    $("#noDutyText_text").html(noDutyText_text);
}

function clearFiltersAndRedisplay()
{
    //$.modal.close();
    $('#pipelineModal').modal('hide');

    clearAllFilters();
    filterResults();
    return false;
}

//Returns the passed string stripped of leading/trailing whitespace
//Created because IE doesn't support the string.trim() method.
//Instead, we can call jQuery's $.trim(str).
//We wrapped it in a function here so it can be easily swapped out in case of future incompatibilities.
function trimString(str){
    return $.trim(str);
}//end trimString



//render the footnotes area beneath the pipeline
function renderFootnotes()
{
    //clear footnotes section
    $("#footnotes ul").html("");

    $(footnotes).each(function(){
        $("#footnotes ul").append("<li>"+this.symbol+" - "+this.note+"</li>");
    });
}//end renderFootnotes


//Clear any active filters
function clearAllFilters()
{
    phaseFilter        = [];
    categoryFilter     = [];
    therapeuticFilter  = [];
    researchAreaFilter = [];
    hasAdvancedFilter  = [];

    //unsure all checkboxes are set to off/unchecked
    $('.cbxImage').attr('src','http://www.merck.com/images/checkbox_off.png');

    return false;

}//end clearAllFilters


//This method is used to "manage" the various arrays which hold the items on which we are filtering.
//Basically, you pass an array and a value. 
//If the array does not contain the value, it adds it. Otherwise, it removes it.
//This mirrors how the user selects/unselects items from the various filter drop-downs.
//If they click a filter that was previously un-selected, it selects it. Otherwise, ir un-selects it.
function manageFilterArray( array, value, id, cbxId)
{

    //var checkboxId = "#" + constructCheckboxId(id,value);
    var checkboxId = "#" + cbxId;

    var i = array.indexOf(value);
    if(i != -1) {
        //remove item from array
        array.splice(i, 1);
        //set image to off/unchecked
        //$(checkboxId).prop('checked', false);
        $(checkboxId).attr('src','http://www.merck.com/images/checkbox_off.png');
    }else{
        //add item to array
        array.push(value);
        //set image to on/checked
        //$(checkboxId).prop('checked', true);
        $(checkboxId).attr('src','http://www.merck.com/images/checkbox_on.png');
    }
    return false;

}//end manageFilterArray


//This function iterates through all the pipeline items, and compares each one
//to all the Filter arrays, determining if it should be hidden or shown.
function filterResults()
{
    var currId;
    var matchesPhase;
    var matchesCategory;
    var matchesTherapeuticArea;
    var matchesResearchArea;
    var matchesHasAdvanced;
    var totalMatches = 0;

    //close the filter dro-down after each filter ( needed for iPad and devices that do not support "hover" semantics)
    var isDevice =/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent.toLowerCase());
    if(isDevice) {
            $("#navItem_1_sub").css('display','none');
            $("#navItem_2_sub").css('display','none');
            $("#navItem_3_sub").css('display','none');
            $("#navItem_4_sub").css('display','none');
            $("#navItem_5_sub").css('display','none');
    }

    $(phases).each(function(){
        //reset vars for this loop iteration
        matchesPhase = false;

        //check for Phase match
        if( phaseFilter.length == 0){
            matchesPhase = true;
        }else if( $.inArray( this.name, phaseFilter ) != -1 ){
            matchesPhase = true;
        }

        for(i=0; i < this.phaseItems.length; i++){
            //set vars for this loop iteration
            currId = "#item_"+ this.phaseItems[i].id;
            matchesCategory = false;
            matchesTherapeuticArea = false;
            matchesResearchArea = false;
            matchesHasAdvanced = false;

            //Check against currend HAS ADVANCED Filter
            if( hasAdvancedFilter.length == 0){
                matchesHasAdvanced = true;
            }else if(this.phaseItems[i].moved == "true" ){
                    matchesHasAdvanced = true;  
            }

            //Check against search attributes
            for( k=0; k < this.phaseItems[i].searchAttributes.length; k++){
                //encode the calue to prevent special characters from corrupting results.
                var valueToCheck = encodeHREF(this.phaseItems[i].searchAttributes[k].value);

                //Check against current CATEGORY filters
                if(categoryFilter.length == 0){
                    matchesCategory = true;
                }else if(this.phaseItems[i].searchAttributes[k].section == "Category" ){
                    //if( $.inArray( this.phaseItems[i].searchAttributes[k].value, categoryFilter) != -1 ){
                    if( $.inArray( valueToCheck, categoryFilter) != -1 ){
                        matchesCategory = true;
                    }
                }

                //Check against current RESEARCH AREA Filters
                if( researchAreaFilter.length == 0){
                    matchesResearchArea = true;
                }else if(this.phaseItems[i].searchAttributes[k].section == "Research Areas" ){
                    //if( $.inArray( this.phaseItems[i].searchAttributes[k].value, researchAreaFilter) != -1 ){
                    if( $.inArray( valueToCheck , researchAreaFilter) != -1 ){
                        matchesResearchArea = true;
                    }
                }


                //Check against current THERAPEUTIC AREA Filters
                if( therapeuticFilter.length == 0){
                    matchesTherapeuticArea = true;
                }else if(this.phaseItems[i].searchAttributes[k].section == "Therapeutic Areas" ){
                    //if( $.inArray( this.phaseItems[i].searchAttributes[k].value, therapeuticFilter) != -1 ){
                    if( $.inArray( valueToCheck , therapeuticFilter) != -1 ){    
                        matchesTherapeuticArea = true;
                    }
                }

            }

            //hide/show item based on matching
            if( matchesCategory &&  matchesResearchArea && matchesPhase && matchesHasAdvanced && matchesTherapeuticArea){
                $(currId).show("blind",null,1000,null);
                totalMatches++;
            }else{
                $(currId).hide("blind",null,1000,null);
            }
        
        }


    });

    //Check if we have results. If not, display an message
    if(totalMatches==0){
       

        var message = "No items match your search criteria.";

        //clear message div
        $("#message").html("");

        if(phaseFilter.length > 0){
            message += "<p>Phase</p><ul>";
            for(i=0; i<phaseFilter.length;i++){
                message += "<li>" + phaseFilter[i] + "</li>";
            }
            message += "</ul>";
        }

        if( categoryFilter.length > 0){
            message += "<p>Category</p><ul>";
            for(i=0; i<categoryFilter.length;i++){
                message += "<li>" + categoryFilter[i]+ "</li>";
            }
            message += "</ul>";
        }

        if( researchAreaFilter.length > 0){
            message += "<p>Research Area</p><ul>";
            for(i=0; i<researchAreaFilter.length;i++){
                message += "<li>" + researchAreaFilter[i]+ "</li>";
            }
            message += "</ul>";
        }

        if( therapeuticFilter.length > 0){
            message += "<p>Therapeutic Area</p><ul>";
            for(i=0; i<therapeuticFilter.length;i++){
                message += "<li>" + therapeuticFilter[i]+ "</li>";
            }
            message += "</ul>";
        }

        if( hasAdvancedFilter.length > 0){
            message += "<p>Item Had Advanced</p><ul>";
            for(i=0; i<hasAdvancedFilter.length;i++){
                message += "<li>" + hasAdvancedFilter[i]+ "</li>";
            }
            message += "</ul>";
        }
  
    //    var linkText=document.createTextNode('Clear Selections');

    //    $(document.createElement("span"))
    //        .attr({ id: "clearFilterSpan" })
    //        .append(message)
    //        .appendTo("#message");



      //  $("#clearFiltersLinkMessage").show();
      //  $("#clearFilterSpan").html(message);
      //  $("#messageDiv").modal({
      //                              opacity:80,
      //                              overlayCss: {backgroundColor:"#fff"}
      //                          });


        //Create dynamic message
        /*
        $('#pipelineModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget);
          var recipient = button.data('whatever');
          var plmodal = $(this);
          //modal.find('.modal-title').text('New message to ' + recipient);
          plmodal.find('.modal-body').html(message);
        });

       $('#pipelineModal').modal();
        */

       displayNewModal(message);

    }

    return false;
}//end filterResults


//Creates a unique ID for the checkboxes. 
//We use a function because various other functions need to access this id
//and we need to ensure it's computed the same way each time.
function constructCheckboxId(id, value)
{
    var str =  id+'_'+value;
    return str.replace(/ /g,"_");
}//end constructCheckboxId


//renders the navigation bar
function renderNavBar()
{
    var $navItem;
    var $navSubItems;
    var checkboxId;
    

    //create each nav item ( and sub-items if applicable )
    $(navItems).each( function(){

        //create the main navigation heading
        $navItem = $("<li><div><img src='http://www.merck.com/images/arrow.png'/></div><div><a style='padding-left:0px;display:inline-block;' class='headerClick' href='"+this.id+"'>"+this.displayName+"</a></div></li>");
        
        //if we have sub-items, create them
        if( this.subItems.length > 0 ){
            $navSubItems = $("<ul id='"+this.id+"_sub'></ul>");

            for( i=0; i< this.subItems.length; i++){
                checkboxId = constructCheckboxId(this.name, this.subItems[i].name);

                $navSubItems.append("<li class='subItemClick'><img id='"+checkboxId+"' class='cbxImage' src='/images/checkbox_off.png' width='16' height='16'/><a class='subItem' id='"+this.name+"' href='"+encodeHREF(this.subItems[i].name)+"'>"+this.subItems[i].name+"</a></li>");                
            }

            $navItem.append($navSubItems);
            
        }
        
        //add item to navigation bar
        $("#pipelineNavBar ul:first").append($navItem);

    });

    //add print item
    //$("#pipelineNavBar ul:first").append("<li><div><img src='/images/arrow.png'/></div><div><a id='printerLink' class='printClick'>Print</a><div></li>");

    //Add Search Link
    $("#pipelineNavBar ul:first").append("<li id='clearFiltersLI'><span id='clearFiltersNavBarItem' class='clearFiltersClick'>CLEAR<br/>SELECTIONS</span></li>");

}//end renderNavBar

function encodeHREF(href){
    return href.replace("'","");
}

//render the pipeline
function renderPipeline()
{
    var $phaseColumn;
    var $phaseDLWrapper;
    var plusSignHTML;
    var finalComputedCssClasses;
    var columnHeaderText;
    var colIdx = 1;
    var headerTextFound;

    $(phases).each(function(){
        //get header text
        headerTextFound = false;
        $(columnHeadings).each(function(){
            if( this.colNum == colIdx){
                columnHeaderText = "<div class='headerText'>"+this.colText+"</div>";
                headerTextFound = true;
            }
        });
        if( headerTextFound == false){
            columnHeaderText="<div class='headerText'></div>"; 
        }

        //create the column for this phase
        $phaseColumn = $("<div class='info-col'>"+columnHeaderText+"</div>");

        //create phase header
        $phaseColumn.append("<a class='"+this.cssHeaderClasses+"' href=''>View Image</a>");

        //create phase items
        for(i=0; i < this.phaseItems.length; i++){
            //append phase item
            if(this.phaseItems[i].shortSummary.length > 0){
                plusSignHTML = "<img src='/images/plus.png' width='15' height='15' alt='' style='float: right;''>";
            }else{
                plusSignHTML= '';
            }

        

            if(this.phaseItems[i].moved == "true"){
                if( this.id == 2){
                    finalComputedCssClasses = this.cssTitleClasses + " move2";
                }else if( this.id == 3){
                    finalComputedCssClasses = this.cssTitleClasses + " move3";
                }
            }else{
                finalComputedCssClasses = this.cssTitleClasses;
            }

            if( i == ( this.phaseItems.length - 1 )){
                 finalComputedCssClasses = finalComputedCssClasses + " lastInPhase";
            }

            $phaseColumn.append("<dl id='item_"+this.phaseItems[i].id+"'><dt class='"+finalComputedCssClasses+"'>"+plusSignHTML+this.phaseItems[i].name+"</dt><dd class='"+this.cssSummaryClasses+"'>"+this.phaseItems[i].shortSummary+"</dd></dl>");
         
        }    

        //append to pipeline section
        $("#pipeline").append($phaseColumn);

        //advance column index
        colIdx++;

    });

}//end renderPipeline


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
            var currNavItem = "";
            var currSubItem = "";
            var subItemId   = 0;

            //Get navigation data
            $(xml).find('section').each(function(){
                //set up main nav data
                currNavItem = new navItem();
                currNavItem.id = "navItem_" + $(this).attr('id');
                currNavItem.name =  $(this).attr('name');
                currNavItem.displayName = trimString($(this).find('displayName').text());

                //set up sub-items ( if applicable )
                $(this).find('option').each(function(){
                    currSubItem = new navSubItem();
                    currSubItem.id = "navSubItem_" + subItemId;
                    currSubItem.name = $(this).attr('name');

                    //add item to current main nav item
                    currNavItem.subItems.push(currSubItem);

                    //increase id's
                    subItemId++;
                });

                //assign nav item to nav item list ( array )
                navItems.push(currNavItem);

                
            });       

            //read page element data
            chartTitle_title        = trimString($(xml).find('chartTitle').find('title').text());
            chartTitle_superscript  = trimString($(xml).find('chartTitle').find('superscript').text());
            chartTitle_date         = trimString($(xml).find('chartTitle').find('date').text());
            pdfLink_sectionTitle    = $(xml).find('pdfLink').attr('sectionTitle');
            pdfLink_linkText        = trimString($(xml).find('pdfLink').find('linkText').text());
            pdfLink_linkUrl         = trimString($(xml).find('pdfLink').find('linkUrl').text());
            forwardLookingStatementText_sectionTitle = $(xml).find('forwardLookingStatementText').attr('sectionTitle');
            forwardLookingStatementText_text         = trimString($(xml).find('forwardLookingStatementText').text());
            noDutyText_sectionTitle                  = $(xml).find('noDutyText').attr('sectionTitle');
            noDutyText_text                          = trimString($(xml).find('noDutyText').text());

            //Get print link url
            printLinkURL =  $(xml).find('printLinkURL').attr('url');

            //Get share link url
            shareLinkURL = $(xml).find('shareLinkURL').attr('url');

            //Get column headings
            var currColHeading;
            $(xml).find('columnHeading').each(function(){
                currColHeading         = new columnHeading();
                currColHeading.colNum  = parseInt($(this).attr('col'));
                currColHeading.colText = trimString($(this).text());
                columnHeadings.push(currColHeading);
            });

            //Get Phase Data
            var currPhase;
            var currPhaseItem;
            var currSearchAttribute;
            var phaseItemId = 0;
            $(xml).find('phase').each(function(){
                currPhase = new phase();
                currPhase.id = parseInt($(this).attr('id'));
                currPhase.name = trimString($(this).find('name:first').text());
                currPhase.cssHeaderClasses = $(this).attr('cssClasses_header');
                currPhase.cssTitleClasses = $(this).attr('cssClasses_itemTitle');
                currPhase.cssSummaryClasses = $(this).attr('cssClasses_itemSummary');
                
                //Add phase items to this phase
                $(this).find('phaseItem').each(function(){
                    currPhaseItem = new phaseItem();
                    currPhaseItem.name = trimString($(this).find('name').text());
                    currPhaseItem.id = phaseItemId++;
                    currPhaseItem.shortSummary = trimString($(this).find('shortSummary').text());
                    currPhaseItem.moved = $(this).attr('moved');

                    //add search attributes to this phase item
                    $(this).find('attribute').each(function(){
                        currSearchAttribute = new phaseItemSearchAttribute();
                        currSearchAttribute.section = $(this).attr('section');
                        currSearchAttribute.value = $(this).attr('value');

                        //add search attribute to phase item
                        currPhaseItem.searchAttributes.push(currSearchAttribute);
                    });


                    //add phase item to phase
                    currPhase.phaseItems.push(currPhaseItem);
                });

                //add phase to phase list
                phases.push(currPhase);
            }); 

            //Get footnote data
            var currFootnote;
            $(xml).find('footnote').each(function(){
                currFootnote = new footnote();
                currFootnote.symbol = $(this).attr('symbol');
                currFootnote.note = trimString($(this).text());

                //add current footnote to footnotes
                footnotes.push(currFootnote);
            });

            //Mark XML file as loaded
            XMLLoaded = true;

         
        },
        error: function(){
            //$("#message").html("Could not load pipeline data.");
            //$("#messageDiv").modal({
             //                       opacity:80,
             //                       overlayCss: {backgroundColor:"#fff"}
             //                   });
            displayNewModal("Could not load pipeline data.");
            
        }
    });
}//end readXML