import React from 'react';

interface Props {
  placeholder: string;
  className?: string;
  url: string;
  validUrl: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
}

const UrlInputBar = ({
  onChange,
  onKeyPress,
  placeholder,
  className,
  url,
  validUrl,
}: Props) => {
  return (
    <input
      type="text"
      name="youtubeURL"
      className={`w-3/4 h-8 px-3 py-5 mr-2 text-xl text-gray-100 placeholder-gray-400 bg-gray-600 border-2 ${
        validUrl
          ? 'border-green-600 hover:border-green-400 focus:border-green-200'
          : 'border-red-600 hover:border-red-400 '
      }  shadow-md outline-none rounded-xl ${className}`}
      placeholder={placeholder}
      value={url}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

UrlInputBar.defaultProps = {
  className: '',
};

export default UrlInputBar;
