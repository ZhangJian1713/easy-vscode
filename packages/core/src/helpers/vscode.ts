import * as vscode from 'vscode';

export async function saveDataToSettingJson(configurationName: string, section: string, data: any, configurationTarget = true): Promise<void> {
  await vscode.workspace.getConfiguration(configurationName).update(section, data, configurationTarget);
}

export function getDataFromSettingJson(configurationName: string, section: string, defaultValue?: any): any {
  return vscode.workspace.getConfiguration(configurationName).get(section, defaultValue);
}
