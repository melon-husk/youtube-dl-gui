/* eslint-disable no-console */
import './App.global.css';
import React from 'react';
import Button from './Components/Button';
import UrlInputBar from './Components/UrlInputBar';
import Thumbnail from './Components/Thumbnail';
import VideoTitle from './Components/VideoTitle';
import ChooseResolution from './Components/ChooseResolution';
import DownloadProgressBar from './Components/DownloadProgressBar';
import { getInfo } from './youtube-dl/youtube-dl';
import { useAppDispatch, useAppSelector } from './data/hooks';
import {
  selectDownloadFolderPath,
  selectLoadingThumbnail,
  selectUrl,
  selectValidUrl,
  setDownloaded,
  setEstimatedTime,
  setImageUrl,
  setLoadingThumbnail,
  setResolutionArray,
  setVideoTitle,
} from './data/slices/app';
import openFolderByPath from './Functions/OpenFolderByPath/openFolderByPath';
import DownloadButton from './Components/DownloadButton';

// #TODO Improve function names
// #TODO Add tests

export default function App() {
  const dispatch = useAppDispatch();
  const url = useAppSelector(selectUrl);
  const validUrl = useAppSelector(selectValidUrl);
  const loadingThumbnail = useAppSelector(selectLoadingThumbnail);
  const downloadFolderPath = useAppSelector(selectDownloadFolderPath);

  const handleOnEnterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validUrl) return;
    dispatch(setLoadingThumbnail(!loadingThumbnail));
    dispatch(setDownloaded(''));
    dispatch(setEstimatedTime(''));
    getInfo(url)
      .then((info) => {
        dispatch(setImageUrl(info.thumbnailUrl));
        dispatch(setVideoTitle(info.title));
        dispatch(setResolutionArray(info.resolutions));
        dispatch(setLoadingThumbnail(false));
        return undefined;
      })
      .catch((err) => console.log('getTitleAndThumbnail error', err));
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen pt-5 ">
      <div className="flex justify-center w-full mb-5">
        <UrlInputBar />
        <Button buttonText="Enter" onClick={handleOnEnterClick} />
      </div>
      <Thumbnail />
      <VideoTitle />
      <ChooseResolution />
      <div>
        <DownloadButton />
        <Button
          buttonText="Open Folder"
          onClick={() => {
            openFolderByPath(downloadFolderPath);
            console.log(downloadFolderPath);
          }}
          className="mt-5 ml-1"
        />
      </div>
      <DownloadProgressBar />
    </div>
  );
}
