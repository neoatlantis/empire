var standardErrors = {
    'geheimdienst': [
    
    ],

    'rezeption': [
        
    ],
};

//////////////////////////////////////////////////////////////////////////////

function errorUtil($, domain){
    var self = this;
    var errorHandlers = {};

    this.register = function(errorName, handler){
        if(!$.types.isString(errorName))
            throw Error('Trying to register a handler using non-string.');
        errorHandlers[errorName] = handler;
        if(standardErrors[domain].indexOf(errorName) < 0)
            String(
                "An error handler is registered under name ["
                + errorName
                + "] which is non-standard. Try to overcome this issue."
            ).WARNING();
        return self;
    };

    this.takeover = function(normalHandler){
        return function(error, result){
            if(null != error){
                var handler = errorHandlers[error];
                if(undefined == handler){
                    String(
                        "No registered handler of this type of error."
                        + error
                    ).ERROR();
                    throw Error(
                        'No sufficient handler for this error: '
                        + error
                    );
                    return;
                };
                handler(error);
            } else
                normalHandler(result);
        };
    };

    return this;
};

module.exports = function(baum){
    return function(domain){
        return new errorUtil(baum, domain);
    };
};
