
# Iteradores y generadores asíncronos

Los iteradores asíncronos nos permiten iterar sobre los datos que vienen de forma asíncrona, en una petición. Como, por ejemplo, cuando descargamos algo por partes a través de una red. Y los generadores asíncronos lo hacen aún más conveniente.

Veamos primero un ejemplo simple, para comprender la sintaxis y luego revisar un caso de uso de la vida real.

## Repaso de iterables

Repasemos el tópico acerca de iterables. 

La idea es que tenemos un objeto, tal como `range` aquí:
```js
let range = {
  from: 1,
  to: 5
};
```

...Y queremos usar un bucle `for..of` en él, tal como `for(value of range)`, para obtener valores desde `1` hasta `5`.

En otras palabras, queremos agregar la habilidad de iteración al objeto.

Eso puede ser implementado usando un método especial con el nombre `Symbol.iterator`:

- Este método es llamado por la construcción `for..of` cuando comienza el bucle, y debe devolver un objeto con el método `next`.
- Para cada iteración, el método `next()` es invocado para el siguiente valor.
- El `next()` debe devolver un valor en el formato `{done: true/false, value:<loop value>}`, donde `done:true` significa el fin del bucle.

Aquí hay una implementación de `range` iterable:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.iterator]() { // llamado una vez, en el principio de for..of
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      next() { // llamado en cada iteración, para obtener el siguiente valor
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

Si es necesario, consulte el capitulo [](info:iterable) para ver más detalles sobre iteradores normales.

## Iteradores asíncronos

La iteración asincrónica es necesaria cuando los valores vienen asincrónicamente: después de `setTimeout` u otra clase de retraso.

El caso más común es un objeto que necesita hacer un pedido sobre la red para enviar el siguiente valor, veremos un ejemplo de la vida real algo más adelante.

Para hacer un objeto iterable asincrónicamente:

1. Use `Symbol.asyncIterator` en lugar de `Symbol.iterator`.
2. El método `next()` debe devolver una promesa (a ser cumplida con el siguiente valor).
    - La palabra clave `async` lo maneja, nosotros simplemente hacemos `async next()`.
3. Para iterar sobre tal objeto, debemos usar un bucle `for await (let item of iterable)`.
    - Note la palabra `await`.

Como ejemplo inicial, hagamos iterable un objeto `range` object, similar al anterior, pero ahora devolverá valores asincrónicamente, uno por segundo.

Todo lo que necesitamos hacer es algunos reemplazos en el código de abajo:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      current: this.from,
      last: this.to,

*!*
      async next() { // (2)
*/!*

*!*
        // nota: podemos usar "await" dentro de el async next:
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

Aquí hay una pequeña tabla con las diferencias:

|       | Iteradores | Iteradores asíncronos |
|-------|-----------|-----------------|
| Método de objeto para proporcionar el iterador | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` el valor de retorno es              | cualquier valor        | `Promise`  |
| en bucle, usar                          | `for..of`         | `for await..of` |

````warn header="La sintaxis de propagación o spread (...) no funciona de forma asíncrona"
Las características que requieren iteradores normales y sincrónicos no funcionan con los asincrónicos.

Por ejemplo, una sintaxis de propagación no funciona:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

Eso es natural, ya que espera encontrar `Symbol.iterator`, no `Symbol.asyncIterator`.

También es el caso de `for..of`: la sintaxis sin `await` necesita `Symbol.iterator`.
````

## Repaso de generators

Ahora repasemos generators, que permiten una iteración mucho más corta. La mayoría de las veces, cuando queramos hacer un iterable, usaremos generators.

Para simplicidad, omitiendo cosas importantes, son "funciones que generan (yield) valores". Son explicados en detalle en el capítulo [](info:generators).

Los generators son etiquetados con `function*` (nota el asterisco) y usa `yield` para generar un valor, entonces podemos usar el bucle `for..of` en ellos.

Este ejemplo genera una secuencia de valores desde `start` hasta `end`:

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

Como ya sabemos, para hacer un objeto iterable, debemos agregarle `Symbol.iterator`.

```js
let range = {
  from: 1,
  to: 5,
*!*
  [Symbol.iterator]() {
    return <objeto con next para hacer el range iterable>
  }
*/!*
}
```

Una práctica común para `Symbol.iterator` es devolver un generador, este hace el código más corto como puedes ver:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // forma abreviada de [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, luego 2, luego 3, luego 4, luego 5
}
```

Puedes revisar el capítulo [](info:generators) si quieres más detalles.

En generadores regulares no podemos usar `await`. Todos los valores deben venir sincrónicamente como son requeridos por la construcción `for..of`.

Pero, ¿qué pasa si necesitamos usar `await` en el cuerpo del generador? Para realizar solicitudes de red, por ejemplo.

Cambiemos a generadores asincrónicos para hacerlo posible.

## Generadores asíncronos (finalmente)

Para aplicaciones más prácticas, cuando queremos hacer un objeto que genere una secuencia de valores asincrónicamente, podemos usar un generador asincrónico.

La sintaxis es simple: anteponga `async` a `function*`. Esto hace al generador asincrónico.

Entonce usamos `for await (...)` para iterarlo, como esto:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // si, ¡puede usar await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, luego 2, luego 3, luego 4, luego 5 (con retraso entre ellos)
  }

})();
```

Como el generador es asincrónico, podemos usar `await` dentro de él, contar con promesas, hacer solicitudes de red y así.

````smart header="Diferencia bajo la capa"
Técnicamente, si eres un lector avanzado que recuerda los detalles de los generadores, hay una diferencia interna.

En los generadores asincrónicos, el método `generator.next()` es asincrónico, devuelve promesas.

En un generador normal usaríamos `result = generator.next()` para obtener valores. En un generador asíncrono debemos agregar `await`, así:

```js
result = await generator.next(); // resultado = {value: ..., done: true/false}
```
Por ello los generadores async funcionan con `for await...of`.
````

### Range asincrónico iterable

Generadores regulares pueden ser usados como `Symbol.iterator` para hacer la iteración más corta.

Similarmente los generadores async pueden ser usados como `Symbol.asyncIterator` para implementar iteración asincrónica.

Por ejemplo, podemos hacer que el objeto `range` genere valores asincrónicamente, una vez por segundo, reemplazando el `Symbol.iterator` sincrónico con el asincrónico `Symbol.asyncIterator`:

```js run
let range = {
  from: 1,
  to: 5,

  // esta línea es la misma que [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() { 
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

```smart
Técnicamente podemos agregar al objeto ambos, `Symbol.iterator` y `Symbol.asyncIterator`, así será ambas cosas: sincrónicamente (`for..of`) y asincrónicamente (`for await..of`) iterables.

Aunque en la práctica es una cosa extraña para hacer.
```

## Ejemplo de la vida real: datos paginados

Hasta ahora hemos visto ejemplos simples, para obtener una comprensión básica. Ahora revisemos un caso de uso de la vida real.

Hay muchos servicios en línea que entregan datos paginados. Por ejemplo, cuando necesitamos una lista de usuarios, una solicitud devuelve un recuento predefinido (por ejemplo, 100 usuarios): "una página" y proporciona una URL a la página siguiente.

Este patrón es muy común. No se trata de usuarios, sino de cualquier cosa. 

Por ejemplo, GitHub nos permite recuperar commits de la misma manera paginada:

- Deberíamos realizar una solicitud de URL en el formulario `https://api.github.com/repos/<repo>/commits`.
- Esto responde con un JSON de 30 commits, y también proporciona un `enlace` a la siguiente página en la cabecera.
- Entonces podemos usar ese enlace para la próxima solicitud, para obtener más commits, y así sucesivamente.

Para nuestro código querríamos una manera más simple de obtener commits.

Hagamos una función `fetchCommits(repo)` que tome commits por nosotros, haciendo solicitudes cuando sea necesario. Y dejar que se preocupe por todas las cosas de paginación. Para nosotros un simple `for await..of`.

Su uso será como esto:

```js
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
```

Esta es la función implementada con generadores asíncronos:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github requiere encabezado de user-agent 
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

Explayando más sobre cómo funciona:

1. Usamos el método del navegador [fetch](info:fetch) para descargar los commits.

    - La URL inicial es `https://api.github.com/repos/<repo>/commits`, y la siguiente página estará en la cabecera de `Link` de la respuesta.
    - El método `fetch` nos permite suministrar autorización y otras cabeceras si lo necesitamos, aquí GitHub requiere `User-Agent`.
2. Los commits son devueltos en formato JSON.
3. Deberíamos obtener la siguiente URL de la página del `enlace` en el encabezado de la respuesta. Esto tiene un formato especial, por lo que usamos una expresión regular para eso (aprenderemos esta característica en [Regular expressions](info:regular-expressions)). 
    - La URL de la página siguiente puede verse así `https://api.github.com/repositories/93253246/commits?page=2`. Eso es generado por el propio Github.
4. Luego entregamos uno por uno todos los "commit" recibidos y, cuando finalizan, se activará la siguiente iteración `while(url)` haciendo una solicitud más.

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

// Nota: Si ejecutas este código en una caja de pruebas externa, necesitas copiar aquí la función fetchCommits descrita más arriba 
```

Eso es justo lo que queríamos. 

La mecánica interna de las solicitudes paginadas es invisible desde el exterior. Para nosotros es solo un generador asíncrono que devuelve commits.

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
| `next()` el valor de retorno es          | `{value:…, done: true/false}`         | `Promise` que resuelve como `{value:…, done: true/false}`  |

En el desarrollo web, a menudo nos encontramos con flujos de datos que fluyen trozo a trozo. Por ejemplo, descargar o cargar un archivo grande.

Podemos usar generadores asíncronos para procesar dichos datos. También es digno de mencionar que en algunos entornos, como en los navegadores, también hay otra API llamada Streams, que proporciona interfaces especiales para trabajar con tales flujos, para transformar los datos y pasarlos de un flujo a otro (por ejemplo, descargar de un lugar e inmediatamente enviar a otra parte).
