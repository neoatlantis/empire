module.exports = function(baum){
    return new function(){
        var self = this;

        var ipcServer = require('./ipc.server.js')(baum),
            ipcClient = require('./ipc.client.js')(baum),
            httpServer = require('./http.server.js')(baum),
            urlRouter = require('./router.js')(baum);

        this.IPC = {
            server: ipcServer.createServer,
            client: ipcClient.createClient,
        };

        this.HTTP = {
            server: httpServer.createServer,
        };

        this.urlRouter = urlRouter;

        return this;
    };
};
