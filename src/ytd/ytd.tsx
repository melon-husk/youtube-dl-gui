/* eslint-disable no-console */
import { exec } from 'child_process';
import getBinariesDirectoryPath from '../utils/getBinaryPath';

let youtubeDlBin: string;

if (process.platform === 'linux') {
  youtubeDlBin = '/youtube-dl';
} else if (process.platform === 'win32') {
  youtubeDlBin = '\\youtube-dl.exe';
}

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
    let command = '';
    const commandLinux = `${unixBinPath}${youtubeDlBin} ${url} -o '${path}/%(title)s-%(id)s.%(ext)s'`;
    const commandWindows = `${unixBinPath}${youtubeDlBin} ${url} -o "${path}\\%(title)s-%(id)s.%(ext)s"`;
    if (process.platform === 'linux') {
      command = commandLinux;
    } else if (process.platform === 'win32') {
      command = commandWindows;
    }

    exec(command, (_error, stdout) => {
      if (stdout === '') {
        return reject(new Error(`stdout is empty and command was ${command}`));
      }
      return resolve(stdout);
    });
    // spawn('ls').on('message', (message) => resolve(message));
  });
};

const getTitleAndThumbnail = (url: string): Promise<TitleAndThumbnail> => {
  return new Promise((resolve, reject) => {
    const command = `${unixBinPath}${youtubeDlBin} ${url} --get-thumbnail --get-title`;

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
