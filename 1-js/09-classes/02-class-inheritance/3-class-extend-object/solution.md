Primero, veamos por qué el último código no funciona.

La razón se vuelve obvia si tratamos de ejecutarlo. Un constructor de clase heredado debe llamar a `super()`. De lo contrario, `"this"` no se "definirá".

Así que aquí está la solución:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // necesita llamar al constructor padre al heredar
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // verdadero
```

Pero eso no es todo aún.

Incluso después de la solución, todavía hay una diferencia importante en `"class Rabbit extends Objetc"` versus `class Rabbit`.

Como sabemos, la sintaxis "extends" configura dos prototipos:

1. Entre el `"prototype"` de las funcionalidades del constructor (para métodos).
2. Entre las funcionalidades propias del constructor (para métodos estáticos).

En nuestro caso, para `class Rabbit extends Object` significa::

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) verdadero
alert( Rabbit.__proto__ === Object ); // (2) verdadero
```

Entonces `Rabbit` ahora proporciona acceso a métodos estáticos de `Object` a través de `Rabbit`, como esto:

```js run
class Rabbit extends Object {}

*!*
// normalmente llamamos Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

Pero si no tenemos `extend Object', entonces `Rabbit.__ proto__` no está configurado como `Object`.

Aqui la demostración:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) verdadero
alert( Rabbit.__proto__ === Object ); // (2) falso (!)
alert( Rabbit.__proto__ === Function.prototype ); // como cualquier función por defecto

*!*
// error, no hay tal función en Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

Entonces `Rabbit` no proporciona acceso a métodos estáticos de 'Objeto' en ese caso.

Por cierto, `Function.prototype` tiene métodos de función "genéricos", como `call`, `bind` etc. En última instancia, están disponibles en ambos casos, porque para el constructor incorporado `Object`, `Object.__ proto__ === Function.prototype`.

Aqui está el gráfico:

![](rabbit-extends-object.svg)

Entonces, para resumir, hay dos diferencias:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | necesita llamar a `super()` en el constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
