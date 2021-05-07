/* eslint-disable no-console */
import './App.global.css';
import React, { useState } from 'react';
import getFilePath from './GetFilePath/getFilePath';
import { downloadDefaultToPath, getTitleAndThumbnail } from './ytd/ytd';

// #TODO Extract long Class names
// #TODO Extract functions into their own files
// #TODO Download Windows youtube-dl binary and support for it
// #TODO Implement Download progress bar
// #TODO Implement choosing resolution
// #TODO Improve function names
// #TODO Add tests
// #TODO Make download button tell you when it can't download
export default function App() {
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('./img/hqdefault.webp');
  // const [resolutionArray, setResolutionArray] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
  const handleOnUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };
  const handleOnURLEnterClick = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setLoadingThumbnail((prevState) => !prevState);
      getTitleAndThumbnail(url)
        .then((obj) => {
          console.log('obj', obj);
          setImageUrl(obj.thumbnailUrl);
          setVideoTitle(obj.title);
          setLoadingThumbnail(false);
          return undefined;
        })
        .catch((err) => console.log('getTitleAndThumbnail error', err));
    }
  };
  const handleOnEnterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!url) return;
    setLoadingThumbnail((prevState) => !prevState);
    getTitleAndThumbnail(url)
      .then((obj) => {
        // console.log(obj);
        setImageUrl(obj.thumbnailUrl);
        setVideoTitle(obj.title);
        setLoadingThumbnail(false);
        return undefined;
      })
      .catch((err) => console.log('getTitleAndThumbnail err', err));
  };
  const handleOnDownloadClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!url) return;
    if (loadingThumbnail) return;
    event.preventDefault();
    getFilePath()
      .then((filePaths) => downloadDefaultToPath(filePaths[0], url))
      .then((output) => console.log('downloadDefaultToPath output', output))
      .catch((error) =>
        console.log('catching error inside getFilePath', error)
      );
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen pt-5 ">
      <div className="flex justify-center w-full mb-5">
        <input
          type="text"
          name="youtubeURL"
          className="w-3/4 h-8 px-3 py-5 mr-2 text-xl text-gray-100 placeholder-gray-400 bg-gray-600 border-2 border-gray-600 shadow-md outline-none hover:border-gray-400 focus:border-gray-200 rounded-xl"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={handleOnUrlChange}
          onKeyPress={handleOnURLEnterClick}
        />
        <button
          type="button"
          className="inline-block h-8 px-3 py-5 text-xl font-medium leading-[0rem] text-gray-200 bg-teal-600 border-2 border-gray-800 rounded-md hover:border-gray-200 hover:text-gray-100 focus:border-gray-200 "
          onClick={handleOnEnterClick}
        >
          Enter
        </button>
      </div>
      <img
        src={imageUrl}
        alt="img"
        className={`max-w-md my-5 shadow-md rounded-xl transition-all ${
          loadingThumbnail ? 'filter blur-sm' : ''
        }`}
      />
      <p
        className={`mb-4 text-xl font-medium text-gray-400 transition-all px-4${
          loadingThumbnail ? 'filter blur-sm' : ''
        }`}
      >
        {videoTitle}
      </p>

      <button
        type="button"
        className="py-2 mt-4 text-xl font-medium text-gray-200 bg-teal-600 border-2 border-gray-800 rounded-md px-9 hover:border-gray-200"
        onClick={handleOnDownloadClick}
      >
        Download
      </button>
    </div>
  );
}
