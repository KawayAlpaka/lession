if (window.PerformanceObserver) {
  new PerformanceObserver((entryList, ob) => {
    // console.log('entryList:', entryList)
    const entries = entryList.getEntries()
    entries.forEach(entry => {
      // console.log("entry:", entry)
      console.log('time:', entry.startTime, ' url:', entry.url)
    })
  }).observe({ entryTypes: ["largest-contentful-paint"] })
}