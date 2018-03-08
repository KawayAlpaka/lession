// async/await
let i = 0;
let getFile = function(){
    let p = new Promise((resolve,reject)=>{
        let ms = Math.random()*2000;
        setTimeout(()=>{
            resolve(i++);
        },ms)
    });
    return p;
};
let asyncFunc = async function a(){
    for(;true;){
        let file = await getFile();
        console.log(file);
    }
};
asyncFunc();
function testable(target) {
    target.isTestable = true;
  }
//装饰器
@testable
class MyTestableClass {
  // ...
}
console.log(MyTestableClass.isTestable) // true

export {
    MyTestableClass
}