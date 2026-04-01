import React, { useState } from 'react'
import { callVscode } from '@easy_vscode/webview'
import { MESSAGE_CMD } from '../../constants'
import './style.css'

const DemoPanel: React.FC = () => {
  const [log, setLog] = useState('Click a button to test messaging')

  const onPing = () => {
    callVscode({ cmd: MESSAGE_CMD.PING }, (resp) => {
      setLog(`PING => ${JSON.stringify(resp)}`)
    })
  }

  const onGetInfo = () => {
    callVscode({ cmd: MESSAGE_CMD.GET_EXT_INFO }, (resp) => {
      setLog(`GET_EXT_INFO => ${JSON.stringify(resp)}`)
    })
  }

  return (
    <div className='demo-root'>
      <h2>easy-vscode Webview Demo</h2>
      <p>This page tests extension/webview two-way messaging.</p>
      <div className='actions'>
        <button onClick={onPing}>Send PING</button>
        <button onClick={onGetInfo}>Get Extension Info</button>
      </div>
      <pre className='log'>{log}</pre>
    </div>
  )
}

export default DemoPanel

