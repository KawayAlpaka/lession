import React from 'react'

import Hello from './components/Hello'
import HelloDEMO from '@emp/react-base/components/Demo'
const Hello2 = React.lazy(() => import('@emp/react-base/components/Demo'))
const config = await import('@emp/react-base/configs/index')
const App = () => (
  <>
    <Hello compiler="TypeScript 2" framework="React Project" />
    <div style={{backgroundColor: '#eee', padding: '20px'}}>
      <h2>remote import load one!!</h2>
      <HelloDEMO />
      <h2>remote lazy load</h2>
      <React.Suspense fallback={<div />}>
        <Hello2 />
      </React.Suspense>
      process.env.EMP_ENV:{process.env.EMP_ENV}
      <p>config:{JSON.stringify(config.default)}</p>
    </div>
  </>
)

export default App
