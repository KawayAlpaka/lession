# dom事件级别   
dom0、dom2、dom3是dom标准的编号 
1、dom0 
2、dom2 
3、dom3 
# dom事件流 
1、捕获阶段： window -> document -> html ->body -> ...  
2、冒泡阶段:  ... -> body -> html -> document-> window  
# Event对象 

# 自定义事件    
Event 不冒泡（还有其他设置）    
CustomEvent 定义CustomEvent时，可以设置其属性，比如是否冒泡 