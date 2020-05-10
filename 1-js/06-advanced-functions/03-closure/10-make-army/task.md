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
    let shooter = function() { // shooter function
      alert( i ); // debería mostrar su número
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // el tirador número 0 muestra 10
army[5](); //y el número 5 también produce 10...
// ... todos los tiradores muestran 10 en lugar de sus 0, 1, 2, 3 ...
```

¿Por qué todos los tiradores muestran el mismo valor? Arregle el código para que funcionen según lo previsto.
