import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../data/hooks';
import {
  selectCurrentResolution,
  selectResolutionArray,
  setCurrentResolution,
} from '../data/slices/app';

const ChooseResolution = () => {
  const dispatch = useAppDispatch();
  const currentResolution = useAppSelector(selectCurrentResolution);
  const resolutionArray = useAppSelector(selectResolutionArray);
  const selectResolution = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setCurrentResolution(
        resolutionArray.find(
          (resolution) =>
            `${resolution.qualityLabel}` === event.currentTarget.value
        )
      )
    );
  };
  return (
    <select
      onChange={selectResolution}
      value={`${currentResolution?.qualityLabel}`}
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
