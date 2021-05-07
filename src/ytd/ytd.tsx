/* eslint-disable no-console */
import { exec } from 'child_process';
import getBinariesDirectoryPath from '../utils/getBinaryPath';

let unixBinPath: string;
getBinariesDirectoryPath()
  .then((path) => {
    unixBinPath = path;
    return unixBinPath;
  })
  .catch((error) => console.log('getBinariesDirectoryPath', error));

type TitleAndThumbnail = {
  title: string;
  thumbnailUrl: string;
};

const downloadDefaultToPath = (path: string, url: string) => {
  return new Promise((resolve, reject) => {
    const command = `${unixBinPath}/youtube-dl ${url} -o '${path}/%(title)s-%(id)s.%(ext)s'`;
    exec(command, (_error, stdout) => {
      if (stdout === '') {
        return reject(new Error('Stdout is empty'));
      }
      return resolve(stdout);
    });
    // spawn('ls').on('message', (message) => resolve(message));
  });
};

const getTitleAndThumbnail = (url: string): Promise<TitleAndThumbnail> => {
  return new Promise((resolve, reject) => {
    const command = `${unixBinPath}/youtube-dl ${url} --get-thumbnail --get-title`;

    exec(command, (_error, stdout) => {
      if (stdout === '') {
        return reject(new Error('Stdout is empty'));
      }
      const temp = stdout.split('\n');
      return resolve({ title: temp[0], thumbnailUrl: temp[1] });
    });
  });
};

export { downloadDefaultToPath, getTitleAndThumbnail };
