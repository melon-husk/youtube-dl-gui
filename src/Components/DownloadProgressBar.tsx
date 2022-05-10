import React from 'react';
import { useAppSelector } from '../data/hooks';
import {
  selectDownloaded,
  selectDownloadProgress,
  selectEstimatedTime,
} from '../data/slices/app';

interface Props {
  className?: string;
}

const DownloadProgressBar = ({ className }: Props) => {
  const downloadProgress = useAppSelector(selectDownloadProgress);
  const downloaded = useAppSelector(selectDownloaded);
  const estimatedTime = useAppSelector(selectEstimatedTime);
  return (
    <>
      <div
        className={`w-3/4 h-8 mt-5 bg-gray-500 rounded-md shadow ${className}`}
      >
        <div
          className="h-8 text-right transition-all bg-gray-900 rounded-md "
          style={{ width: downloadProgress }}
        >
          <span className="mx-5 text-xl font-medium text-gray-200">
            {downloadProgress}
          </span>
        </div>
      </div>
      <p className="my-1 text-xl font-medium text-gray-300">
        Downloaded: {downloaded}
      </p>
      <p className="text-xl font-medium text-gray-300">
        Estimated Time: {estimatedTime}
      </p>
    </>
  );
};

DownloadProgressBar.defaultProps = {
  className: '',
};

export default DownloadProgressBar;
