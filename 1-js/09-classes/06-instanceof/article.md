# Comprobación de clase: "instanceof"

El operador `instanceof` permite verificar si un objeto pertenece a una clase determinada. También tiene en cuenta la herencia.

<<<<<<< HEAD
Tal verificación puede ser necesaria en muchos casos. Aquí lo usaremos para construir una función *polimórfica*, la que trata los argumentos de manera diferente dependiendo de su tipo.
=======
Such a check may be necessary in many cases. Here we'll use it for building a *polymorphic* function, the one that treats arguments differently depending on their type.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

## El operador instanceof [#ref-instanceof]

La sintaxis es:
```js
obj instanceof Class
```
Devuelve `true` si `obj` pertenece a la `Class` o una clase que hereda de ella.

<<<<<<< HEAD
Por ejemplo:
=======
It returns `true` if `obj` belongs to the `Class` or a class inheriting from it.

For instance:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
class Rabbit {}
let rabbit = new Rabbit();

// ¿Es un objeto de la clase Rabbit?
*!*
alert( rabbit instanceof Rabbit ); // verdadero
*/!*
```

También funciona con funciones de constructor:

```js run
*!*
// en lugar de clase
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // verdadero
```

...Y con clases integradas como `Array`:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // verdadero
alert( arr instanceof Object ); // verdadero
```

<<<<<<< HEAD
Tenga en cuenta que `arr` también pertenece a la clase `Object`. Esto se debe a que `Array` hereda prototípicamente de `Object`.

Normalmente, `instanceof` examina la cadena de prototipos para la verificación. También podemos establecer una lógica personalizada en el método estático `Symbol.hasInstance`.

El algoritmo de `obj instanceof Class` funciona más o menos de la siguiente manera:
=======
Please note that `arr` also belongs to the `Object` class. That's because `Array` prototypically inherits from `Object`.

Normally, `instanceof` examines the prototype chain for the check. We can also set a custom logic in the static method `Symbol.hasInstance`.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

1. Si hay un método estático `Symbol.hasInstance`, simplemente llámelo: `Class[Symbol.hasInstance](obj)`. Debería devolver `true` o `false`, y hemos terminado. Así es como podemos personalizar el comportamiento de `instanceof`.

<<<<<<< HEAD
    Por ejemplo:

    ```js run
    // Instalar instancia de verificación que asume que
    // cualquier cosa con propiedad canEat es un animal

=======
1. If there's a static method `Symbol.hasInstance`, then just call it: `Class[Symbol.hasInstance](obj)`. It should return either `true` or `false`, and we're done. That's how we can customize the behavior of `instanceof`.

    For example:

    ```js run
    // setup instanceOf check that assumes that
    // anything with canEat property is an animal
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

<<<<<<< HEAD
    alert(obj instanceof Animal); // verdadero: Animal[Symbol.hasInstance](obj) es llamada
    ```

2. La mayoría de las clases no tienen `Symbol.hasInstance`. En ese caso, se utiliza la lógica estándar: `obj instanceOf Class` comprueba si `Class.prototype` es igual a uno de los prototipos en la cadena de prototipos `obj`.

    En otras palabras, compara uno tras otro:

=======
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
    ```

2. Most classes do not have `Symbol.hasInstance`. In that case, the standard logic is used: `obj instanceOf Class` checks whether `Class.prototype` is equal to one of the prototypes in the `obj` prototype chain.

    In other words, compare one after another:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
<<<<<<< HEAD
    // si alguna respuesta es verdadera, devuelve true
    // de lo contrario, si llegamos al final de la cadena, devuelve false
    ```

    En el ejemplo anterior `rabbit.__ proto__ === Rabbit.prototype`, por lo que da la respuesta de inmediato.

    En el caso de una herencia, la coincidencia será en el segundo paso:
=======
    // if any answer is true, return true
    // otherwise, if we reached the end of the chain, return false
    ```

    In the example above `rabbit.__proto__ === Rabbit.prototype`, so that gives the answer immediately.

    In the case of an inheritance, the match will be at the second step:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // verdadero
    */!*

    // rabbit.__proto__ === Rabbit.prototype
    *!*
<<<<<<< HEAD
    // rabbit.__proto__.__proto__ === Animal.prototype (iguala!)
