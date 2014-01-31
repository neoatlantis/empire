/*
 * Welcome to NeoAtlantis
 *
 * Here runs the server that has following tasks:
 *  o Enable SSL connection.
 *  o Read a request, retriving the key info and forward to sub-servers.
 *  o Show error pages according to the returned result.
 *  o Manage the sub-servers.
 *
 * The connection between a server and a sub-server is over HTTP. In cases 
 * when the server and sub-servers run on the same computer, HTTP are over
 * UNIX-Sockets. Otherwise, we may use HTTPS to connect to other servers.
 */

require('./lib/root');
var mainLogic = require('./mainsite');

var config = $.global('config', $.config.createConfig('./config/'));

String("NeoAtlantis Website Startup.").NOTICE();

if($.global('config')('https')){
//    String("Starting HTTPS server...").NOTICE();
//} else {
    String("No HTTPS settings read. Omit HTTPS setting up.").WARNING();
};

if($.global('config')('http')){
    var httpPort = $.global('config')('http-port');
    String("Starting HTTP server on port [" + httpPort + "].").NOTICE();
    $.global(
        'server-http', 
        $.net.HTTP.server(httpPort)
    );
    $.global('server-http').start();
    $.global('server-http').on('data', mainLogic);
} else {
    String("No HTTP settings read. Omit HTTP setting up.").WARNING();
};
