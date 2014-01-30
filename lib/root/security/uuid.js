module.exports = function(baum){
    return function(){
        return baum.nodejs.uuid.v4(
            baum.nodejs.uuid.v1(
                process.hrtime().join('')
            )
        );
    };
};
