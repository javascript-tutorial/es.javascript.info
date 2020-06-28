
# Iteradores y generadores asíncronos

Los iteradores asíncronos nos permiten iterar sobre los datos que vienen de forma asíncrona, en una petición. Como, por ejemplo, cuando descargamos algo por partes a través de una red. Y los generadores asíncronos lo hacen aún más conveniente.

Veamos primero un ejemplo simple, para comprender la sintaxis y luego revisar un caso de uso de la vida real.

## Iteradores asíncronos

Los iteradores asíncronos son similares a los iteradores normales, con algunas diferencias sintácticas.

Un objeto iterable "normal", como se describe en el capítulo <info:iterable>, luce así:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of llama a este método una vez al inicio
*!*
  [Symbol.iterator]() {
*/!*
    // ...devuelve el objeto iterador
    // en adelante, for..of solo funciona con ese objeto,
    // pidiéndole los siguientes valores usando next()
    return {
      current: this.from,
      last: this.to,

      // next() se llama en cada iteración por el buce for..of
*!*
      next() { // (2)
        // debería devolver el valor como un objeto {done:.., value :...}
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

Si es necesario, consulte el [capitulo sobre iterables](info:iterable) para ver más detalles sobre iteradores normales.

Para hacer que el objeto sea iterable asincrónicamente:
1. Necesitamos usar `Symbol.asyncIterator` en lugar de `Symbol.iterator`.
2. `next()` debería devolver una promesa.
3. Para iterar sobre dicho objeto, debemos usar un bucle `for await (let item of iterable)`.

Hagamos un objeto `range` iterable, como el anterior, pero ahora devolverá valores de forma asincrónica, uno por segundo:

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of llama a este método una vez en el comienzo
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...devuelve el objeto iterador:
    // para, for await..of funciona solo con ese objeto,
    // pidiéndole los siguientes valores usando next()
    return {
      current: this.from,
      last: this.to,

      // next() se llama en cada iteración por el bucle for await..of
*!*
      async next() { // (2)
        // debería devolver el valor como un objeto {done:.., value :...}
        // (envuelto automáticamente en una promesa por async)
*/!*

*!*
        // puede usar await inside, y hacer cosas asíncronas:
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

Aquí hay una pequeña hoja de trucos:

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

Eso es natural, ya que espera encontrar `Symbol.iterator`, igual que `for..of` sin `await`. No `Symbol.asyncIterator`.
````

## Generadores asíncronos

Como ya sabemos, Javascript también es compatible con generadores, y son iterables.

Recordemos al generador de secuencias de el capitulo [Generadores](info:generators). Genera una secuencia de valores a partir de `start` hasta `end`:

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

En los generadores normales no podemos usar`await`. Todos los valores deben venir sincrónicamente: no hay lugar para el retraso en `for..of`, ya que es una construcción síncrona.

Pero, ¿qué pasa si necesitamos usar `await` en el cuerpo del generador? Para realizar solicitudes de red, por ejemplo.

No hay problema, solo añádelo con `async`, así:

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
    alert(value); // 1, luego 2, luego 3, luego 4, luego 5
  }

})();
```

Ahora tenemos el generador asíncrono iterable con `for await...of`.

De hecho es muy simple: Agregamos la palabra clave `async`, y el generador ahora puede usar `await` dentro de ella, confiar en promesas y en otras funciones asíncronas.

Técnicamente, otra diferencia de un generador asíncrono es que su método `generator.next()` ahora es asíncrono también, y develve promesas.

En un generador normal usariamos `result = generator.next()` para obtener valores. En un generador asíncrono debemos agregar `await`, así:

```js
result = await generator.next(); // resultado = {value: ..., done: true/false}
```

## Iteradores asíncronos

Como ya sabemos, para que un objeto sea iterable, debems agregarle `Symbol.iterator` .

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

Aquí, un objeto personalizado `range` es iterable, y el generador `*[Symbol.iterator]` implementa la logia para listar valroes.

Si nos gustaría agregar acciones asíncronas en el generador, entonces deberíamos reemplazar `Symbol.iterator` con `Symbol.asyncIterator` asíncrono:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // igual que [Symbol.asyncIterator]: async function*()
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

## Ejemplo de la vida real

Hasta ahora hemos visto ejemplos simples, para obtener una comprensión básica. Ahora revisemos un caso de uso de la vida real.

Hay muchos servicios en línea que entregan datos paginados. Por ejemplo, cuando necesitamos una lista de usuarios, una solicitud devuelve un recuento predefinido (por ejemplo, 100 usuarios): "una página" y proporciona una URL a la página siguiente.

Este patrón es muy común. No se trata de usuarios, sino de cualquier cosa. Por ejemplo, GitHub nos permite recuperar commits de la misma manera paginada:

- Deberíamos realizar una solicitud de URL en el formulario `https://api.github.com/repos/<repo>/commits`.
- Esto responde con un JSON de 30 commits, y también proporciona un `enlace` a la siguiente página en la cabecera.
- Entonces podemos usar ese enlace para la próxima solicitud, para obtener más commits, y así sucesivamente.

Pero nos gustaría tener una API más simple: un objeto iterable con commits, para poder repasarlos así:

```js
let repo = 'javascript-tutorial/en.javascript.info'; // GitHub repositorio para obtener commits desde

for await (let commit of fetchCommits(repo)) {
  // proceso de commit
}
```

Nos gustaría hacer una función `fetchCommits(repo)` que tome commits por nosotros, haciendo solicitudes cuando sea necesario. Y dejar que se preocupe por todas las cosas de paginación. Para nosotros un simple `for await..of`.

Con generadores asíncronos que es bastante fácil de implementar:

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

1. Usamos el método del navegador [fetch](info:fetch) para descargar desde una URL remota. Esto nos permite proporcionar aturorización y otros encabezados si es necesario -- aquí GitHub requiere `User-Agent`.
2. El resultado de la búsqueda se analiza como JSON. De nuevo, esto es un método específico de `fetch`.
3. Deberíamos obteer la siguiente URL de la página del `enlace` en el encabezado de la respuesta. Esto tiene un formato especial, por lo que usamos una expresión regular para eso. La URL de la página siguiente puede verse así `https://api.github.com/repositories/93253246/commits?page=2`. Eso es generado por el propio Github.
4. Luego entregamos todas las confirmaciones recibidas, y cuando finalizan, se activará la siguiente iteración `while(url)` haciendo una solicitud más.

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

Eso es justo lo que queríamos. La mecánica interna de las solicitudes paginadas es invisible desde el exterior. Para nosotros es solo un generador asíncrono que devuelve commits.

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
