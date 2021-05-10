import React from 'react';

interface Props {
  className?: string;
  downloadProgress: string;
  downloaded: string;
  estimatedTime: string;
}

const DownloadProgressBar = ({
  downloadProgress,
  downloaded,
  estimatedTime,
  className,
}: Props) => {
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
      <p className="text-xl font-medium text-gray-300">
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
