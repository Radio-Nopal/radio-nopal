import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="text-center w-full">
      <div style={{ width: 'fit-content', margin: 'auto' }}>
        <TailSpin
          type="TailSpin"
          color="#000000"
          height={50}
          width={50}
        />
      </div>
    </div>
  );
}

export default Loader;
