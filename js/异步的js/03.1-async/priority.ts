
async function say1() {
  console.log("1-1")
  await say2()
  console.log("1-2")
}

async function say2() {
  console.log("2-1")
  await say3()
  console.log("2-2")
} 

async function say3() {
  console.log("3-1")
  Promise.resolve().then(()=>{
    console.log("3-2")
  }).then(()=>{
    console.log("3-4")
  })
  console.log("3-3")
}

say1()