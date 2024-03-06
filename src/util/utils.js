export function formatFechasLegacy(fechasLegacy) {
  // Arregla el problema de que a veces el horario está escrito sin espacios entre los |
  return fechasLegacy
    .split('|')
    .map((part) => part.trim()) // Elimina espacios en blanco al principio y al final
    .join(' | ');
}

export function obtenerHorarioConFormato(dias, hora, periodicidad, fechasLegacy) {
  // Si se proporciona fechasLegacy, devolverla
  if (fechasLegacy) {
    return formatFechasLegacy(fechasLegacy);
  }
  // Si se proporcionan dias, hora y periodicidad, devolver la concatenación de ellos
  if (dias && hora && periodicidad) {
    return `${dias} | ${hora} | ${periodicidad}`;
  }

  // Si ninguno de los parámetros es proporcionado, devolver ''
  return '';
}
