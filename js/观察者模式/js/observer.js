class Observer{
    constructor(f){
        this.deps = [];
        f(this);
    }
    emit(e){
        this.deps.forEach((f)=>{
            f(e);
        });
    }
    subscribe(f){
        this.deps.push(f);
    }
    unsubscribe(f){
        let index = this.deps.findIndex((item)=>{
            return item == f;
        });
        if(index>=0){
            this.deps.splice(index,1);
            return true;
        }else{
            return false;
        }
    }
}