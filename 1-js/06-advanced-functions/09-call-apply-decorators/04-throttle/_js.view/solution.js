function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memoriza el último arguments para llamarlos después del enfriamiento
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // de otro modo pasa al estado de enfriamiento
    func.apply(this, arguments);

    isThrottled = true;

    // se prepara para reiniciar isThrottled después del delay
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // si hubo llamadas, savedThis/savedArgs tienen la última
        // llamada recursivas ejecutan la función y establece el enfriamiento de nuevo
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}