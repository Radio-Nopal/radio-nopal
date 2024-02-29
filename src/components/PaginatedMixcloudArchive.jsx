import React, { useState } from 'react';

function PaginatedMixcloudArchive({ mixcloudIframeLinks, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mixcloudIframeLinks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mixcloudIframeLinks.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-t">
      <h1 className="text-xl">Archivo de grabaciones</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1rem',
        justifyContent: 'space-evenly',
      }}
      >
        {currentItems.map((link) => (
          <iframe className="mb-4" key={link} title={link} src={link} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button type="button" onClick={prevPage} disabled={currentPage === 1} style={{ color: currentPage === 1 ? 'gray' : 'inherit' }}>Anterior</button>
        <span style={{ margin: '0 10px' }}>
          {currentPage}
          {' '}
          /
          {' '}
          {totalPages}
        </span>
        <button type="button" onClick={nextPage} disabled={currentPage === totalPages} style={{ color: currentPage === totalPages ? 'gray' : 'inherit' }}>Siguiente</button>
      </div>
    </div>
  );
}

export default PaginatedMixcloudArchive;
