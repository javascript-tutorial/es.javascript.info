importance: 5

---

#  ¿Cómo encontrar puntos suspensivos "..."?

Escriba una regexp para encontrar puntos suspensivos: 3 (¿o más?) puntos en una fila.

Revísalo:

```js
let regexp = /tu regexp/g;
alert( "Hola!... ¿Cómo vas?.....".match(regexp) ); // ..., .....
```
