import ytdl, { videoFormat } from 'ytdl-core';
import fs from 'fs';
import React from 'react';
import sanitize from 'sanitize-filename';

type Info = {
  resolutions: videoFormat[];
  title: string;
  thumbnailUrl: string;
};

// class YoutubeDl {
//   url: string;

//   videoInfo!: videoInfo;

//   constructor(url: string) {
//     this.url = url;
//   }

//   get info(): Promise<Info> {
//     return new Promise((resolve, reject) => {
//       ytdl
//         .getInfo(this.url)
//         .then((info) => {
//           this.videoInfo = info;
//           const resolutions = ytdl.filterFormats(info.formats, 'videoandaudio');
//           const { title } = info.videoDetails;
//           const thumbnailUrl = info.videoDetails.thumbnails[3].url;
//           return resolve({ resolutions, title, thumbnailUrl });
//         })
//         .catch(reject);
//     });
//   }

//   downloadVideo(
//     vidF: videoFormat,
//     path: string,
//     func: React.Dispatch<React.SetStateAction<string>>
//   ): void {
//     const info = this.videoInfo;
//     const fileName = sanitize(info.videoDetails.title);
//     const video = ytdl(this.url, { format: vidF });
//     // video.on('info', (...args) => console.log(args));
//     video.pipe(fs.createWriteStream(`${path}\\${fileName}.mp4`));
//     video.on('progress', (_chunkLength, downloaded, total) => {
//       const percent = downloaded / total;
//       func(`${(percent * 100).toFixed(0)}%`);
//     });
//   }
// }

const downloadVideo = async (
  vidF: videoFormat,
  url: string,
  path: string,
  setDownloadProgress: React.Dispatch<React.SetStateAction<string>>,
  setDownloaded: React.Dispatch<React.SetStateAction<string>>,
  setEstimatedTime: React.Dispatch<React.SetStateAction<string>>
) => {
  const info = await ytdl.getInfo(url);
  const fileName = sanitize(info.videoDetails.title);
  const video = ytdl(url, { format: vidF });
  let startTime: number;
  video.pipe(fs.createWriteStream(`${path}\\${fileName}.mp4`));
  video.once('response', () => {
    startTime = Date.now();
  });
  video.on('progress', (_chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    const downloadedMinutes = (Date.now() - startTime) / 1000 / 60;
    const estimatedDownloadTime =
      downloadedMinutes / percent - downloadedMinutes;

    setDownloadProgress(`${(percent * 100).toFixed(0)}%`);
    setDownloaded(
      `${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
        total /
        1024 /
        1024
      ).toFixed(2)}MB`
    );
    setEstimatedTime(
      `${estimatedDownloadTime.toFixed(0)} min ${(
        estimatedDownloadTime * 60
      ).toFixed(0)} sec remaining`
    );
  });
};

const getInfo = (url: string): Promise<Info> => {
  return new Promise((resolve, reject) => {
    ytdl
      .getInfo(url)
      .then((info) => {
        const resolutions = ytdl.filterFormats(info.formats, 'videoandaudio');
        const { title } = info.videoDetails;
        const thumbnailUrl = info.videoDetails.thumbnails[3].url;
        return resolve({ resolutions, title, thumbnailUrl });
      })
      .catch(reject);
  });
};

export { downloadVideo, getInfo };
