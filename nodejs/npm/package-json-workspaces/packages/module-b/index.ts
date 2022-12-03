import { getName as getNameA} from "module-a"
import { hello } from "module-a/hello"
import { getAge } from "module-a/lib/age"

export const getName = () => {
  return 'module-b'
}

console.log(getNameA())
console.log(getAge())
console.log(hello())
