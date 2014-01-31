module.exports = function(httpCode, desc){
    var html = ""
             + "<html>"
             + "<head>"
                + "<title>NeoAtlantis Gateway</title>"
                + "<style>"
                    + "h1{font-style: italic; color: #EE0000}"
                + "</style>"
             + "</head>"
             + "<body>"
                + "<h1>NeoAtlantis Gateway Error</h1>"
             + "</body>"
             + "</html>"
             ;
    return html;
};
