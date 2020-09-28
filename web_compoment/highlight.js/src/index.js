import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

console.log(hljs);

var highlightedCode = hljs.highlight('javascript', 'var abd = "123"').value;
var highlighted = hljs.highlight('javascript', 'var abd = "123"');

console.log(highlightedCode);
console.log(highlighted);

// 注释
function aa(aa,bb){

}
aa()

const codeShower = document.querySelector("#code-shower");

codeShower.innerHTML = highlightedCode;

var str = "";
var b = true;
var c = 123;

document.querySelector("#code-editor").addEventListener("input",function(){
  highlighted = hljs.highlight('javascript', this.value);
  console.log(highlighted);
  codeShower.innerHTML = highlighted.value.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;");

	var bianli = function(node,parentKind){
		
		if(typeof node == "string"){
      console.log(node);
			//
		}else{
			for(let child of node.children){
				bianli(child,node.kind)
			}
		}
	}
	bianli(highlighted.emitter.rootNode);

  // highlighted.emitter.rootNode.children.forEach((e)=>{
  //   console.log(e);
  // })
},false);
