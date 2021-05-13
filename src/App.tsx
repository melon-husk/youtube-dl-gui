/* eslint-disable no-console */
import './App.global.css';
import React, { useState } from 'react';
import { videoFormat } from 'ytdl-core';
import Button from './Components/Button';
import UrlInputBar from './Components/UrlInputBar';
import Thumbnail from './Components/Thumbnail';
import VideoTitle from './Components/VideoTitle';
import ChooseResolution from './Components/ChooseResolution';
import DownloadProgressBar from './Components/DownloadProgressBar';
import {
  handleOnDownloadClick,
  handleOnEnterClick,
  handleOnUrlChange,
  handleOnURLEnterClick,
  selectResolution,
} from './Functions/functions';

// #TODO Improve function names
// #TODO Add tests

export default function App() {
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('./img/hqdefault.webp');
  const [resolutionArray, setResolutionArray] = useState<videoFormat[]>([]);
  const [currentResolution, setCurrentResolution] = useState<videoFormat>();
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<string>('0%');
  const [downloaded, setDownloaded] = useState<string>('');
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  return (
    <div className="flex flex-col items-center justify-center w-screen pt-5 ">
      <div className="flex justify-center w-full mb-5">
        <UrlInputBar
          url={url}
          validUrl={validUrl}
          placeholder="Enter YouTube URL"
          onChange={(event) => handleOnUrlChange(event, setUrl, setValidUrl)}
          onKeyPress={(event) =>
            handleOnURLEnterClick(
              event,
              url,
              validUrl,
              setLoadingThumbnail,
              setImageUrl,
              setVideoTitle,
              setResolutionArray,
              setDownloaded,
              setEstimatedTime
            )
          }
        />
        <Button
          buttonText="Enter"
          onClick={(event) =>
            handleOnEnterClick(
              event,
              url,
              validUrl,
              setLoadingThumbnail,
              setImageUrl,
              setVideoTitle,
              setResolutionArray,
              setDownloaded,
              setEstimatedTime
            )
          }
        />
      </div>
      <Thumbnail imageUrl={imageUrl} loadingThumbnail={loadingThumbnail} />
      <VideoTitle loadingThumbnail={loadingThumbnail} videoTitle={videoTitle} />
      <ChooseResolution
        onChange={(event) =>
          selectResolution(event, setCurrentResolution, resolutionArray)
        }
        value={currentResolution}
        resolutionArray={resolutionArray}
      />
      <Button
        buttonText="Download"
        onClick={(event) =>
          handleOnDownloadClick(
            event,
            url,
            validUrl,
            loadingThumbnail,
            currentResolution,
            setDownloadProgress,
            setDownloaded,
            setEstimatedTime
          )
        }
        className="mt-5"
      />
      <DownloadProgressBar
        downloadProgress={downloadProgress}
        downloaded={downloaded}
        estimatedTime={estimatedTime}
      />
    </div>
  );
}
