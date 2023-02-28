import * as React from 'react'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'
import './global.css'

const NO_CURRENT_VIEW = '$currentView$'

interface IAppProps{
  components:Record<string, React.FunctionComponent>
}

const App: React.FC<IAppProps> = ({components={}}:IAppProps)=> {
  let currentView = (window as any).currentView
  if(currentView === NO_CURRENT_VIEW) {
    currentView = Object.keys(components)[0]
  }
 const CurrentComponent = components[currentView]
  return (
    <ConfigProvider
      getPopupContainer={(triggerNode) => {
        if (triggerNode) return triggerNode
        return document.body
      }}
    >
      <CurrentComponent />
    </ConfigProvider>
      )
  }

export default App
