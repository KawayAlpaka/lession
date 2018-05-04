# 定义  
### px
绝对单位，页面按精确像素展示    
### em
相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。        
当em用在字体大小上时：字体大小=父元素字体大小*em的值    
当em其它地方，如宽高：长度大小=当前元素字体大小*em的值  
### rem
相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。   
### vw、vh、vmin、vmax
viewpoint width，视窗宽度，1vw等于视窗宽度的1%    
viewpoint height，视窗高度，1vh等于视窗高度的1%   
vw和vh中较小的那个    
vw和vh中较大的那个    

### 其他
in:寸   
cm:厘米 
mm:毫米 
pt:point，大约1/72寸    
pc:pica，大约6pt，1/6寸 