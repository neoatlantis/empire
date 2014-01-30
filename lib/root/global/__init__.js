module.exports = function(baum){
    var storage = {};

    return function(name, value){
        var self = this;
        if(undefined === value){
            if(undefined == storage[name])
                return null;
            return storage[name];
        } else {
            storage[name] = value;
            return self; 
        };
    };
};
