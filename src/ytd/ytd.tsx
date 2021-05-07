import { exec } from 'child_process';

const unixBinPath = './src/ytd/bin/youtube-dl';

type TitleAndThumbnail = {
  title: string;
  thumbnailUrl: string;
};

const downloadDefaultToPath = (path: string, url: string) => {
  return new Promise((resolve, reject) => {
    const command = `${unixBinPath} ${url} -o '${path}/%(title)s-%(id)s.%(ext)s'`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(error);
      }
      resolve(stdout);
    });
    // spawn('ls').on('message', (message) => resolve(message));
  });
};

const getTitleAndThumbnail = (url: string): Promise<TitleAndThumbnail> => {
  return new Promise((resolve, reject) => {
    const command = `${unixBinPath} ${url} --get-thumbnail --get-title`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(error);
      }
      const temp = stdout.split('\n');
      resolve({ title: temp[0], thumbnailUrl: temp[1] });
    });
  });
};

export { downloadDefaultToPath, getTitleAndThumbnail };
