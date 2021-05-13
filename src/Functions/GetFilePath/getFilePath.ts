import { ipcRenderer } from 'electron';
import constants from '../../utils/constants';
// const electron = require('electron');

const getFilePath = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(constants.GET_DIRECTORY_PATH);
    ipcRenderer.on(
      constants.SEND_DIRECTORY_PATH,
      (_event, filePaths: string[]) => {
        if (filePaths.length === 0) reject(new Error('Directory is empty'));
        const { platform } = process;
        if (platform === 'linux' || platform === 'darwin')
          resolve(`${filePaths[0]}/`);
        if (platform === 'win32') resolve(`${filePaths[0]}\\`);
        ipcRenderer.removeAllListeners(constants.SEND_DIRECTORY_PATH);
      }
    );
  });
};

export default getFilePath;
