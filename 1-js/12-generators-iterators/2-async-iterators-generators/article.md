
<<<<<<< HEAD
# Iteradores y generadores asíncronos

Los iteradores asíncronos nos permiten iterar sobre los datos que vienen de forma asíncrona, en una petición. Como, por ejemplo, cuando descargamos algo por partes a través de una red. Y los generadores asíncronos lo hacen aún más conveniente.
=======
# Async iteration and generators

Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Veamos primero un ejemplo simple, para comprender la sintaxis y luego revisar un caso de uso de la vida real.

<<<<<<< HEAD
## Iteradores asíncronos

Los iteradores asíncronos son similares a los iteradores normales, con algunas diferencias sintácticas.

Un objeto iterable "normal", como se describe en el capítulo <info:iterable>, luce así:
=======
## Recall iterables

Let's recall the topic about iterables. 

The idea is that we have an object, such as `range` here:
```js
let range = {
  from: 1,
  to: 5
};
```

...And we'd like to use `for..of` loop on it, such as `for(value of range)`, to get values from `1` to `5`.

In other words, we want to add an *iteration ability* to the object.

That can be implemented using a special method with the name `Symbol.iterator`:

- This method is called in by the `for..of` construct when the loop is started, and it should return an object with the `next` method.
- For each iteration, the `next()` method is invoked for the next value.
- The `next()` should return a value in the form `{done: true/false, value:<loop value>}`, where `done:true` means the end of the loop.

