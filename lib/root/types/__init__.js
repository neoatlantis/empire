module.exports = function(baum){
    return new function(){
        var self = this;

        this.isError = function(v){
            return toString.apply(v) === '[object Error]';
        };

        this.isArray = function(v){
            return toString.apply(v) === '[object Array]';
        };
        
        this.isDate = function(v){
            return toString.apply(v) === '[object Date]';
        };
        
        this.isObject = function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        };
        
        this.isPrimitive = function(v){
            return self.isString(v) || self.isNumber(v) || self.isBoolean(v);
        };
        
        this.isFunction = function(v){
            return toString.apply(v) === '[object Function]';
        };
        
        this.isNumber = function(v){
            return typeof v === 'number' && isFinite(v);
        };
        
        this.isString = function(v){
            return typeof v === 'string';
        };
        
        this.isBoolean = function(v){
            return typeof v === 'boolean';
        };

        this.isBuffer = function(v){
            return baum.nodejs.buffer.Buffer.isBuffer(v);
        };
    };
};
