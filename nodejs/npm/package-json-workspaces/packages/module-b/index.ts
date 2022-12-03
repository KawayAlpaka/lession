import { getName as getNameA } from "module-a"

export const getName = () => {
  return 'module-b'
}

console.log(getNameA())