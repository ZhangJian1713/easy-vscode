import { getExtensionContext } from ".."

export const update = (key: string, value: any) => {
    if (!getExtensionContext()) {
        console.error('no init extensionContext')
    }
    getExtensionContext().globalState.update(key, value)
}

export const get = (key: string, defaultValue?: any) => {
    if (!getExtensionContext()) {
        console.error('no init extensionContext')
    }
    return getExtensionContext().globalState.get(key, defaultValue)
}

export const keys = (): readonly string[] => {
    if (!getExtensionContext()) {
        console.error('no init extensionContext')
    }
    return getExtensionContext().globalState.keys()
}

