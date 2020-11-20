importance: 5

---

# Ejército de funciones

El siguiente código crea una serie de `shooters`.

Cada función está destinada a generar su número. Pero algo anda mal ...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // crea la función shooter
      alert( i ); // debería mostrar su número
    };
    shooters.push(shooter); // y agregarlo al array
    i++;
  }

  // ...y  devolver el array de tiradores
  return shooters;
}

let army = makeArmy();

*!*
// ... todos los tiradores muestran 10 en lugar de sus 0, 1, 2, 3 ...
army[0](); // 10 del tirador número 0
army[1](); // 10 del tirador número 1
army[2](); // 10 ...y así sucesivamente.
*/!*
```

¿Por qué todos los tiradores muestran el mismo valor? 

Arregle el código para que funcionen según lo previsto.

