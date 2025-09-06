

// 利用缓存 + error + 重试机制，消除异步传导性的思路，react中有应用

// 原始方法
// const getName = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("xiaoming")
//     }, 1000)
//   })
// }

// 新方法
let cacheName: string | null = null
const getName = () => {
  if (cacheName) {
    return cacheName
  } else {
    const p = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("xiaoming")
      }, 1000)
    })
    throw p.then((name) => {
      cacheName = name
    })
  }
}

const getUserInfo = () => {
  return {
    name: getName()
  }
}

const main = () => {
  const userInfo = getUserInfo()
  console.log(userInfo)
}


// 配套的调用器
const retry = (fn) => {
  try {
    fn()
  } catch (e) {
    // console.log(e)
    if (e instanceof Promise) {
      e.finally(() => {
        fn()
      })
    }
  }

}

retry(main)