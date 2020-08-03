
# Encadenamiento de promesas

<<<<<<< HEAD
Volvamos al problema mencionado en el capítulo <info:callbacks>: tenemos una secuencia de tareas asincrónicas que se realizarán una tras otra, por ejemplo, cargar scripts. ¿Cómo podemos codificarlo bien?
=======
Let's return to the problem mentioned in the chapter <info:callbacks>: we have a sequence of asynchronous tasks to be performed one after another — for instance, loading scripts. How can we code it well?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Las promesas proporcionan un par de maneras para hacer eso.

En este capítulo cubrimos el encadenamiento de promesas.

Se parece a esto:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

La idea es que el resultado pase a través de la cadena de controladores `.then`.

Aquí el flujo es:
1. La promesa inicial se resuelve en 1 segundo `(*)`,
2. Entonces se llama el controlador `.then`  `(**) `.
3. El valor que devuelve se pasa al siguiente controlador `.then` `(***)`
4. ...y así.

A medida que el resultado se pasa a lo largo de la cadena de controladores, podemos ver una secuencia de llamadas de alerta: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

Todo funciona, porque una llamada a `promise.then` devuelve una promesa, para que podamos llamar al siguiente `.then`.

Cuando un controlador devuelve un valor, se convierte en el resultado de esa promesa, por lo que se llama al siguiente `.then`.

<<<<<<< HEAD
**Un error clásico de novato: técnicamente también podemos agregar muchos '.then' a una sola promesa. Esto no está encadenando.**

Por ejemplo:

=======
**A classic newbie error: technically we can also add many `.then` to a single promise. This is not chaining.**

For example:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
Lo que hicimos aquí fue varios controladores para una sola promesa. No se pasan el resultado el uno al otro; en su lugar lo procesan de forma independiente.
=======
What we did here is just several handlers to one promise. They don't pass the result to each other; instead they process it independently.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Aquí está la imagen (compárala con el encadenamiento anterior):

![](promise-then-many.svg)

Todos los '.then' en la misma promesa obtienen el mismo resultado: el resultado de esa promesa. Entonces, en el código sobre todo `alert` muestra lo mismo: `1`.

En la práctica, rara vez necesitamos múltiples manejadores para una promesa. El encadenamiento se usa mucho más a menudo.

## Retornando promesas

<<<<<<< HEAD
Un controlador, utilizado en `.then(handler)` puede crear y devolver una promesa.

En ese caso, otros manejadores esperan hasta que se estabilice y luego obtienen su resultado.
=======
A handler, used in `.then(handler)` may create and return a promise.

In that case further handlers wait until it settles, and then get its result.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Por ejemplo:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
Aquí el primer `.then` muestra `1` y devuelve `new Promise(...)` en la línea `(*)`. Después de un segundo, se resuelve, y el resultado (el argumento de `resolve`, aquí es `result * 2`) se pasa al controlador del segundo `.then`. Ese controlador está en la línea `(**)`, muestra `2` y hace lo mismo.

Por lo tanto, la salida es la misma que en el ejemplo anterior: 1 -> 2 -> 4, pero ahora con 1 segundo de retraso entre las llamadas de alerta.
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.

So the output is the same as in the previous example: 1 -> 2 -> 4, but now with 1 second delay between `alert` calls.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Devolver las promesas nos permite construir cadenas de acciones asincrónicas.

## El ejemplo: loadScript

<<<<<<< HEAD
Usemos esta función con el `loadScript` prometido, definido en el [capítulo anterior](info:promise-basics#loadscript), para cargar los scripts uno por uno, en secuencia:
=======
Let's use this feature with the promisified `loadScript`, defined in the [previous chapter](info:promise-basics#loadscript), to load scripts one by one, in sequence:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // usar funciones declaradas en scripts
    // para mostrar que efectivamente cargaron
    one();
    two();
    three();
  });
```

Este código se puede acortar un poco con las funciones de flecha:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // los scripts se cargan, podemos usar funciones declaradas allí
    one();
    two();
    three();
  });
```


