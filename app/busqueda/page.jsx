import React, { Suspense } from 'react';
import SearchResults from '../../components/pages/SearchResults';

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <SearchResults />
    </Suspense>
  );
}
