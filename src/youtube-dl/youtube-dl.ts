import ytdl, { videoFormat } from 'ytdl-core';
import React from 'react';
import sanitize from 'sanitize-filename';
import ffmpeg from 'ffmpeg-static';
import childProcess from 'child_process';
// import ffmpeg from 'ffmpeg-static-electron';

type Info = {
  resolutions: videoFormat[];
  title: string;
  thumbnailUrl: string;
};

const getInfo = (url: string): Promise<Info> => {
  return new Promise((resolve, reject) => {
    // console.log(ffmpeg);
    ytdl
      .getInfo(url)
      .then((info) => {
        const resolutions = info.formats.filter(
          (vF) =>
            vF.hasVideo === true &&
            vF.hasAudio === false &&
            vF.container === 'mp4' &&
            vF.colorInfo === undefined
        );
        const { title } = info.videoDetails;
        const thumbnailUrl = info.videoDetails.thumbnails[3].url;
        return resolve({ resolutions, title, thumbnailUrl });
      })
      .catch(reject);
  });
};

const downloadVideo = async (
  vidF: videoFormat,
  url: string,
  path: string,
  setDownloadProgress: React.Dispatch<React.SetStateAction<string>>,
  setDownloaded: React.Dispatch<React.SetStateAction<string>>,
  setEstimatedTime: React.Dispatch<React.SetStateAction<string>>
) => {
  // console.log('path', path);
  const info = await ytdl.getInfo(url);
  const fileName = sanitize(info.videoDetails.title);
  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
    merged: { frame: 0, speed: '0x', fps: 0 },
  };
  // Get audio and video streams
  const audio = ytdl(url, { quality: 'highestaudio' }).on(
    'progress',
    (_, downloaded, total) => {
      tracker.audio = { downloaded, total };
    }
  );
  const video = ytdl(url, { format: vidF }).on(
    'progress',
    (_, downloaded, total) => {
      tracker.video = { downloaded, total };
    }
  );
  try {
    // set ffmpeg path outside app.asar
    const ffmpegPath =
      process.env.NODE_ENV === 'development'
        ? ffmpeg
        : ffmpeg.replace(/app.asar/gm, `app.asar.unpacked`);
    // Start the ffmpeg child process
    const ffmpegProcess = childProcess.spawn(
      ffmpegPath,
      [
        // Remove ffmpeg's console spamming
        '-loglevel',
        '8',
        '-hide_banner',
        // Redirect/Enable progress messages
        '-progress',
        'pipe:3',
        // Set inputs
        '-i',
        'pipe:4',
        '-i',
        'pipe:5',
        // Map audio & video from streams
        '-map',
        '0:a',
        '-map',
        '1:v',
        // Keep encoding
        '-c:v',
        'copy',
        // Define output file
        `${path}${fileName}_${vidF.qualityLabel}.mp4`,
        // Overwrite output file without asking
        '-y',
      ],
      {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit',
          'inherit',
          'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe',
          'pipe',
          'pipe',
        ],
      }
    );
    ffmpegProcess.stdio[3].on('data', () => {
      const percent =
        (tracker.audio.downloaded + tracker.video.downloaded) /
        (tracker.audio.total + tracker.video.total);
      const downloadedMinutes = (Date.now() - tracker.start) / 1000 / 60;
      const estimatedDownloadTime =
        downloadedMinutes / percent - downloadedMinutes;
      setDownloadProgress(`${(percent * 100).toFixed(0)}%`);
      setDownloaded(
        `${(
          (tracker.audio.downloaded + tracker.video.downloaded) /
          1024 /
          1024
        ).toFixed(2)}MB of ${(
          (tracker.audio.total + tracker.video.total) /
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

    ffmpegProcess.on('close', () => {
      console.log('done');
    });
    ffmpegProcess.on('error', (err) => {
      console.log(err);
    });
    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
  } catch (error) {
    console.log(error);
  }
};

export { downloadVideo, getInfo };
