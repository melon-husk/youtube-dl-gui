import { ipcRenderer } from 'electron';
import constants from '../../utils/constants';
// const electron = require('electron');

type FilePath = [string];

const getFilePath = (): Promise<FilePath> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send(constants.GET_DIRECTORY_PATH);
    ipcRenderer.on(constants.SEND_DIRECTORY_PATH, (_event, args) => {
      if (args.length === 0) reject(new Error('Directory is empty'));
      resolve(args);
      ipcRenderer.removeAllListeners(constants.SEND_DIRECTORY_PATH);
    });
  });
};

export default getFilePath;

// return new Promise((resolve, reject) => {

//   dialog
//     .showOpenDialog({ properties: ['openDirectory'] })
//     .then((output) => resolve(output.filePaths))
//     .catch((error) => reject(error));
// });
