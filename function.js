$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const config = urlParams.get("cmreview");
    if (config == "true") {
        $("#review_button").show();
        $(".ss-component-content").each(function() {
            $(this).find("[style]").each(function() {
                if ($(this).css('text-align') != "center") {
                    if ($("#review_results li:contains('" + $(this).text() + "')").length == 0) {
                        $("#review_results").append("<li class='warning'>Warning: text has custom formatting or styling: " + $(this).text() + "</li>");
                    }
                }
            });
            $(this).find('a[href*=".pdf"]').each(function() {
                var $url = $(this).attr("href");
                var a = document.createElement('a');
                a.href = $url;
                var $finalUrl = a.protocol + '//' + a.hostname;
                if ($("#review_results li:contains('" + $(this).text() + "')").length == 0) {
                    if ($finalUrl != "https://files.smartsites.parentsquare.com" && $finalUrl != "https://s3.amazonaws.com") {
                        $("#review_results").append("<li class='warning'>Warning: pdf is not hosted on SmartSites (PDF url: <a target='_blank' href='" + $(this).attr("href") + "'>" + $(this).text() +"</a>)</li>");
                    }
                }
            });

            $(this).find('a[href*=".doc"]').each(function() {
                var $url = $(this).attr("href");
                var a = document.createElement('a');
                a.href = $url;
                var $finalUrl = a.protocol + '//' + a.hostname;
                if ($("#review_results li:contains('" + $(this).text() + "')").length == 0) {
                    if ($finalUrl != "https://files.smartsites.parentsquare.com") {
                        $("#review_results").append("<li class='warning'>Warning: document is not hosted on SmartSites (PDF url: <a target='_blank' href='" + $(this).attr("href") + "'>" + $(this).text() + "</a>)</li>");
                    }
                }
            });

            $(this).find("img").each(function() {

                var $url = $(this).attr("src");
                var a = document.createElement('a');
                a.href = $url;
                var $finalUrl = a.protocol + '//' + a.hostname;
                if ($finalUrl != "https://files.smartsites.parentsquare.com") {
                    $("#review_results").append("<li class='warning'>Warning: image is not hosted on SmartSites (Image url: " + $(this).attr("src") + ")<img src='"+$(this).attr("src")+"' /></li>");
                }
            });

            $(this).find("h2").each(function() {
                $("#review_results").append("<li class='error'>Error: Heading level 2 detected: " + $(this).text() + "</li>");
            });


            $(this).find("h1").each(function() {
                $("#review_results").append("<li class='error'>Error: Heading level 1 detected: " + $(this).text() + "</li>");
            });

        });
        
        if( $("#review_results").find("li").length == 0) {
                        $("#review_results").html("<li class='success'>Success! No errors found.</li>");
        }

        $("#link_forms").submit(function(e) {
            e.preventDefault();
            $(".ss-component-content").each(function() {
              $(this).find("a").each(function() {
                   var $url = $(this).attr("href");
                   var firstUrl = document.createElement('a');
                   var secondUrl = document.createElement('a');
                   secondUrl.href = $("#old_site_url").val();
                   firstUrl.href = $url;
                       if(firstUrl.hostname == secondUrl.hostname) {
                            $("#review_results").append("<li class='error'>Warning: link goes to previous site: <a target='_blank' href='" + $(this).attr("href") + "'>" + $(this).text() + "</a></li>");
                        }
              });
            });
        });

    }
});
