declare function my_func(params:any);

// 如果这里导出了,编译器会要求使用my_func时必须导入.
// 如果my_func是外部导入的,这里就不能写导出.如果外部没有导入运行时会报错.
// export default my_func;
