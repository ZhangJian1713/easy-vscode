import { callVscode } from '@easy_vscode/webview'
import { MESSAGE_CMD } from '../../constants'
import React, { useEffect, useState } from 'react'
import { Space, Tag } from 'antd'

const HelloWorld: React.FC = () => {
  const [files, setFiles] = useState('')
  useEffect(() => {
    callVscode({ cmd: MESSAGE_CMD.LIST_FILES }, (files: string) => {
      setFiles(files)
    })
  })
  return (
    <Space style={{ margin: '20px' }}>
      {files.split('\n').map((fileName) => (
        <Tag>{fileName}</Tag>
      ))}
    </Space>
  )
}

export default HelloWorld
