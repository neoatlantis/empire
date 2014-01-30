/*
 * process subtree
 *
 * provides the most needed features in a server, such as a simple report on
 * health(so that Util.Rezeption can tell).
 */

module.exports = function(baum){
    return new function(){
        var self = this;

        this.report = function(){
            return {
                memory: self.memoryUsage(),
                uptime: self.uptime(),
            };
        };

        this.memoryUsage = process.memoryUsage;
        this.uptime = process.uptime;

        this.resolvePath = function(to){
            return baum.nodejs.path.resolve(
                baum.nodejs.path.dirname(process.argv[1]),
                to
            );
        };

        return this;
    };
};
