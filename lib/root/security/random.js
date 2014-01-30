module.exports = function(baum){
    return new function(){
        var self = this;

        this.bytes = function(length, callback){
            // use different sources
            var task = [
                function(rueckruf){
                    baum.nodejs.crypto.randomBytes(length, rueckruf);
                },

                function(rueckruf){
                    var hrtimes = [];
                    for(var i=0; i<length; i++)
                        hrtimes.push(process.hrtime());
                    rueckruf(
                        null,
                        new $.nodejs.buffer.Buffer(hrtimes.toString())
                    );
                },

                function(rueckruf){
                    rueckruf(null, new $.nodejs.buffer.Buffer(JSON.stringify([
                        baum.nodejs.os.cpus(),
                        process.uptime(),
                        process.memoryUsage().rss,
                    ])));
                },
            ];

            // work out and use PDKDF to improve quality.
            baum.nodejs.async.parallel(task, function(err, result){
                if(null != err){
                    callback(err);
                    return;
                };
    
                var p1 = result.shift();
                var p2 = baum.nodejs.buffer.Buffer.concat(result);

                baum.nodejs.crypto.pbkdf2(
                    p2,
                    p1,
                    4,
                    length,
                    callback
                );
            });
        };
    };
};
