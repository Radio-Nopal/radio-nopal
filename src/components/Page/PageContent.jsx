import React from 'react';
import Loader from '../Loader';
import TextoPortable from '../TextoPortable';
import './Page.scss';

function PageContent({
  contenido, isLoading,
}) {
  return (
    !isLoading ? (
      <div className="mb-8">
        <TextoPortable value={contenido} />
      </div>
    ) : (
      <Loader />
    )
  );
}

export default PageContent;