=======
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
    */!*
    ```

Aquí está la ilustración de lo que `rabbit instanceof Animal` compara con `Animal.prototype`:

![](instanceof.svg)

Por cierto, también hay un método [objA.isPrototypeOf(objB)] (mdn:js/object/isPrototypeOf), que devuelve `true` si `objA` está en algún lugar de la cadena de prototipos para `objB`. Por lo tanto, la prueba de `obj instanceof Class` se puede reformular como `Class.prototype.isPrototypeOf(obj)`.

<<<<<<< HEAD
Es divertido, ¡pero el constructor `Class` en sí mismo no participa en el chequeo! Solo importa la cadena de prototipos y `Class.prototype`.

Eso puede llevar a consecuencias interesantes cuando se cambia una propiedad `prototype` después de crear el objeto.
=======
It's funny, but the `Class` constructor itself does not participate in the check! Only the chain of prototypes and `Class.prototype` matters.

That can lead to interesting consequences when a `prototype` property is changed after the object is created.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

Como aquí:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// cambió el prototipo
Rabbit.prototype = {};

// ...ya no es un conejo!
*!*
alert( rabbit instanceof Rabbit ); // falso
*/!*
```

<<<<<<< HEAD
## Bonificación: Object.prototype.toString para el tipo

Ya sabemos que los objetos simples se convierten en cadenas como `[objetc Objetc]`:
=======
## Bonus: Object.prototype.toString for the type

We already know that plain objects are converted to string as `[object Object]`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // lo mismo
```

Esa es su implementación de `toString`. Pero hay una característica oculta que hace que `toString` sea mucho más poderoso que eso. Podemos usarlo como un `typeof` extendido y una alternativa para `instanceof`.

¿Suena extraño? En efecto. Vamos a desmitificar.

Por esta [especificación](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), el `toString` incorporado puede extraerse del objeto y ejecutarse en el contexto de cualquier otro valor. Y su resultado depende de ese valor.

- Para un número, será `[object Number]`
- Para un booleano, será `[objetc Boolean]`
- Para `null`: `[objetc Null]`
- Para `undefined`: `[objetc Undefined]`
- Para matrices: `[Object Array]`
- ... etc (personalizable).

Demostremos:

```js run
// copie el método toString en una variable a conveniencia
let objectToString = Object.prototype.toString;

// ¿que tipo es este?
let arr = [];

alert( objectToString.call(arr) ); // [object *!*Array*/!*]
```

Aquí usamos [call](mdn:js/function/call) como se describe en el capítulo [](info:call-apply-decorators) para ejecutar la función `objectToString` en el contexto `this=arr`.

Internamente, el algoritmo `toString` examina `this` y devuelve el resultado correspondiente. Más ejemplos:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

El comportamiento del objeto `toString` se puede personalizar utilizando una propiedad de objeto especial `Symbol.toStringTag`.

Por ejemplo:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```
<<<<<<< HEAD
Para la mayoría de los objetos específicos del entorno, existe dicha propiedad. Aquí hay algunos ejemplos específicos del navegador:

```js run
// toStringTag para el objeto y clase específicos del entorno:
alert( window[Symbol.toStringTag]); // ventana
=======

For most environment-specific objects, there is such a property. Here are some browser specific examples:

```js run
// toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

Como puedes ver, el resultado es exactamente `Symbol.toStringTag` (si existe), envuelto en `[object ...]`.

Al final tenemos "typeof con esteroides" que no solo funciona para tipos de datos primitivos, sino también para objetos incorporados e incluso puede personalizarse.

<<<<<<< HEAD
Podemos usar `{}.toString.call` en lugar de `instanceof` para los objetos incorporados cuando deseamos obtener el tipo como una cadena en lugar de solo verificar.
=======
We can use `{}.toString.call` instead of `instanceof` for built-in objects when we want to get the type as a string rather than just to check.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

## Resumen

<<<<<<< HEAD
Resumamos los métodos de verificación de tipos que conocemos:
=======
Let's summarize the type-checking methods that we know:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

|               | trabaja para   |  retorna      |
|---------------|-------------|---------------|
| `typeof`      | primitivos  |  cadena       |
| `{}.toString` | primitivos, objetos incorporados, objetos con `Symbol.toStringTag`   |       cadena |
| `instanceof`  | objetos     |  true/false   |

Como podemos ver, `{}.toString` es técnicamente un `typeof` "más avanzado".

Y el operador `instanceof` realmente brilla cuando estamos trabajando con una jerarquía de clases y queremos verificar si la clase tiene en cuenta la herencia.