Here's an implementation for the iterable `range`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of llama a este método una vez al inicio
=======
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
*!*
  [Symbol.iterator]() { // called once, in the beginning of for..of
*/!*
<<<<<<< HEAD
    // ...devuelve el objeto iterador
    // en adelante, for..of solo funciona con ese objeto,
    // pidiéndole los siguientes valores usando next()
=======
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() se llama en cada iteración por el bucle for..of
*!*
      next() { // (2)
        // debería devolver el valor como un objeto {done:.., value :...}
=======
*!*
      next() { // called every iteration, to get the next value
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
*/!*
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 luego 2, luego 3, luego 4, luego 5
}
```

<<<<<<< HEAD
Si es necesario, consulte el [capitulo sobre iterables](info:iterable) para ver más detalles sobre iteradores normales.

Para hacer que el objeto sea iterable asincrónicamente:
1. Necesitamos usar `Symbol.asyncIterator` en lugar de `Symbol.iterator`.
2. `next()` debería devolver una promesa.
3. Para iterar sobre dicho objeto, debemos usar un bucle `for await (let item of iterable)`.

Hagamos un objeto `range` iterable, como el anterior, pero ahora devolverá valores de forma asincrónica, uno por segundo:
=======
If anything is unclear, please visit the chapter [](info:iterable), it gives all the details about regular iterables.

## Async iterables

Asynchronous iteration is needed when values come asynchronously: after `setTimeout` or another kind of delay. 

The most common case is that the object needs to make a network request to deliver the next value, we'll see a real-life example of it a bit later.

To make an object iterable asynchronously:

1. Use `Symbol.asyncIterator` instead of `Symbol.iterator`.
2. The `next()` method should return a promise (to be fulfilled with the next value).
    - The `async` keyword handles it, we can simply make `async next()`.
3. To iterate over such an object, we should use a `for await (let item of iterable)` loop.
    - Note the `await` word.

As a starting example, let's make an iterable `range` object, similar like the one before, but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for await..of llama a este método una vez en el comienzo
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...devuelve el objeto iterador:
    // para, for await..of funciona solo con ese objeto,
    // pidiéndole los siguientes valores usando next()
=======
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // next() se llama en cada iteración por el bucle for await..of
*!*
      async next() { // (2)
        // debería devolver el valor como un objeto {done:.., value :...}
        // (envuelto automáticamente en una promesa por async)
*/!*

*!*
        // puede usar await inside, y hacer cosas asíncronas:
=======
*!*
      async next() { // (2)
*/!*

*!*
        // note: we can use "await" inside the async next:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
*/!*

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

Como podemos ver, la estructura es similar a un iterador normal:

1. Para hacer que un objeto sea asincrónicamente iterable, debe tener un método `Symbol.asyncIterator` `(1)`.
2. Este método debe devolver el objeto con el método `next()` retornando una promesa `(2)`.
3. El método `next()` no tiene que ser `async`, puede ser un método normal que devuelva una promesa, pero `async` nos permite usar `await`, entonces, es más conveniente. Aquí solo nos demoramos un segundo. `(3)`.
4. Para iterar, nosotros usamos `for await(let value of range)` `(4)`, es decir, agregar "await" y después "for". Llama `range[Symbol.asyncIterator]()` una vez, y luego `next()` para los valores.

<<<<<<< HEAD
Aquí hay una pequeña hoja de trucos:
=======
Here's a small table with the differences:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

|       | Iteradores | Iteradores asíncronos |
|-------|-----------|-----------------|
| Método de objeto para proporcionar el iterador | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` el valor de retorno es              | cualquier valor        | `Promise`  |
| en bucle, usar                          | `for..of`         | `for await..of` |

````warn header="La sintaxis de propagacón o spread (...) no funciona de forma asíncrona"
Las características que requieren iteradores normales y sincrónicos no funcionan con los asincrónicos.

Por ejemplo, una sintaxis de propagación no funciona:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

<<<<<<< HEAD
Eso es natural, ya que espera encontrar `Symbol.iterator`, igual que `for..of` sin `await`. No `Symbol.asyncIterator`.
````

## Generadores asíncronos

Como ya sabemos, Javascript también es compatible con generadores, y son iterables.

Recordemos al generador de secuencias de el capitulo [Generadores](info:generators). Genera una secuencia de valores a partir de `start` hasta `end`:
=======
That's natural, as it expects to find `Symbol.iterator`, not `Symbol.asyncIterator`.

It's also the case for `for..of`: the syntax without `await` needs `Symbol.iterator`.
````

## Recall generators

Now let's recall generators, as they allow to make iteration code much shorter. Most of the time, when we'd like to make an iterable, we'll use generators.

For sheer simplicity, omitting some important stuff, they are "functions that generate (yield) values". They are explained in detail in the chapter [](info:generators).

Generators are labelled with `function*` (note the start) and use `yield` to generate a value, then we can use `for..of` to loop over them.

This example generates a sequence of values from `start` to `end`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, luego 2, luego 3, luego 4, luego 5
}
```

<<<<<<< HEAD
En los generadores normales no podemos usar`await`. Todos los valores deben venir sincrónicamente: no hay lugar para el retraso en `for..of`, ya que es una construcción síncrona.

Pero, ¿qué pasa si necesitamos usar `await` en el cuerpo del generador? Para realizar solicitudes de red, por ejemplo.

No hay problema, solo añádelo con `async`, así:
=======
As we already know, to make an object iterable, we should add `Symbol.iterator` to it.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
*/!*
}
```

A common practice for `Symbol.iterator` is to return a generator, it makes the code shorter, as you can see:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Please see the chapter [](info:generators) if you'd like more details.

In regular generators we can't use `await`. All values must come synchronously, as required by the `for..of` construct.

What if we'd like to generate values asynchronously? From network requests, for instance. 

Let's switch to asynchronous generators to make it possible.

## Async generators (finally)

For most practical applications, when we'd like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend `function*` with `async`. That makes the generator asynchronous.

And then use `for await (...)` to iterate over it, like this:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
<<<<<<< HEAD
    // si, ¡puede usar await!
=======
    // Wow, can use await!
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
<<<<<<< HEAD
    alert(value); // 1, luego 2, luego 3, luego 4, luego 5
=======
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
  }

})();
```

<<<<<<< HEAD
Ahora tenemos el generador asíncrono iterable con `for await...of`.

De hecho es muy simple: Agregamos la palabra clave `async`, y el generador ahora puede usar `await` dentro de ella, confiar en promesas y en otras funciones asíncronas.

Técnicamente, otra diferencia de un generador asíncrono es que su método `generator.next()` ahora es asíncrono también, y devuelve promesas.
=======
As the generator is asynchronous, we can use `await` inside it, rely on promises, perform network requests and so on.

````smart header="Under-the-hood difference"
Technically, if you're an advanced reader who remembers the details about generators, there's an internal difference.

For async generators, the `generator.next()` method is asynchronous, it returns promises.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

En un generador normal usariamos `result = generator.next()` para obtener valores. En un generador asíncrono debemos agregar `await`, así:

```js
result = await generator.next(); // resultado = {value: ..., done: true/false}
```
That's why async generators work with `for await...of`.
````

<<<<<<< HEAD
## Iteradores asíncronos

Como ya sabemos, para que un objeto sea iterable, debemos agregarle `Symbol.iterator` .

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <object con next para hacer el rango iterable>
  }
*/!*
}
```

