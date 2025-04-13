
const prizeAmountEle = document.getElementById("prizeAmountEle")
const onceTimeEle = document.getElementById("onceTimeEle")
const planTypeNumEle = document.getElementById("planTypeNumEle")
const planBuyNumEle = document.getElementById("planBuyNumEle")
const planBreakEle = document.getElementById("planBreakEle")
const planBreakNumEle = document.getElementById("planBreakNumEle")
const initAmountEle = document.getElementById("initAmountEle")

document.getElementById("start").addEventListener("click", () => {
  const prizeAmount = Number(prizeAmountEle.value)
  const onceTime = Number(onceTimeEle.value)
  const planTypeNum = Number(planTypeNumEle.value)
  const planBuyNum = Number(planBuyNumEle.value)
  const planBreak = planBreakEle.value
  const planBreakNum = Number(planBreakNumEle.value)
  const initAmount = BigInt(initAmountEle.value)
  const t = confirm(`
    参数确认：
    每注奖励：${prizeAmount.toString()}元
    开奖间隔：${onceTime.toString()}分钟
    每次买数字种类数量：${planTypeNum.toString()}个数字
    每次每个数字下注数量：${planBuyNum.toString()}注
    终止条件：玩到${planBreak}，${planBreakNum.toString()}次
    初始金额：玩到${initAmount.toString()}元
    参数正确？继续模拟？
    `)

  if (!t) {
    return
  }

  // 开始模拟
  let palyTime = 0
  let winTime = 0
  let amount = BigInt(initAmount)
  let bei = 1
  const records = []

  while (true) {
    palyTime++

    if (palyTime > 1000000) {
      // 防止无限循环
      break
    }
    if (planBreak === "一定次数") {
      if (palyTime > planBreakNum) {
        break
      }
    }
    if (planBreak === "一定胜利次数") {
      if (winTime > planBreakNum) {
        break
      }
    }
    if (amount <= 0) {
      break
    }

    const buyNums = genBuyNums(planTypeNum)
    const winNum = random(10)

    const oldAmout = amount
    const costAmount = BigInt(planTypeNum * planBuyNum * bei)

    const isWin = buyNums.includes(winNum)


    const winAmount = BigInt(isWin ? planBuyNum * prizeAmount * bei : 0)
    const newAmount = oldAmout - costAmount + winAmount
    amount = newAmount


    records.push({
      costAmount,
      winAmount,
      oldAmout,
      newAmount,
      buyNums,
      winNum,
      isWin,
      winTime,
      palyTime,
      bei
    })

    if (isWin) {
      winTime++
      bei = 1
    } else {
      bei = bei * 2
    }




  }


  console.log(records)
  let tbStr = ""
  for (const record of records) {
    tbStr += `<tr>
    <td>${record.winTime}</td>
    <td>${record.palyTime}</td>
    <td>${record.buyNums.join(",")}</td>
    <td>${record.winNum}</td>
    <td>${record.isWin ? "是" : "否"}</td>
    <td>${planBuyNum}</td>
    <td>${record.bei}</td>
    <td>${record.oldAmout.toString()}</td>
    <td>${record.costAmount.toString()}</td>
    <td>${record.winAmount.toString()}</td>
    <td>${record.newAmount.toString()}</td>
    </tr>`
  }
  document.getElementById("tbody").innerHTML = tbStr

  const message = `您花费了【${palyTime * onceTime}分钟】的时间，投入了【${initAmount.toString()}元】的成本，最终口袋里有【${amount}元】，净赚【${(amount - initAmount).toString()}元】`

  document.getElementById("message").innerHTML = message

})

const genBuyNums = (count) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const res = []
  for (let i = 0; i < count; i++) {
    const len = nums.length
    const selectNo = random(len)
    const selectNum = nums.splice(selectNo, 1)[0]
    // console.log("selectNum:", selectNum)
    if (typeof selectNum !== "number") {
      i--
    } else {
      res.push(selectNum)
    }
  }
  return res.sort((a, b) => {
    return a > b ? 1 : -1
  })
}

const random = (max) => {
  const r = Number((Math.random() * max).toFixed(0))
  if (r === max) {
    return r - 1
  }
  return r
}