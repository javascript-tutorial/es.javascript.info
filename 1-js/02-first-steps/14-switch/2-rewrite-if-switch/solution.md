Las primeras dos validaciones se vuelven dos `case`. La tercera validación se separa en dos `case`:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Nota: El `break` al final no es requerido. Pero lo agregamos por previsión, para preparar el código para el futuro.

Existe una probabilidad de que en el futuro queramos agregar un `case` adicional, por ejemplo `case 4`. Y si olvidamos agregar un break antes, al final de `case 3`, habrá un error. Por tanto, es una forma de auto-asegurarse.
