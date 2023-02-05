/*
Esto que tiene una sintaxis medio rara con el asterisco es una funcion generadora, que devuelve un 
iterador, y es la manera mas eficiente de trabajar en este tipo de escenarios
*/

export function* range(start, end) {
  yield start;
  if (start === end) return;
  yield* range(start + 1, end);
}
