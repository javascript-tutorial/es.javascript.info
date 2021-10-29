function spy(func) {

  function wrapper(...args) {
    // usamos ...args en lugar de arguments para almacenar un array "real" en wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
