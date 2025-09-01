


class Task {
  list=[]
  constructor(){}
  add(fn){
    this.list.push(fn)
  }
  async run(){
    let i = 0
    const next = async ()=>{
      const fn = this.list[i]
      if(fn){
        i++
        await fn(next)
      }
    }
    next()
  }
}

module.exports = Task