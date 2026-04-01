import * as React from 'react'

export * from './src/helpers/callVscode'

export type WebviewComponents = Record<string, React.FC>

export interface WebviewRootProps {
  components: WebviewComponents
}

export interface RegisterWebviewOptions {
  Root?: React.FC<WebviewRootProps>
}

export declare function registerWebview(
  webviewComponents: WebviewComponents,
  options?: RegisterWebviewOptions
): void
