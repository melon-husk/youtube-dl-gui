import React from 'react';
import { useAppDispatch, useAppSelector } from '../data/hooks';
import {
  setDownloadProgress,
  setDownloaded,
  setEstimatedTime,
  setDownloadFolderPath,
  selectValidUrl,
  selectCurrentResolution,
  selectLoadingThumbnail,
  selectUrl,
} from '../data/slices/app';
import getFilePath from '../Functions/GetFilePath/getFilePath';
import { downloadVideo } from '../youtube-dl/youtube-dl';
import Button from './Button';

const DownloadButton = () => {
  const dispatch = useAppDispatch();
  const validUrl = useAppSelector(selectValidUrl);
  const loadingThumbnail = useAppSelector(selectLoadingThumbnail);
  const currentResolution = useAppSelector(selectCurrentResolution);
  const url = useAppSelector(selectUrl);

  const handleOnDownloadClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!validUrl) return;
    if (loadingThumbnail) return;
    event.preventDefault();
    dispatch(setDownloadProgress('0%'));
    if (currentResolution !== undefined) {
      getFilePath()
        .then((filePath) => {
          downloadVideo(
            currentResolution,
            url,
            filePath,
            (progress) => dispatch(setDownloadProgress(progress)),
            (downloaded) => dispatch(setDownloaded(downloaded)),
            (estimatedTime) => dispatch(setEstimatedTime(estimatedTime))
          );
          // setDownloadFolderPath(filePath);
          dispatch(setDownloadFolderPath(filePath));
          return 'success';
        })
        .catch((error) => console.log('getFilePath error', error));
    }
  };

  return (
    <Button
      buttonText="Download"
      onClick={handleOnDownloadClick}
      className="mt-5"
    />
  );
};

export default DownloadButton;
