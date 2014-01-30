function protocolClient($, ipcClient){
    var self = this;

    return this;
};

//////////////////////////////////////////////////////////////////////////////

var client = function(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);
    var packet = require('./packet.js')(baum);

    this.request = function(path, callback, options){
        var requestOptions = {
            path: path,
            socketPath: socketPath,
            method: 'GET',
        };

        if(undefined != options){
            var headers = {};

            if(undefined != options.post){
                requestOptions.method = 'POST';
            };

            if(undefined != options.auth){
                headers['Authorization'] = 
                    'Basic ' + new $.nodejs.buffer.Buffer(
                        options.auth.username + ':'
                        + options.auth.password
                    ).toString('base64')
                ;
            };

            if(headers) requestOptions.headers = headers;
        };

        var request = baum.nodejs.http.request(
            requestOptions,
            function(response){
                callback(null, packet.createClientPacket('ipc', response));
            }
        );

        request.on('error', function(e){
            callback(e, null);
        });

        if(options && undefined != options.post) request.write(options.post);
        request.end();
    };

    return this;
};

module.exports = function(baum){
    baum.nodejs.util.inherits(client, baum.nodejs.events.EventEmitter);
    return new function(){
        var self = this;
        this.createClient = function(socketPath){
            return new client(baum, socketPath);
        };

        return this;
    };
};
