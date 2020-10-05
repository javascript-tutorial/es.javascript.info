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
<<<<<<< HEAD
    let shooter = function() { // shooter function
      alert( i ); // debería mostrar su número
=======
    let shooter = function() { // create a shooter function,
      alert( i ); // that should show its number
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
    };
    shooters.push(shooter); // and add it to the array
    i++;
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

<<<<<<< HEAD
army[0](); // el tirador número 0 muestra 10
army[5](); //y el número 5 también produce 10...
// ... todos los tiradores muestran 10 en lugar de sus 0, 1, 2, 3 ...
```

¿Por qué todos los tiradores muestran el mismo valor? Arregle el código para que funcionen según lo previsto.
=======
*!*
// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.
*/!*
```

Why do all of the shooters show the same value? 

Fix the code so that they work as intended.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

