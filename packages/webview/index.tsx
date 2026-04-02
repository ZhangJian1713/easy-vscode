import * as React from 'react'
import { render } from 'react-dom'

export * from './src/helpers/callVscode'
import { ColorThemeBridge } from './src/colorTheme'

export {
  ColorThemeBridge,
  useColorThemeKind,
  VscodeColorThemeKind,
  VSCODE_COLOR_THEME_CMD
} from './src/colorTheme'

export type WebviewComponents = Record<string, React.FC>

export interface WebviewRootProps {
  components: WebviewComponents
}

export interface RegisterWebviewOptions {
  /** Root layout (e.g. Ant Design ConfigProvider). Default: mount selected view only. */
  Root?: React.FC<WebviewRootProps>
}

const NO_CURRENT_VIEW = '$currentView$'

const DefaultWebviewRoot: React.FC<WebviewRootProps> = ({ components }) => {
  let currentView = (window as any).currentView
  if (currentView === NO_CURRENT_VIEW) {
    currentView = Object.keys(components)[0]
  }
  const CurrentComponent = components[currentView]
  return CurrentComponent ? <CurrentComponent /> : null
}

export const registerWebview = function (
  webviewComponents: WebviewComponents,
  options?: RegisterWebviewOptions
) {
  const Root = options?.Root ?? DefaultWebviewRoot
  render(
    <ColorThemeBridge>
      <Root components={webviewComponents} />
    </ColorThemeBridge>,
    document.getElementById('root')
  )
}
