var responsePages = require('./response.pages.js');

module.exports = function(packet){
    var pathname = packet.url.pathname;

    var pathnames = pathname.substr(1).split("/");

    var subsiteName = pathnames[0],
        subsite = $.global('config')('subsites')[subsiteName];

    if(undefined == subsite)
        return packet.response.end(responsePages(404));

    // forward
    packet.response.end(JSON.stringify(subsite));
};
