import * as React from 'react'

/** Aligned with `vscode.ColorThemeKind` (numeric values are stable). */
export enum VscodeColorThemeKind {
  Light = 1,
  Dark = 2,
  HighContrast = 3,
  HighContrastLight = 4
}

/** Must match `BUILTIN_MESSAGE_CMD.COLOR_THEME` in `@easy_vscode/core`. */
export const VSCODE_COLOR_THEME_CMD = 'vscodeColorTheme'

function readInitialKind(): VscodeColorThemeKind {
  const v = (window as unknown as { vscodeEnv?: { colorThemeKind?: number } }).vscodeEnv?.colorThemeKind
  if (typeof v === 'number' && v >= 1 && v <= 4) {
    return v as VscodeColorThemeKind
  }
  if (typeof document !== 'undefined' && document.body) {
    if (document.body.classList.contains('vscode-dark')) return VscodeColorThemeKind.Dark
    if (document.body.classList.contains('vscode-light')) return VscodeColorThemeKind.Light
  }
  return VscodeColorThemeKind.Dark
}

const ColorThemeContext = React.createContext<VscodeColorThemeKind>(readInitialKind())

export const useColorThemeKind = (): VscodeColorThemeKind => React.useContext(ColorThemeContext)

export const ColorThemeBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kind, setKind] = React.useState(readInitialKind)

  React.useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data
      if (d?.cmd === VSCODE_COLOR_THEME_CMD && typeof d.data?.kind === 'number') {
        setKind(d.data.kind as VscodeColorThemeKind)
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  return <ColorThemeContext.Provider value={kind}>{children}</ColorThemeContext.Provider>
}
