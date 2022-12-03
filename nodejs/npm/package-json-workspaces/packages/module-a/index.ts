import dayjs from "dayjs"

export const getName = () => {
  return 'module-a'
}

export const getToday = () => {
  return dayjs(Date.now()).format("YYYY-MM-DD")
}

export const dd = dayjs