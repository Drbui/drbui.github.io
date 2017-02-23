/* 
 * <%-- $Author: powem $ --%>
 * <%-- $Date: 2009/10/19 14:19:52 $ --%>
 * <%-- $Revision: 1.4 $ --%>
 *
 */

/*
 * This file contains a JSON object for determining which sites
 * on the Merck sites are considered "product sites" so that
 * clicks can be tracked to them.
 * The point of having this load as a separate file is that the
 * list can be maintained without having to touch the Merck
 * tracking code itself.
 * 
 * This file is part of the WebTrends tracking for Merck and should
 * be included before the WebTrends tracking files.
 */


var productSites = {};

productSites = {

    "a+d original ointment" : "myadbaby.com",
    "afrin" : "afrin.com",
    "asmanex" : "asmanex.com",
    "avelox" : "avelox.com",
    "bain de soleil" : "baindesoleil.com",
    "clarinex" : "clarinex.com",
    "claritin" : "claritin.com",
    "coppertone" : "coppertone.com",
    "coricidin hbp" : "coricidin.com",
    "correctol" : "correctol.com",
    "cozaar" : "cozaar.com",
    "dr scholls custom fit orthotics" : "footmapping.com",
    "dr scholls" : "drscholls.com",
    "emend" : "emend.com",
    "follistim" : "follistim.com",
    "foradil aerolizer" : "foradil.com",
    "foradil medication guide" : "foradil.us",
    "fosamax" : "fosamax.com",
    "gardasil"   : "gardasil.com",
    "implanon" : "implanon.com",
    "integrilin" : "integrilin.com",
    "intron" : "introna.com",
    "isentress" : "isentress.com",
    "janumet" : "janumet.com",
    "januvia" : "januvia.com",
    "lotrimin" : "lotrimin.com",
    "maxalt tablets and maxalt-mlt" : "maxalt.com",
    "miralax" : "miralax.com",
    "nasonex" : "nasonex.com",
    "noxafil" : "noxafil.com",
    "nuvaring" : "nuvaring.com",
    "pegintron" : "pegintron.com",
    "propecia" : "propecia.com",
    "proventil hfa" : "proventilhfa.com",
    "rotateq" : "rotateq.com",
    "singulair" : "singulair.com",
    "temodar" : "temodar.com",
    "tinactin" : "tinactin.com",
    "vytorin" : "vytorin.com",
    "zemuron" : "zemuron.com",
    "zetia" : "zetia.com",
    "zolinza" : "zolinza.com",
    "zostavax" : "zostavax.com",
    "cancidas" : "cancidas.com",
    "invanz" : "invanz.com",
    "merckvaccines" : "merckvaccines.com"

}

$(".products .main-hero-section").animate({
    "background-size": "155%"
}, 5000, function() {
    // Animation complete.
});