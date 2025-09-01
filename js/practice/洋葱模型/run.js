const Task = require("./Task")

const t = new Task()

t.add(async (next)=>{
  console.log("1 start")
  await next()
  console.log("1 end")
})

t.add(async (next)=>{
  console.log("2 start")
  await next()
  console.log("2 end")
})

t.add(async (next)=>{
  console.log("3 start")
  await next()
  console.log("3 end")
})

t.run()