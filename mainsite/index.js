$.global('responser', require('./response.pages.js'));
$.global('forwarder', require('./forward.js'));

module.exports = function(packet){
    var pathname = packet.url.pathname;

    var pathnames = pathname.substr(1).split("/");

    var subsiteName = pathnames[0],
        subsite = $.global('config')('subsites')[subsiteName];

    if(undefined == subsite)
        return packet.response.end(
            $.global('responser')(404)
        );

    // forward
    $.global('forwarder')(packet, subsite);
};