Aquí cada llamada a `loadScript` devuelve una promesa, y el siguiente `.then` se ejecuta cuando se resuelve. Luego inicia la carga del siguiente script. Entonces los scripts se cargan uno tras otro.

<<<<<<< HEAD
Podemos agregar más acciones asincrónicas a la cadena. Tenga en cuenta que el código sigue siendo "plano": crece hacia abajo, no a la derecha. No hay signos de la "pirámide del destino".

Técnicamente, podríamos agregar `.then` directamente a cada `loadScript`, así:
=======
We can add more asynchronous actions to the chain. Please note that the code is still "flat" — it grows down, not to the right. There are no signs of the "pyramid of doom".

Technically, we could add `.then` directly to each `loadScript`, like this:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // esta función tiene acceso a las variables script1, script2 y script3
      one();
      two();
      three();
    });
  });
});
```

Este código hace lo mismo: carga 3 scripts en secuencia. Pero "crece hacia la derecha". Entonces tenemos el mismo problema que con los callbacks.

Las personas que comienzan a usar promesas a veces no saben de encadenamiento, por lo que lo escriben de esta manera. En general, se prefiere el encadenamiento.

A veces está bien escribir `.then` directamente, porque la función anidada tiene acceso al ámbito externo. En el ejemplo anterior, el callback más anidado tiene acceso a todas las variables `script1`, `script2`, `script3`. Pero eso es una excepción más que una regla.

<<<<<<< HEAD
````smart header="Objetos Thenables"
Para ser precisos, un controlador puede devolver no exactamente una promesa, sino un objeto llamado "thenable", un objeto arbitrario que tiene un método `.then`. Será tratado de la misma manera que una promesa.

La idea es que las librerias de terceros puedan implementar sus propios objetos "compatibles con la promesa". Pueden tener un conjunto extendido de métodos, pero también pueden ser compatibles con las promesas nativas, porque implementan `.then`.

Aquí hay un ejemplo de un objeto que se puede guardar:
=======
````smart header="Thenables"
To be precise, a handler may return not exactly a promise, but a so-called "thenable" object - an arbitrary object that has a method `.then`. It will be treated the same way as a promise.

The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own. They can have an extended set of methods, but also be compatible with native promises, because they implement `.then`.

Here's an example of a thenable object:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { código nativo }
    // resolve con this.num*2 después de 1 segundo
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // muestra 2 después de 1000 ms
```

<<<<<<< HEAD
JavaScript comprueba el objeto devuelto por el controlador `.then` en la línea `(*)`: si tiene un método invocable llamado `then`, entonces llama a ese método que proporciona funciones nativas `resolve`, `accept` como argumentos (similar a un ejecutor) y espera hasta que se llame a uno de ellos. En el ejemplo anterior, se llama a `resolve(2)` después de 1 segundo `(**)`. Luego, el resultado se pasa más abajo en la cadena.

Esta característica nos permite integrar objetos personalizados con cadenas de promesa sin tener que heredar de `Promise`.
=======
JavaScript checks the object returned by the `.then` handler in line `(*)`: if it has a callable method named `then`, then it calls that method providing native functions `resolve`, `reject` as arguments (similar to an executor) and waits until one of them is called. In the example above `resolve(2)` is called after 1 second `(**)`. Then the result is passed further down the chain.

This feature allows us to integrate custom objects with promise chains without having to inherit from `Promise`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
````


## Ejemplo más grande: fetch

En la interfaz de programación, las promesas a menudo se usan para solicitudes de red. Así que veamos un ejemplo extendido de eso.

