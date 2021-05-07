import path from 'path';
import { ipcRenderer } from 'electron';
import constants from './constants';

type AppPath = string;

const getBinariesDirectoryPath = (): Promise<AppPath> => {
  return new Promise((resolve) => {
    let appPath: null | string = null;
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      appPath = path.join('src/ytd');
      const binariesDirectory = path.join(appPath, 'bin');
      resolve(binariesDirectory);
    } else {
      ipcRenderer.send(constants.GET_APP_PATH);
      ipcRenderer.on(constants.SEND_APP_PATH, (_event, args) => {
        appPath = path.join(args, '..');
        const binariesDirectory = path.join(appPath, 'bin');
        resolve(binariesDirectory);
      });
    }
  });
};

export default getBinariesDirectoryPath;
