/* eslint-disable no-console */
import React from 'react';
import ytdl, { videoFormat } from 'ytdl-core';
import getFilePath from './GetFilePath/getFilePath';
import { downloadVideo, getInfo } from '../youtube-dl/youtube-dl';

const handleOnUrlChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUrl: (value: React.SetStateAction<string>) => void,
  setValidUrl: (value: React.SetStateAction<boolean>) => void
) => {
  setUrl(event.currentTarget.value);
  setValidUrl(ytdl.validateURL(event.currentTarget.value));
};
const handleOnURLEnterClick = (
  event: React.KeyboardEvent<HTMLInputElement>,
  url: string,
  validUrl: boolean,
  setLoadingThumbnail: (value: React.SetStateAction<boolean>) => void,
  setImageUrl: (value: React.SetStateAction<string>) => void,
  setVideoTitle: (value: React.SetStateAction<string>) => void,
  setResolutionArray: (value: React.SetStateAction<videoFormat[]>) => void,
  setDownloaded: React.Dispatch<React.SetStateAction<string>>,
  setEstimatedTime: React.Dispatch<React.SetStateAction<string>>
) => {
  if (event.key === 'Enter' && validUrl) {
    setLoadingThumbnail((prevState) => !prevState);
    setDownloaded('');
    setEstimatedTime('');
    getInfo(url)
      .then((info) => {
        setImageUrl(info.thumbnailUrl);
        setVideoTitle(info.title);
        setResolutionArray(info.resolutions);
        setLoadingThumbnail(false);
        return undefined;
      })
      .catch((err) => console.log('getTitleAndThumbnail error', err));
  }
};

const handleOnEnterClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  url: string,
  validUrl: boolean,
  setLoadingThumbnail: (value: React.SetStateAction<boolean>) => void,
  setImageUrl: (value: React.SetStateAction<string>) => void,
  setVideoTitle: (value: React.SetStateAction<string>) => void,
  setResolutionArray: (value: React.SetStateAction<videoFormat[]>) => void,
  setDownloaded: React.Dispatch<React.SetStateAction<string>>,
  setEstimatedTime: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();
  if (!validUrl) return;
  setLoadingThumbnail((prevState) => !prevState);
  setDownloaded('');
  setEstimatedTime('');
  getInfo(url)
    .then((info) => {
      setImageUrl(info.thumbnailUrl);
      setVideoTitle(info.title);
      setResolutionArray(info.resolutions);
      setLoadingThumbnail(false);
      return undefined;
    })
    .catch((err) => console.log('getTitleAndThumbnail error', err));
};
const handleOnDownloadClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  url: string,
  validUrl: boolean,
  loadingThumbnail: boolean,
  currentResolution: videoFormat | undefined,
  setDownloadProgress: React.Dispatch<React.SetStateAction<string>>,
  setDownloaded: React.Dispatch<React.SetStateAction<string>>,
  setEstimatedTime: React.Dispatch<React.SetStateAction<string>>,
  setDownloadFolderPath: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!validUrl) return;
  if (loadingThumbnail) return;
  event.preventDefault();
  setDownloadProgress('0%');
  if (currentResolution !== undefined) {
    getFilePath()
      .then((filePath) => {
        downloadVideo(
          currentResolution,
          url,
          filePath,
          setDownloadProgress,
          setDownloaded,
          setEstimatedTime
        );
        setDownloadFolderPath(filePath);
        return 'success';
      })
      .catch((error) => console.log('getFilePath error', error));
  }
};
const selectResolution = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setCurrentResolution: (
    value: React.SetStateAction<videoFormat | undefined>
  ) => void,
  resolutionArray: videoFormat[]
) => {
  setCurrentResolution(
    resolutionArray.find(
      (resolution) => `${resolution.qualityLabel}` === event.currentTarget.value
    )
  );
};
export {
  handleOnURLEnterClick,
  handleOnEnterClick,
  handleOnUrlChange,
  handleOnDownloadClick,
  selectResolution,
};
