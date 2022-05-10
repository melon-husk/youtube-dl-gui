import React from 'react';
import { useAppSelector } from '../data/hooks';
import { selectImageUrl, selectLoadingThumbnail } from '../data/slices/app';

interface Props {
  className?: string;
}

const Thumbnail = ({ className }: Props) => {
  const imageUrl = useAppSelector(selectImageUrl);
  const loadingThumbnail = useAppSelector(selectLoadingThumbnail);

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
