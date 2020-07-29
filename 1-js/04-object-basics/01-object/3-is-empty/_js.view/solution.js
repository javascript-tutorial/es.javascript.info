function isEmpty(obj) {
  for (let key in obj) {
    //  Si el bucle ha comenzado quiere decir que sí hay al menos una propiedad
    return false;
  }
  return true;
}
