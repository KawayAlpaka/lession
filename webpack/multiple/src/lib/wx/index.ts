export const getName = ()=>{
  const a = {a:""}
  if(a?.a){
    console.log('a.a exist')
  }
  return "alipay"
}

export const add = (a: number, b: number) => {
  return a + b
}