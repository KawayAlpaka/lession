

const add = () => {
  let index = 0
  const append = () => {
    index++
    const ele = document.createElement("div")
    ele.innerHTML = index
    document.body.append(ele)
  }
  const run = () => {

    requestIdleCallback((d) => {

      while (true) {
        if (index >= 100000) {
          return
        }
        const timeRemaining = d.timeRemaining()
        const didTimeout = d.didTimeout
        console.log(`timeRemaining:${timeRemaining},didTimeout:${didTimeout}`)
        if (timeRemaining > 0) {
          append()
        } else {
          break
        }
      }
      run()

    })
  }
  run()
  // while (index < 100000) {
  //   append()
  // }
}

document.querySelector("#test").addEventListener("click", add)