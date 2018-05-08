module.exports = {
    "extends": "standard",
    rules:{
        indent:["off"],//缩进字符
        semi:["off"],//禁止使用分号
        quotes:["error","double"],//字符串的引号
        "key-spacing":["error"],//强制在对象字面量的属性中键和值之间使用一致的间距
        "no-multi-spaces":["error"],//多余空格要去除
        "no-trailing-spaces":["error"],//行尾不能有空格
        "comma-spacing":["error"],//逗号后面要有空格
        "space-before-function-paren":["error"],//强制在 function的左括号之前使用一致的空格
        "space-before-blocks":["error"]//在一个代码块前要有空格
    },
    parserOptions: {
        ecmaVersion: 8,
    }
};