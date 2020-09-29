
function compileCode(src) {
  src = `
    Object.assign(exposeObj,data);
    with (exposeObj) {
      ${src} 
    }
  `
	return new Function('exposeObj',"data", src)
}

function proxyObj(originObj) {
	let exposeObj = new Proxy(originObj, {
		// has: (target, key) => {
		// 	if (["JSON","console", "Math", "Date"].indexOf(key) >= 0) {
		// 		return target[key]
		// 	}
		// 	if (!target.hasOwnProperty(key)) {
		// 		throw new Error(`Illegal operation for key ${key}`)
		// 	}
		// 	return target[key]
    // },
    has:(target, key)=>{
      if (["JSON","console", "Math", "Date"].indexOf(key) >= 0) {
				return false;
			}
      return true;
    },
    get: (target, key) => {
      console.log(key);
      if(key === Symbol.unscopables){
        return undefined;
      }
			if (!target.hasOwnProperty(key)) {
        // throw new Error(`Illegal operation for key ${key}`)
        return undefined;
			}
			return target[key]
    },
	})
	return exposeObj
}

function createSandbox(src, obj) {
	let proxy = proxyObj(obj);
	return compileCode(src).bind(proxy,proxy); //绑定this 防止this访问window
}



var fn = createSandbox(`
  var hello = "hello world";
  console.log("haha");
  // console.log(exposeObj);
  console.log(heihei);
  console.log(data);
  console.log(JSON.stringify({hehe:"hehe"}));
  console.log(JSON);
  console.log(CSS);
`,{heihei:"heihei"});

console.log(fn);

fn({data:"data"});
