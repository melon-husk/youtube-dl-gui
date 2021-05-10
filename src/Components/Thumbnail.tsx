import React from 'react';

interface Props {
  imageUrl: string;
  className?: string;
  loadingThumbnail: boolean;
}

const Thumbnail = ({ imageUrl, loadingThumbnail, className }: Props) => {
  return (
    <img
      src={imageUrl}
      alt={imageUrl}
      className={`max-w-md my-5 shadow-md rounded-xl transition-all ${
        loadingThumbnail ? 'filter blur-sm' : ''
      } ${className}`}
    />
  );
};

Thumbnail.defaultProps = {
  className: '',
};

export default Thumbnail;
