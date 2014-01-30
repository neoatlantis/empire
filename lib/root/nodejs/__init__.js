module.exports = function(baum){
    return new function(){
        var self = this;

        var desired = [
            'http',
            'https',
            'util',
            'os',
            'path',
            'fs',
            'url',
            'crypto',
            'zlib',
            'buffer',
            'events',
            'querystring',
            'child_process',
            'stream',

            'async',
            'buffalo',
            'msgpack',
            'asn1.js',
            'sqlite3',
            'memwatch',
            'uuid',
        ];
        for(var i in desired){
            try{
                this[desired[i]] = require(desired[i]);
            } catch(e){
                this[desired[i]] = null;
            };
        };

        return this;
    };
};
