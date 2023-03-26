const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`你叫什么名字?\n`, name => {
  console.log(`你好 ${name}!`)

  readline.question(`你多少岁了?\n`, age => {
    console.log(`你 ${age} 岁`)
    readline.close()
  })
})
