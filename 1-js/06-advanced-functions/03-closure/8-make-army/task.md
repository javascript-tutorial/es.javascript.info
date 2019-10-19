importance: 5

---

# Ejército de funciones

El siguiente código crea un array de `shooters`.

Cada función está destinado a dar como resultado un número. Pero algo está mal...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // función shooter
      alert( i ); // debería enseñar su número
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // el shooter para 0 muestra  10
army[5](); // y el número 5 también muestra 10...
// ... todos los shooter muestran 10 en vez de los suyos 0, 1, 2, 3...
```

¿Por qué todos los shooters muestrán lo mismo? Arregla el código para que funcione como debería.
