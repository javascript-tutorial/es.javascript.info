Para que coincida con la funcionalidad de `switch` exactamente, el `if` debe utilizar una comparación estricta `'==='`.

Pero para strings, un simple `'=='` también funciona.

```js no-beautify
if(navegador == 'Edge') {
  alert("¡Tienes Edge!");
} else if (navegador == 'Chrome'
 || navegador == 'Firefox'
 || navegador == 'Safari'
 || navegador == 'Opera') {
  alert( 'Está bien, soportamos estos navegadores también' );
} else {
  alert( '¡Esperamos que la página se vea bien!' );
}
```

Nota: El constructor `navegador == 'Chrome' || navegador == 'Firefox' …` fue separado en varias líneas para mejor lectura.

Pero el constructor de `switch` sigue siendo más fácil de leer y más descriptivo.
