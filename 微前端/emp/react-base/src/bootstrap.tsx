import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Hello from 'src/components/Hello'
import {log} from '@emp/react-project/helper'
import Hello2 from '@emp/react-project/components/Hello'
log('==============testing!!!!==============================')
ReactDOM.render(
  <>
    <Hello />
    <div style={{backgroundColor: '#eee', padding: '20px'}}>
      <h2>React Project Component: Hello!!!!!</h2>
      <Hello2 compiler={'emp'} framework={'react'} />
    </div>
  </>,
  document.getElementById('emp-root'),
)
