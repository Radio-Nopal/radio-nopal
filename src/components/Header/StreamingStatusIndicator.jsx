import React, { useContext } from 'react';
import { store } from '../../store';
import './StreamingStatusIndicator.scss';

function StreamingStatusIndicator() {
  const { state } = useContext(store);
  const { streams } = state;

  const isAnyStreamOnline = Object.values(streams).some((stream) => stream.isOnline);

  const backgroundColor = isAnyStreamOnline ? 'bg-red-600' : 'bg-gray-600';
  const textColor = isAnyStreamOnline ? 'text-white' : 'text-black';
  const circleClass = isAnyStreamOnline ? 'blinking fill-white' : 'fill-black';

  return (
    <div className={`flex justify-center items-center md:w-24 w-full select-none text-xs py-3 ${backgroundColor} ${textColor}`}>
      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" className={circleClass} />
      </svg>
      {isAnyStreamOnline ? 'EN VIVO' : 'OFFLINE'}
    </div>
  );
}
export default StreamingStatusIndicator;
