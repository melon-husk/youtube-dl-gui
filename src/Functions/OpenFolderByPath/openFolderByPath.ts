import { ipcRenderer } from 'electron';
import constants from '../../utils/constants';

const openFolderByPath = async (folderPath: string) => {
  if (folderPath === '') return;
  await ipcRenderer.invoke(constants.OPEN_VIDEO_DOWNLOAD_FOLDER, folderPath);
};

export default openFolderByPath;
