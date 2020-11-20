**Respuesta: un error.**

Pruébalo:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // Error: No se puede leer la propiedad 'name' de undefined
```

Esto es porque las reglas que establecen el `this` no buscan en la definición del objeto. Solamente importa el momento en que se llama.

Aquí el valor de `this` dentro de `makeUser()` es `undefined`, porque es llamado como una función, no como un método con sintaxis de punto.

El valor de `this` es uno para la función entera; bloques de código y objetos literales no lo afectan.

Entonces `ref: this` en realidad toma el `this` actual de la función.

Podemos reescribir la función y devolver el mismo `this` con valor `undefined`: 

```js run
function makeUser(){
  return this; // esta vez no hay objeto literal
}

alert( makeUser().name ); // Error: No se puede leer la propiedad 'name' de undefined
```
Como puedes ver el resultado de `alert( makeUser().name )` es el mismo que el resultado de `alert( user.ref.name )` del ejemplo anterior.

Aquí está el caso opuesto:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let user = makeUser();

alert( user.ref().name ); // John
```

Ahora funciona, porque `user.ref()` es un método. Y el valor de `this` es establecido al del objeto delante del punto `.`.
