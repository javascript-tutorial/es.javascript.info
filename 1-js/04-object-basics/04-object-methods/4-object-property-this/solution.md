**Respuesta: un error.**

Pruébalo:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: No se puede leer la propiedad 'name' de undefined
```

<<<<<<< HEAD
Esto es porque las reglas que establecen el `this` no buscan en la definición del objeto. Solamente importa el momento en que se llama.

Aquí el valor de `this` dentro de `makeUser()` es `undefined`, porque es llamado como una función, no como un método con sintaxis de punto.

El valor de `this` es uno para la función entera; bloques de código y objetos literales no lo afectan.
=======
That's because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with "dot" syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Entonces `ref: this` en realidad toma el `this` actual de la función.

<<<<<<< HEAD
Podemos reescribir la función y devolver el mismo `this` con valor `undefined`: 

```js run
function makeUser(){
  return this; // esta vez no hay objeto literal
}

alert( makeUser().name ); // Error: No se puede leer la propiedad 'name' de undefined
```
Como puedes ver el resultado de `alert( makeUser().name )` es el mismo que el resultado de `alert( user.ref.name )` del ejemplo anterior.

Aquí está el caso opuesto:
=======
We can rewrite the function and return the same `this` with `undefined` value: 

```js run
function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
```
As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here's the opposite case:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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
};

let user = makeUser();

alert( user.ref().name ); // John
```

<<<<<<< HEAD
Ahora funciona, porque `user.ref()` es un método. Y el valor de `this` es establecido al del objeto delante del punto `.`.
=======
Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
