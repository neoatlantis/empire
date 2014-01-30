module.exports = function(){
    var errTypes = ['DEBUG', 'ERROR', 'WARNING', 'NOTICE'];
    function report(type){
        return function(){
            var msg = type + '\n' + this.toString() + '\n';
            $.nodejs.util.log(msg);
            return new Error(msg);
        };
    };

    String.prototype.DEBUG = report('DEBUG');
    String.prototype.ERROR = report('ERROR');
    String.prototype.WARNING = report('WARNING');
    String.prototype.NOTICE = report('NOTICE');

    String.prototype.startsWith = function(str){
        return (this.toString().substr(0, str.length) == str);
    };
 
    String.prototype.endsWith = function(str){
        return (this.toString().substr(-str.length) == str);
    };

    Object.defineProperty(
        function(key){
            var keys = Object.keys(this);
            for(var i in keys)
                if(keys[i] == key) return true;
            return false;
        },
        'hasKey',
        {
            enumerable: false,
        }
    );
};
