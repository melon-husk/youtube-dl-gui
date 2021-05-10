import React from 'react';

interface Props {
  loadingThumbnail: boolean;
  videoTitle: string;
  className?: string;
}

const VideoTitle = ({ loadingThumbnail, videoTitle, className }: Props) => {
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
