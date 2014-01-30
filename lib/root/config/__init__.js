function config(baum, path){
    var self = this;
    var testerName = /^[a-zA-Z0-9\.\-]{1,128}$/;
    var got = {};

    var index = baum.nodejs.fs.readFileSync(
        path + 'index.json',
        {encoding: 'utf-8'}
    );
    index = JSON.parse(index);

    for(var i in index){
        var item = index[i];
        var value = undefined;

        if(!testerName.test(item.name)) continue;

        if(!baum.nodejs.fs.existsSync(path + item.name)){
            if(undefined != item['default']) value = item['default'];
        } else {
            value = baum.nodejs.fs.readFileSync(
                path + item.name,
                {encoding: 'utf-8'}
            );
            value = value.trim();
        };

        //XXX verify the types, and so on.
        try{
            switch(item.type){
                case('json'):
                    value = JSON.parse(value);
                    break;
                case('path'):
                    value = $.nodejs.url.resolve(process.argv[1], value);
                    break;
                default:
                    break;
            };
        } catch (e){
            console.log(e);
            value = undefined;
        }

        if(undefined != value) got[item.name] = value;
    };

    return function(item){
        if(undefined != got[item])
            return got[item];
        else
            return undefined;
    };
};

module.exports = function(baum){
    return new function(){
        var self = this;

        this.createConfig = function(path){
            return new config(baum, path);
        };

        return this;
    };
};