<<<<<<< HEAD
Utilizaremos el método [fetch](info:fetch) para cargar la información sobre el usuario desde el servidor remoto. Tiene muchos parámetros opcionales cubiertos en [capítulos separados](info:fetch), pero la sintaxis básica es bastante simple:
=======
We'll use the [fetch](info:fetch) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](info:fetch), but the basic syntax is quite simple:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js
let promise = fetch(url);
```

Esto hace una solicitud de red a la `url` y devuelve una promesa. La promesa se resuelve con un objeto 'response' cuando el servidor remoto responde con encabezados, pero  *antes de que se descargue la respuesta completa*.

<<<<<<< HEAD
Para leer la respuesta completa, debemos llamar al método `response.text()`: devuelve una promesa que se resuelve cuando se descarga el texto completo del servidor remoto, con ese texto como resultado.
=======
To read the full response, we should call the method `response.text()`: it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

El siguiente código hace una solicitud a `user.json` y carga su texto desde el servidor:

```js run
fetch('/article/promise-chaining/user.json')
  // .a continuación, se ejecuta cuando el servidor remoto responde
  .then(function(response) {
<<<<<<< HEAD
    // response.text() devuelve una nueva promesa que se resuelve con el texto de respuesta completo
    // cuando se carga
    return response.text();
  })
  .then(function(text) {
    // ...y aquí está el contenido del archivo remoto
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

El objeto `response` devuelto por `fetch` también incluye el método `response.json()` que lee los datos remotos y los analiza como JSON. En nuestro caso, eso es aún más conveniente, así que pasemos a ello.
=======
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
```

The `response` object returned from `fetch` also includes the method `response.json()` that reads the remote data and parses it as JSON. In our case that's even more convenient, so let's switch to it.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

También usaremos las funciones de flecha por brevedad:

```js run
// igual que el anterior, pero response.json() analiza el contenido remoto como JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
<<<<<<< HEAD
  .then(user => alert(user.name)); // iliakan, tengo nombre de usuario
=======
  .then(user => alert(user.name)); // iliakan, got user name
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```

Ahora hagamos algo con el usuario cargado.

<<<<<<< HEAD
Por ejemplo, podemos hacer una solicitud más a GitHub, cargar el perfil de usuario y mostrar el avatar:
=======
For instance, we can make one more requests to GitHub, load the user profile and show the avatar:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
// Hacer una solicitud para user.json
fetch('/article/promise-chaining/user.json')
  // Cárgalo como json
  .then(response => response.json())
<<<<<<< HEAD
  // Hacer una solicitud a GitHub
=======
  // Make a request to GitHub
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Carga la respuesta como json
  .then(response => response.json())
  // Mostrar la imagen de avatar (githubUser.avatar_url) durante 3 segundos (tal vez animarla)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

<<<<<<< HEAD
El código funciona; ver comentarios sobre los detalles. Sin embargo, hay un problema potencial, un error típico para aquellos que comienzan a usar promesas.
=======
The code works; see comments about the details. However, there's a potential problem in it, a typical error for those who begin to use promises.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Mire la línea `(*)`: ¿cómo podemos hacer algo *después de* que el avatar haya terminado de mostrarse y se elimine? Por ejemplo, nos gustaría mostrar un formulario para editar ese usuario u otra cosa. A partir de ahora, no hay manera.

Para que la cadena sea extensible, debemos devolver una promesa que se resuelva cuando el avatar termine de mostrarse.

Como este:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // se dispara después de 3 segundos
  .then(githubUser => alert(`Terminado de mostrar ${githubUser.name}`));
```

<<<<<<< HEAD
Es decir, el controlador `.then` en la línea `(*)` ahora devuelve `new Promise`, que se resuelve solo después de la llamada de `resolve(githubUser)` en `setTimeout` `(**)`. El siguiente '.then' en la cadena esperará eso.

Como buena práctica, una acción asincrónica siempre debe devolver una promesa. Eso hace posible planificar acciones posteriores; incluso si no planeamos extender la cadena ahora, es posible que la necesitemos más adelante.
=======
That is, the `.then` handler in line `(*)` now returns `new Promise`, that becomes settled only after the call of `resolve(githubUser)` in `setTimeout` `(**)`. The next `.then` in the chain will wait for that.

As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don't plan to extend the chain now, we may need it later.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Finalmente, podemos dividir el código en funciones reutilizables:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Úsalos:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

## Resumen

Si un controlador `.then` (o `catch/finally`, no importa) devuelve una promesa, el resto de la cadena espera hasta que se asiente. Cuando lo hace, su resultado (o error) se pasa más allá.

Aquí hay una imagen completa:

![](promise-handler-variants.svg)
