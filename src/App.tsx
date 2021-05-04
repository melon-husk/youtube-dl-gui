import React, { useState } from 'react';
import './App.global.css';
import ytdl from 'youtube-dl-exec';
const getResolutionArray = async (url: string) => {
  let resolutionArray = [];
  return ytdl(url, {
    listFormats: true,
  }).then((output) => (resolutionArray = output.split('\n').slice(3, -1)));
};
const getTitleImageUrl = async (url: string) => {
  return ytdl(url, {
    getThumbnail: true,
    getTitle: true,
  }).then((output: string) => output.split('\n'));
};

function App() {
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('./img/hqdefault.webp');
  const [resolutionArray, setResolutionArray] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const handleOnUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const handleOnKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      // ytdl(url, {
      //   getThumbnail: true,
      //   getTitle: true,
      // })
      //   .then((output: string) => {
      //     const com = output.split('\n');
      //     setVideoTitle(com[0]);
      //     setImageUrl(com[1]);
      //     return true;
      //   })
      //   .catch((err) => console.log(err));
      setResolutionArray(await getResolutionArray(url));
      const com = await getTitleImageUrl(url);
      await setVideoTitle(com[0]);
      await setImageUrl(com[1]);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen pt-5 ">
      <input
        type="text"
        name="youtubeURL"
        className="w-3/4 h-8 px-3 py-5 text-xl text-gray-100 placeholder-gray-400 bg-gray-600 border-2 border-gray-600 shadow-md outline-none hover:border-gray-400 focus:border-gray-200 rounded-xl"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={handleOnUrlChange}
        onKeyDown={handleOnKeyDown}
      />
      <img
        src={imageUrl}
        alt="img"
        className="max-w-md my-5 shadow-md rounded-xl"
      />
      <p className="mb-5 text-xl font-medium text-gray-400">{videoTitle}</p>
      <select className="h-8 px-3 text-xl text-gray-400 bg-gray-600 border-2 border-gray-600 appearance-none rounded-xl w-80 hover:border-gray-200 focus:outline-none">
        <option>Choose a resolution</option>
        {resolutionArray.map((item) => (
          <option>{item}</option>
        ))}
      </select>
      <button
        type="button"
        className="py-2 mt-5 text-xl font-medium text-gray-200 bg-teal-600 border-2 border-gray-800 rounded-md px-9 hover:border-gray-200"
      >
        Download
      </button>
    </div>
  );
}

export default App;
