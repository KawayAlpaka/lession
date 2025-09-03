

const package01 = (capacity, qualities, values) => {
  console.log("--------------")
  console.log(values.join(","))
  console.log(qualities.join(","))
  console.log("--------------")
  const len = qualities.length
  const curs = []
  for (let row = 0; row < len; row++) {
    curs.push([])
  }
  for (let row = 0; row < len; row++) {
    let maxVal = 0
    for (let c = 0; c <= capacity; c++) {

      const q = qualities[row]
      const v = values[row]
      if (row == 0) {
        // 初始化第一行
        if (q <= c) {
          maxVal = v
        }
        curs[row][c] = maxVal
      } else {
        maxVal = curs[row - 1][c]
        if(q <= c){
          // 能装下
          
          // maxVal = Math.max(maxVal,v)

          // 装下后还剩余容量
          const less = c - q
          // 装下后还能再装
          const moreVal = curs[row - 1][less]
          // 装下后，最终能装
          const newVal = v + moreVal
          if(newVal > maxVal){
            maxVal = newVal
          }
        }
        curs[row][c] = maxVal
      }


    }



  }
  console.log(curs[0].map((_,index)=>index).join(","))
  console.log("--------------")
  curs.forEach((r) => {
    console.log(r.join(","))
  })
}

const goods = [
  { value: 5, quality: 2 },
  { value: 10, quality: 5 },
  { value: 3, quality: 1 },
  { value: 6, quality: 4 },
  { value: 3, quality: 3 },
]

const vs = goods.map(g => g.value)
const qs = goods.map(g => g.quality)

package01(6, qs, vs)
