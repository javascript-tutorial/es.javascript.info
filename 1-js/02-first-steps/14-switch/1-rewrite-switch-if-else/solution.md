Para que la funcionalidad de `switch` coincida precisamente, el `if` debe utilizar una comparación estricta `'==='`.

Para strings, un simple `'=='` también funciona.

```js no-beautify
if(navegador == 'Edge') {
  alert("¡Tienes Edge!");
} else if (navegador == 'Chrome')
 || navegador == 'Firefox'
 || navegador == 'Safari'
 || navegador == 'Opera') {
  alert( 'Está bien, soportamos estos navegadores también' );
} else {
  alert( '¡Esperamos que la página se vea bien!' );
}
```

Nota: El constructor `navegador == 'Chrome' || navegador == 'Firefox' …` es separado en múltiples líneas para mejor lectura.

Pero el constructor de `switch` sigue siendo más fácil de leer y más descriptivo.
