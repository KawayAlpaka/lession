## 为什么 let a 定义的变量，window.a 访问不到 a 却访问得到
结论: let a 定义的变量所在的作用域是一个叫 Script 的作用域中，这个作用域在 Global 与 Local || Block 之间。
其实所有的 js文件，都是在 Script 作用域中运行的。 Script 就类似一个块级作用域。
以上结论来源于自己研究，没有参考其他文档，可能有误

