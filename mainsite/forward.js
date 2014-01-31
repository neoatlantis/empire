module.exports = function(packet, dest){
    // proxy the packet to a destination. when error, set packet to output
    // errors.
    var httpOptions = {};
    if('unix-socket' == dest.type)
        httpOptions = {
            socketPath: dest.addr,
        };
    else
        httpOptions = {
            host: dest.addr,
            port: dest.port || 80,
        };
    httpOptions.method = packet.request.method;
    httpOptions.headers = packet.request.headers;
    httpOptions.path = packet.request.url;

    console.log(httpOptions);

    // create a request
    var subsiteRequest = $.nodejs.http.request(httpOptions);

    // bind the incoming request to subsite
    subsiteRequest.on('response', function(subsiteResponse){
        packet.response.writeHead(
            subsiteResponse.statusCode, 
            subsiteResponse.headers
        );

        subsiteResponse.on('data', function(chunk){
            packet.response.write(chunk);
        });
        subsiteResponse.on('end', function(){
            packet.response.end();
        });
        subsiteResponse.on('error', function(err){
            packet.emit('error', err);
        });
    });

    subsiteRequest.on('error', function(err){
        packet.emit('error', err);
    });

    packet.request.on('data', function(chunk){
        subsiteRequest.write(chunk);
    });
    packet.request.on('end', function(){
        subsiteRequest.end();
    });


    /* handle errors */
    function incomingPacketError(err){
        var httpCode = 400;
        switch(err.message){
            case 'request-entity-too-large':
                httpCode = 413;
                break;
            case 'connect ENOENT':
                httpCode = 503;
                break;
            default:
                console.log(err, err.message);
                break;            
        };

        if(packet.response.headersSent)
            packet.response.end();
        else {
            packet.response.writeHead(httpCode);
            packet.response.end($.global('responser')(httpCode));
        };
        subsiteRequest.end();
    };

    packet.on('error', incomingPacketError);
};
