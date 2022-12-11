// 点击事件测试
const nodes = document.querySelectorAll('.lcp-real,.lcp-main,.lcp-real-content,.lcp-content,.lcp-content-bg')

nodes.forEach((node) => {
  // console.log(node)
  node.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log("click:", e.target)
  }, false)
})