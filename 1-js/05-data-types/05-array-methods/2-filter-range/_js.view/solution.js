
function filterRange(arr, a, b) {
  // agregamos paréntesis en torno a la expresión para mayor legibilidad
  return arr.filter(item => (a <= item && item <= b));
}