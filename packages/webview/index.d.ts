import * as React from 'react'

export * from './src/helpers/callVscode'

export type WebviewComponents = Record<string, React.FC>

export interface WebviewRootProps {
  components: WebviewComponents
}

export interface RegisterWebviewOptions {
  Root?: React.FC<WebviewRootProps>
}

export declare enum VscodeColorThemeKind {
  Light = 1,
  Dark = 2,
  HighContrast = 3,
  HighContrastLight = 4
}

export declare const VSCODE_COLOR_THEME_CMD: string

export declare const ColorThemeBridge: React.FC<{ children: React.ReactNode }>

export declare function useColorThemeKind(): VscodeColorThemeKind

export declare function registerWebview(
  webviewComponents: WebviewComponents,
  options?: RegisterWebviewOptions
): void
