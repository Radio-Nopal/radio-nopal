import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: '2023-04-19',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlDeImagen(source) {
  return builder.image(source);
}

export function obtenerUrlDePrimeraImagen(arrayDeImagenes) {
  return arrayDeImagenes?.length && arrayDeImagenes?.[0]?.imagen ? urlDeImagen(arrayDeImagenes[0]?.imagen)?.url() : '';
}
