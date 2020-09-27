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

document.querySelector("#code-editor").addEventListener("input",function(){
  highlighted = hljs.highlight('javascript', this.value);
  console.log(highlighted);
  codeShower.innerHTML = highlighted.value.replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;");
},false);