Una práctica común para `Symbol.iterator` es retornar un generador, en lugar de un objeto simple con `next` como en el ejemplo anterior.

Vamos a recordar un ejemplo del capitulo [Generadores](info:generators):

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // una abreviatura de [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, luego 2, luego 3, luego 4, luego 5
}
```

Aquí, un objeto personalizado `range` es iterable, y el generador `*[Symbol.iterator]` implementa la lógica para listar valores.

Si nos gustaría agregar acciones asíncronas en el generador, entonces deberíamos reemplazar `Symbol.iterator` con `Symbol.asyncIterator` asíncrono:
=======
### Async iterable range

Regular generators can be used as `Symbol.iterator` to make the iteration code shorter.

Similar to that, async generators can be used as `Symbol.asyncIterator` to implement the asynchronous iteration.

For instance, we can make the `range` object generate values asynchronously, once per second, by replacing synchronous `Symbol.iterator` with asynchronous `Symbol.asyncIterator`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
*!*
<<<<<<< HEAD
  async *[Symbol.asyncIterator]() { // igual que [Symbol.asyncIterator]: async function*()
=======
  async *[Symbol.asyncIterator]() {
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // hacer una pausa entre valores, esperar algo
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, luego 2, luego 3, luego 4, luego 5
  }

})();
```

Ahora los valores vienen con retraso de 1 segundo entre ellos.

<<<<<<< HEAD
## Ejemplo de la vida real

Hasta ahora hemos visto ejemplos simples, para obtener una comprensión básica. Ahora revisemos un caso de uso de la vida real.
=======
```smart
Technically, we can add both `Symbol.iterator` and `Symbol.asyncIterator` to the object, so it's both synchronously (`for..of`) and asynchronously (`for await..of`) iterable.

In practice though, that would be an weird thing to do.
```

## Real-life example: paginated data

So far we've seen basic examples, to gain understanding. Now let's review a real-life use case.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Hay muchos servicios en línea que entregan datos paginados. Por ejemplo, cuando necesitamos una lista de usuarios, una solicitud devuelve un recuento predefinido (por ejemplo, 100 usuarios): "una página" y proporciona una URL a la página siguiente.

<<<<<<< HEAD
Este patrón es muy común. No se trata de usuarios, sino de cualquier cosa. Por ejemplo, GitHub nos permite recuperar commits de la misma manera paginada:

- Deberíamos realizar una solicitud de URL en el formulario `https://api.github.com/repos/<repo>/commits`.
- Esto responde con un JSON de 30 commits, y también proporciona un `enlace` a la siguiente página en la cabecera.
- Entonces podemos usar ese enlace para la próxima solicitud, para obtener más commits, y así sucesivamente.

Pero nos gustaría tener una API más simple: un objeto iterable con commits, para poder repasarlos así:

```js
let repo = 'javascript-tutorial/es.javascript.info'; // GitHub repositorio para obtener commits desde

for await (let commit of fetchCommits(repo)) {
  // proceso de commit
}
```

Nos gustaría hacer una función `fetchCommits(repo)` que tome commits por nosotros, haciendo solicitudes cuando sea necesario. Y dejar que se preocupe por todas las cosas de paginación. Para nosotros un simple `for await..of`.

Con generadores asíncronos que es bastante fácil de implementar:
=======
This pattern is very common. It's not about users, but just about anything. 

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

