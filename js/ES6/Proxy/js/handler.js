var handler = {
    get:(target, key, receiver)=>{
        if(typeof key != "symbol"){
            return target[key] ? `[${target[key]}]` : `${target.constructor.name}没有${key}`;
        }else{
            return target[key];
        }
    },
    set:(target, key, value, receiver)=>{
        console.log(`set:${key}=${value}`);
        target[key] = `(${value})`;
    }
};

if(typeof module != "undefined"){
    module.exports = handler;
}
