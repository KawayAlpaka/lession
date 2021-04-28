const fillObject = (source, pattern) => {
	var bianli = (source, pattern) => {
		if (!pattern) {
			return;
		}
		let keys = Object.keys(pattern);
		for (let key of keys) {
			// console.log(key);
			let type = typeof source[key];
			if (type == "undefined" || source[key] == null) {

        if(typeof pattern[key] != "undefined"){
          source[key] = pattern[key];
        }
			} else if (type == "object") {
				if (typeof pattern[key] == "object") {
					bianli(source[key], pattern[key]);
				}
			}
		}
	}
	bianli(source, pattern);
	return source;
}

if(typeof module != "undefined"){
	module.exports = fillObject;
}