- We should make a request to `fetch` in the form `https://api.github.com/repos/<repo>/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use that link for the next request, to get more commits, and so on.

For our code, we'd like to have a simpler way to get commits.

Let's make a function `fetchCommits(repo)` that gets commits for us, making requests whenever needed. And let it care about all pagination stuff. For us it'll be a simple async iteration `for await..of`.

So the usage will be like this:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Here's such function, implemented as async generator:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
<<<<<<< HEAD
      headers: {'User-Agent': 'Our script'}, // github requiere encabezado de user-agent 
=======
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    });

    const body = await response.json(); // (2) la respuesta es un JSON (array de commits)

    // (3) la URL de la página siguiente está en los encabezados, extráigala
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) concede commits uno por uno, hasta que termine la página
      yield commit;
    }
  }
}
```

<<<<<<< HEAD
1. Usamos el método del navegador [fetch](info:fetch) para descargar desde una URL remota. Esto nos permite proporcionar aturorización y otros encabezados si es necesario -- aquí GitHub requiere `User-Agent`.
2. El resultado de la búsqueda se analiza como JSON. De nuevo, esto es un método específico de `fetch`.
3. Deberíamos obtener la siguiente URL de la página del `enlace` en el encabezado de la respuesta. Esto tiene un formato especial, por lo que usamos una expresión regular para eso. La URL de la página siguiente puede verse así `https://api.github.com/repositories/93253246/commits?page=2`. Eso es generado por el propio Github.
4. Luego entregamos todas las confirmaciones recibidas, y cuando finalizan, se activará la siguiente iteración `while(url)` haciendo una solicitud más.
=======
More explanations about how it works:

1. We use the browser [fetch](info:fetch) method to download the commits.

    - The initial URL is `https://api.github.com/repos/<repo>/commits`, and the next page will be in the `Link` header of the response.
    - The `fetch` method allows us to supply authorization and other headers if needed -- here GitHub requires `User-Agent`.
2. The commits are returned in JSON format.
3. We should get the next page URL from the `Link` header of the response. It has a special format, so we use a regular expression for that.
    - The next page URL may look like `https://api.github.com/repositories/93253246/commits?page=2`. It's generated by GitHub itself.
4. Then we yield the received commits one by one, and when they finish, the next `while(url)` iteration will trigger, making one more request.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Un ejemplo de uso (muestra autores de commit en la consola):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // paremos a los 100 commits
      break;
    }
  }

})();
```

<<<<<<< HEAD
Eso es justo lo que queríamos. La mecánica interna de las solicitudes paginadas es invisible desde el exterior. Para nosotros es solo un generador asíncrono que devuelve commits.
=======
That's just what we wanted. 

The internal mechanics of paginated requests is invisible from the outside. For us it's just an async generator that returns commits.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

## Resumen

Los iteradores y generadores normales funcionan bien con los datos que no llevan tiempo para ser generados.

Cuando esperamos que los datos lleguen de forma asíncrona, con demoras, se pueden usar sus contrapartes asíncronas, y `for await..of` en lugar de `for..of`.

Diferencias sintácticas entre iteradores asíncronos y normales:

|       | Iterador | Iterador asíncrono |
|-------|-----------|-----------------|
| Método para proporcionar un iterador | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` el valor de retorno es          | `{value:…, done: true/false}`         | `Promise` que resuelve como `{value:…, done: true/false}`  |

Diferencias sintácticas entre generadores asíncronos y normales:

|       | Generadores | Generadores asíncronos |
|-------|-----------|-----------------|
| Declaración | `function*` | `async function*` |
| `next()` el velor de retorno es          | `{value:…, done: true/false}`         | `Promise` que resuelve como `{value:…, done: true/false}`  |

En el desarrollo web, a menudo nos encontramos con flujos de datos que fluyen trozo a trozo. Por ejemplo, descargar o cargar un archivo grande.

Podemos usar generadores asíncronos para procesar dichos datos. También es digno de mencionar que en algunos entornos, como en los navegadores, también hay otra API llamada Streams, que proporciona interfaces especiales para trabajar con tales flujos, para transformar los datos y pasarlos de un flujo a otro (por ejemplo, descargar de un lugar e inmediatamente enviar a otra parte).
