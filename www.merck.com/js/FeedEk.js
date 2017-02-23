/*
 * FeedEk jQuery RSS/ATOM Feed Plugin v1.1.2
 * http://jquery-plugins.net/FeedEk/FeedEk.html
 * Author : Engin KIZIL
 * http://www.enginkizil.com
 */
(function (e) {
    e.fn.FeedEk = function (t) {
        var n = {
            FeedUrl: "",
            MaxCount: 3,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank"
        };
        if (t) {
            e.extend(n, t)
        }
        var r = e(this).attr("id");
        var i;
        e("#" + r).empty().append('<div style="padding:3px;"><img src="loader.html" /></div>');
        e.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + "&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en&callback=?",
            dataType: "json",
            success: function (t) {
                e("#" + r).empty();
                var s = "";
                e.each(t.responseData.feed.entries, function (e, t) {
					if (n.ShowPubDate) {
                        i = new Date(t.publishedDate);
						months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        //s += '<div class="itemDate">' + i.toLocaleDateString() + "</div>"
                    
                    s += '<li><div class="itemDate">' + months[ i.getMonth() ] + ' ' + i.getDate() + ', ' + i.getFullYear() + '</div><div class="itemTitle"><a href="' + t.link + '" target="' + n.TitleLinkTarget + '" >' + t.title + "</a></div>";
                    }
                    if (n.ShowDesc) {
                        if (n.DescCharacterLimit > 0 && t.content.length > n.DescCharacterLimit) {
                            s += '<div class="itemContent">' + t.content.substr(0, n.DescCharacterLimit) + "...</div>"
                        } else {
                            s += '<div class="itemContent">' + t.content + "</div>"
                        }
                    }
                });
                e("#" + r).append('<ul class="feedEkList">' + s + "</ul>")
            }
        })
    }
})(jQuery)