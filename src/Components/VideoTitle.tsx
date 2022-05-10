import React from 'react';
import { useAppSelector } from '../data/hooks';
import { selectLoadingThumbnail, selectVideoTitle } from '../data/slices/app';

interface Props {
  className?: string;
}

const VideoTitle = ({ className }: Props) => {
  const loadingThumbnail = useAppSelector(selectLoadingThumbnail);
  const videoTitle = useAppSelector(selectVideoTitle);
  return (
    <p
      className={`mb-4 text-xl font-medium text-gray-400 transition-all px-4${
        loadingThumbnail ? ' filter blur-sm' : ''
      } ${className}`}
    >
      {videoTitle}
    </p>
  );
};

VideoTitle.defaultProps = {
  className: '',
};

export default VideoTitle;
