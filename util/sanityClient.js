import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-04-19',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlDeImagen(source) {
  return builder.image(source);
}

export function obtenerUrlDePrimeraImagen(arrayDeImagenes) {
  return arrayDeImagenes?.length ? urlDeImagen(arrayDeImagenes[0]?.imagen)?.url() : '';
}
