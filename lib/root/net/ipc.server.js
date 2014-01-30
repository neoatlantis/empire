function protocolServer(baum, ipcServer){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);

    function parseReceived(packet){
        packet.on('ready', function(data){
            try{
                var json = JSON.parse(data.raw);
                var signal = json.sig,
                    payload = json.payload;
                    
                function callback(err, signal, payload){
                    if(null != err){
                        packet.response.writeHead(err);
                        packet.response.end();
                        return;
                    };
                    var ret = JSON.stringify({
                        sig: signal,
                        payload: payload,
                    });
                    packet.response.writeHead(200);
                    packet.response.end(ret);
                };

                self.emit(signal, payload, callback);
            } catch(e){
                self.emit('error', 'bad-json');
                return;
            };
        });
    };

    ipcServer.on('data', parseReceived);

    return this;
};

//////////////////////////////////////////////////////////////////////////////

var server = function(baum, socketPath){
    var self = this;
    baum.nodejs.events.EventEmitter.call(this);
    var packet = require('./packet.js')(baum);

    var server = null;

    function serverLogic(request, response){
        self.emit('data', packet.createServerPacket('ipc', request, response));
    };

    this.start = function(){
        function initServer(){
            server = baum.nodejs.http.createServer(serverLogic);
            server.listen(socketPath);
        };

        function unlinkAndStart(){
            baum.nodejs.fs.unlink(socketPath, function(){
                initServer();
            });
        };

        function checkIsSocket(err, lstatResult){
            if(null != err){
                self.emit('error');
                return;
            };
            if(!lstatResult.isSocket()){
                self.emit('error');
                return;
            };
            unlinkAndStart();
        };

        baum.nodejs.fs.exists(socketPath, function(exists){
            if(exists){
                baum.nodejs.fs.lstat(socketPath, checkIsSocket);
            } else
                initServer();
        });
    };

    return this;
};


module.exports = function($){
    $.nodejs.util.inherits(server, $.nodejs.events.EventEmitter);
    $.nodejs.util.inherits(protocolServer, $.nodejs.events.EventEmitter);

    return new function(){
        var self = this;

        this.createServer = function(socketPath){
            return new server($, socketPath);
        };

        this.createProtocolServer = function(socketPath){
            var ipcServer = new server($, socketPath);
            return new protocolServer($, ipcServer);
        };

        return this;
    };
};
