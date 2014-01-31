module.exports = function(httpCode, desc){
    var desc = "<h3>HTTP Code: " + httpCode + "</h3>"
             + (desc || $.nodejs.http.STATUS_CODES[httpCode])
             ;
    var html = ""
             + "<html>"
             + "<head>"
                + "<title>NeoAtlantis Gateway</title>"
                + "<style>"
                    + "body{margin: 20px 10px 0px 10px}"
                    + "h1{font-style: italic; color: #EE0000}"
                    + "h3{padding: 0px; margin: 0px}"
                    + "#desc{margin: 0px; padding: 15px; background: #FFEE00}"
                    + "#foot{margin: 5px; text-align: right}"
                + "</style>"
             + "</head>"
             + "<body>"
                + "<h1>NeoAtlantis Gateway Error</h1>"
                + "<div id=\"desc\">" + desc + "</div>"
                + "<div id=\"foot\"><h3>MAGI - 1.2.3</h3></div>"
             + "</body>"
             + "</html>"
             ;
    return html;
};
