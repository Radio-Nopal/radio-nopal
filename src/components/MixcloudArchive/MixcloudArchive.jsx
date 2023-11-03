import React from 'react';

const MixcloudArchive = ({ data }) => data.map(({ _key, descripcion, link }) => (
  <iframe
    className="mb-2"
    title={descripcion}
    key={_key}
    width="100%"
    height="60"
    src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${link}/`}
    frameBorder="0"
  />
));
export default MixcloudArchive;
