Primero, veamos por qué el código anterior no funciona.

La razón se vuelve evidente si intentamos ejecutarlo. Un constructor de clase heredado tiene que llamar a `super()`. De lo contrario `"this"` no será "definido".

Así que aquí está la solución:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // necesita llamar al constructor padre cuando se hereda
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // verdadero
```

Pero eso no es todo.

Incluso después de arreglarlo, aún existe una diferencia importante en `"class Rabbit extends Object"` versus `class Rabbit`.

Como sabemos, la sintaxis "extends" configura dos prototipos:

1. Entre `"prototype"` de las funciones del constructor (para métodos).
2. Entre las propias funciones del constructor (para métodos estáticos).

En nuestro caso, para `class Rabbit extends Object` significa:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) verdadero
alert( Rabbit.__proto__ === Object ); // (2) verdadero
```

Entonces `Rabbit` ahora proporciona acceso a los métodos estáticos de `Object` a través de `Rabbit`, así:

```js run
class Rabbit extends Object {}

*!*
// normalmente llamamos a Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Pero si no tenemos `extends Object`, entonces `Rabbit.__proto__` no está definido como `Object`.

Aquí está la demostración:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) verdadero
alert( Rabbit.__proto__ === Object ); // (2) falso (!)
alert( Rabbit.__proto__ === Function.prototype ); // como cualquier función por defecto

*!*
// error, no existe esta función en Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Entonces `Rabbit` no proporciona acceso a métodos estáticos de `Object` en este caso.

Por cierto, `Function.prototype` tiene métodos de función "genéricos", como `call`, `bind` etc. Finalmente, están disponibles en ambos casos, por el `Object` que tiene el constructor incorporado `Object.__proto__ === Function.prototype`.

Aquí está la imagen:

![](rabbit-extends-object.svg)

Por lo tanto, en pocas palabras, existen dos diferencias:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | necesita llamar a `super()` en el constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
