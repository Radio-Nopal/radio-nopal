import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/Page';
import PagesList from '../components/PagesList/PagesList';
import ListaDeProgramas from '../components/ListaDeProgramas';
import ListaDePersonas from '../components/ListaDePersonas';

function SearchResults() {
  const { searchTerm } = useParams();
  const datosDePagina = {
    titulo: 'Búsqueda',
    descripcion: `Resultados de la búsqueda: ${searchTerm}`,
  };
  return (
    <Page datosDePagina={datosDePagina}>
      <span className="text-4xl">Programas:</span>
      <ListaDeProgramas searchTerm={searchTerm} />

      <h1 className="text-4xl pt-12">Información:</h1>
      <PagesList searchTerm={searchTerm} />

      <h1 className="text-4xl pt-12">Personas:</h1>
      <ListaDePersonas searchTerm={searchTerm} />
    </Page>
  );
}

export default SearchResults;
