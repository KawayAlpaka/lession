// 声明从外部导入的模块类型
declare namespace window {
  export function alert(v: number): void;
  export function prompt(msg?: string, defaultValue?:string): string;
}
declare namespace console {
  export function log(msg: string): void;
}

function _f(x: number): number {
  if (x == 1 || x == 2) {
      return 1;
  }
  return _f(x - 1) + _f(x - 2)
}

export function f(x: number): string {
  // 直接调用 JS 模块 
  let num:number = _f(x);
  // window.alert(num);
  // return num;
  let str:string = window.prompt(`第${x}个数字是:`,`${num}`);
  console.log(str);
  // let num2 = parseFloat(str); //parseFloat 不能直接用
  return str;
}