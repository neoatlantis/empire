module.exports = function(baum){
    return new function(){
        var self = this;
        storage = {};

        this.set = function(name, value){
            storage[name] = value;
            return self; 
        };

        this.get = function(name){
            if(undefined == storage[name])
                return null;
            return storage[name];
        };

        return function(name, value){
            if(undefined === value)
                return self.get(name);
            else
                return self.set(name, value);
        };
    };
};
