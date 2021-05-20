import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { videoFormat } from 'ytdl-core';

interface Props {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: videoFormat | undefined;
  resolutionArray: videoFormat[];
}

const ChooseResolution = ({ onChange, resolutionArray, value }: Props) => {
  return (
    <select
      onChange={onChange}
      value={`${value?.qualityLabel}`}
      className="h-8 px-3 text-xl text-gray-400 bg-gray-600 border-2 border-gray-600 appearance-none rounded-xl w-80 hover:border-gray-200 focus:outline-none"
    >
      <option>Choose a resolution</option>
      {resolutionArray.map((resolution) => (
        <option
          key={uuidv4()}
          value={`${resolution.qualityLabel}`}
        >{`${resolution.qualityLabel}`}</option>
      ))}
    </select>
  );
};

export default ChooseResolution;
