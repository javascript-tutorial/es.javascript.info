La longitud máxima debe ser 'maxlength', por lo que debemos acortarla un poco para dar espacio a los puntos suspensivos.

<<<<<<< HEAD
Tener en cuenta que en realidad hay un único carácter unicode para puntos suspensivos. Eso no son tres puntos.
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
