# Funciones de flecha revisadas

Volvamos a revisar las funciones de flecha.

<<<<<<< HEAD

Las funciones de flecha no son solo una "taquigrafía" para escribir pequeñas cosas. Tienen algunas características muy específicas y útiles.
=======
Arrow functions are not just a "shorthand" for writing small stuff. They have some very specific and useful features.

JavaScript is full of situations where we need to write a small function that's executed somewhere else.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

JavaScript está lleno de situaciones en las que necesitamos escribir una pequeña función que se ejecuta en otro lugar.


Por ejemplo

<<<<<<< HEAD
- `arr.forEach(func)` -- `func` es ejecutado por `forEach` para cada elemento del array.
- `setTimeout(func)` -- `func` es ejecutado por el planificador incorporado.
- ...y muchas más.
=======
And in such functions we usually don't want to leave the current context. That's where arrow functions come in handy.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

Está en el espíritu de JavaScript crear una función y pasarla a algún otro lugar.


Y en tales funciones, por lo general, no queremos abandonar el contexto actual. Ahí es donde las funciones de flecha son útiles.


## Las funciones de flecha no tienen "this"

Como recordamos del capítulo <info:object-methods>, las funciones de flecha no tienen `this`. Si se accede a `this`, se toma el contexto del exterior.

Por ejemplo, podemos usarlo para iterar dentro de un método de objeto:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

Aquí en `forEach`, se utiliza la función de flecha, por lo que `this.title` es exactamente igual que en el método externo `showList`. Es decir: `group.title`.

Si usáramos una función "regular", habría un error:

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

El error se produce porque `forEach` ejecuta funciones con `this = undefined` de forma predeterminada, por lo que se intenta acceder a `undefined.title`.

Eso no afecta las funciones de flecha, porque simplemente no tienen `this`.

```warn header="Las funciones de flecha no pueden ejecutarse con `new`"
No tener `this` naturalmente significa otra limitación: las funciones de flecha no pueden usarse como constructores. No se pueden llamar con `new`.
```

```smart header="Funciones de flecha VS bind"
Hay una sutil diferencia entre una función de flecha `=>` y una función regular llamada con `.bind(this)`:

- `.bind(this)` crea una "versión enlazada" de la función.
- La flecha `=>` no crea ningún enlace. La función simplemente no tiene `this`. La búsqueda de 'this' se realiza exactamente de la misma manera que una búsqueda de variable regular: en el entorno léxico externo.
```

## Las flechas no tienen "argumentos"

Las funciones de flecha tampoco tienen variable `arguments`.

Eso es genial para los decoradores, cuando necesitamos reenviar una llamada con el actual `this` y `argumentos`.

Por ejemplo, `defer (f, ms)` obtiene una función y devuelve un contenedor que retrasa la llamada en `ms` milisegundos:

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John después de 2 segundos
```

Lo mismo sin una función de flecha se vería así:

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

Aquí tuvimos que crear variables adicionales `args` y `ctx` para que la función dentro de `setTimeout` pudiera tomarlas.

## Resumen

Funciones de flecha:


- No tienen `this`
- No tienen argumentos
- No se pueden llamar con `new`
- Tampoco tienen `super`, que aún no hemos estudiado. Lo veremos en el capítulo <info:class-inheritance>

<<<<<<< HEAD
Esto se debe a que están diseñadas para piezas cortas de código que no tienen su propio "contexto", sino que funcionan en el actual. Y realmente brillan en ese caso de uso.

=======
- Do not have `this`
- Do not have `arguments`
- Can't be called with `new`
- They also don't have `super`, but we didn't study it yet. We will on the chapter <info:class-inheritance>

That's because they are meant for short pieces of code that do not have their own "context", but rather work in the current one. And they really shine in that use case.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
