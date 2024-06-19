'use client';

import React from 'react';
import SearchResults from '../../../components/pages/SearchResults';

export default function SearchResultsPage({ params }) {
  const { searchTerm } = params;
  const decodedSearchTerm = decodeURIComponent(searchTerm);

  return (

      <SearchResults searchTerm={decodedSearchTerm} />
  );
};
