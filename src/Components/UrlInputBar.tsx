import React from 'react';
import ytdl from 'ytdl-core';
import { getInfo } from '../youtube-dl/youtube-dl';

import { useAppDispatch, useAppSelector } from '../data/hooks';
import {
  selectLoadingThumbnail,
  selectUrl,
  selectValidUrl,
  setDownloaded,
  setEstimatedTime,
  setImageUrl,
  setLoadingThumbnail,
  setResolutionArray,
  setUrl,
  setValidUrl,
  setVideoTitle,
} from '../data/slices/app';

interface Props {
  className?: string;
}

const UrlInputBar = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const url = useAppSelector(selectUrl);
  const validUrl = useAppSelector(selectValidUrl);
  const loadingThumbnail = useAppSelector(selectLoadingThumbnail);
  const handleOnUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(event.currentTarget.value));
    dispatch(setValidUrl(ytdl.validateURL(event.currentTarget.value)));
  };
  const handleOnURLEnterClick = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && validUrl) {
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
    }
  };
  return (
    <input
      type="text"
      name="youtubeURL"
      className={`w-3/4 h-8 px-3 py-5 mr-2 text-xl text-gray-100 placeholder-gray-400 bg-gray-600 border-2 ${
        validUrl
          ? 'border-green-600 hover:border-green-400 focus:border-green-200'
          : 'border-red-600 hover:border-red-400 '
      }  shadow-md outline-none rounded-xl ${className}`}
      placeholder="Enter YouTube URL"
      value={url}
      onChange={handleOnUrlChange}
      onKeyPress={handleOnURLEnterClick}
    />
  );
};

UrlInputBar.defaultProps = {
  className: '',
};

export default UrlInputBar;
