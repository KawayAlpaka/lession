import { dd, getName as getNameA, getToday} from "module-a"
import { hello } from "module-a/hello"
import { getAge } from "module-a/lib/age"
import dayjs from "dayjs"

export const getName = () => {
  return 'module-b'
}

console.log(getNameA())
console.log(getAge())
console.log(hello())
console.log(getToday())
console.log('dayjs === dd:',dayjs === dd)


