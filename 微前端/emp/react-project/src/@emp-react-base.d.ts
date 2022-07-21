declare module '@emp/react-base/bootstrap' {
  export {}
}
declare module '@emp/react-base/components/Demo' {
  /// <reference types="react" />
  const Demo: () => JSX.Element
  export default Demo
}
declare module '@emp/react-base/components/Hello' {
  /// <reference types="react" />
  import './common.scss'
  import './common.less'
  import './common.css'
  const Hello: () => JSX.Element
  export default Hello
}
declare module '@emp/react-base/configs/index' {
  const _default: {
    riskHost: string
  }
  export default _default
}
declare module '@emp/react-base' {}
declare module '@emp/react-base' {
  import main = require('@emp/react-base')
  export = main
}
