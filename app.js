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
