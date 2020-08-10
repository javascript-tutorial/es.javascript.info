# Errores personalizados, extendiendo Error

Cuando desarrollamos algo, a menudo necesitamos nuestras propias clases de error para reflejar cosas específicas que pueden salir mal en nuestras tareas. Para errores en las operaciones de red, podemos necesitar `HttpError`, para las operaciones de la base de datos `DbError`, para las operaciones de búsqueda `NotFoundError`, etc.

<<<<<<< HEAD
Nuestros errores deben admitir propiedades de error básicas como `message`, `name` y, preferiblemente, `stack`. Pero también pueden tener otras propiedades propias, por ejemplo, los objetos `HttpError` pueden tener una propiedad `statusCode` con un valor como `404` o `403` o `500`.
=======
Our errors should support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have a `statusCode` property with a value like `404` or `403` or `500`.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

JavaScript permite usar `throw` con cualquier argumento, por lo que técnicamente nuestras clases de error personalizadas no necesitan heredarse de `Error`. Pero si heredamos, entonces es posible usar `obj instanceof Error` para identificar objetos error. Entonces es mejor heredar de él.

<<<<<<< HEAD
A medida que la aplicación crece, nuestros propios errores forman naturalmente una jerarquía. Por ejemplo, `HttpTimeoutError` puede heredar de `HttpError`, y así sucesivamente.
=======
As the application grows, our own errors naturally form a hierarchy. For instance, `HttpTimeoutError` may inherit from `HttpError`, and so on.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## Extendiendo Error

Como ejemplo, consideremos una función `readUser(json)` que debería leer JSON con los datos del usuario.

Aquí hay un ejemplo de cómo puede verse un `json` válido:
```js
let json = `{ "name": "John", "age": 30 }`;
```

<<<<<<< HEAD
Internamente, usaremos `JSON.parse`. Si recibe `json` mal formado, entonces arroja `SyntaxError`. Pero incluso si `json` es sintácticamente correcto, eso no significa que sea un usuario válido, ¿verdad? Puede perder los datos necesarios. Por ejemplo, puede no tener propiedades de nombre y edad que son esenciales para nuestros usuarios.

Nuestra función `readUser(json)` no solo leerá JSON, sino que verificará ("validará") los datos. Si no hay campos obligatorios, o el formato es incorrecto, entonces es un error. Y eso no es un "SyntaxError", porque los datos son sintácticamente correctos, sino otro tipo de error. Lo llamaremos `ValidationError` y crearemos una clase para ello. Un error de ese tipo también debe llevar la información sobre el campo infractor.
=======
Internally, we'll use `JSON.parse`. If it receives malformed `json`, then it throws `SyntaxError`. But even if `json` is syntactically correct, that doesn't mean that it's a valid user, right? It may miss the necessary data. For instance, it may not have `name` and `age` properties that are essential for our users.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Nuestra clase `ValidationError` debería heredar de la clase incorporada `Error`.

<<<<<<< HEAD
Esa clase está incorporada, pero aquí está su código aproximado para que podamos entender lo que estamos extendiendo:
=======
Our `ValidationError` class should inherit from the built-in `Error` class.

That class is built-in, but here's its approximate code so we can understand what we're extending:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
// El "pseudocódigo" para la clase Error incorporada definida por el propio JavaScript
class Error {
  constructor(message) {
    this.message = message;
<<<<<<< HEAD
    this.name = "Error"; // (diferentes nombres para diferentes clases error incorporadas)
    this.stack = <call stack>; // no estándar, pero la mayoría de los entornos lo admiten
=======
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <call stack>; // non-standard, but most environments support it
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
  }
}
```

<<<<<<< HEAD
Ahora heredemos `ValidationError` y probémoslo en acción:
=======
Now let's inherit `ValidationError` from it and try it in action:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Vaya!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Vaya!
  alert(err.name); // ValidationError
  alert(err.stack); // una lista de llamadas anidadas con números de línea para cada una
}
```

<<<<<<< HEAD
Tenga en cuenta: en la línea `(1)` llamamos al constructor padre. JavaScript requiere que llamemos `super` en el constructor hijo, por lo que es obligatorio. El constructor padre establece la propiedad `message`.

El constructor principal también establece la propiedad `name` en `"Error"`, por lo que en la línea `(2)` la restablecemos al valor correcto.
=======
Please note: in the line `(1)` we call the parent constructor. JavaScript requires us to call `super` in the child constructor, so that's obligatory. The parent constructor sets the `message` property.

The parent constructor also sets the `name` property to `"Error"`, so in the line `(2)` we reset it to the right value.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Intentemos usarlo en `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Uso
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("Sin campo: age");
  }
  if (!user.name) {
    throw new ValidationError("Sin campo: name");
  }

  return user;
}

// Ejemplo de trabajo con try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Dato inválido: " + err.message); // Dato inválido: sin campo: nombre
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("Error de sintaxis JSON: " + err.message);
  } else {
    throw err; // error desconocido, vuelva a lanzarlo (**)
  }
}
```

El bloque `try..catch` en el código anterior maneja tanto nuestro `ValidationError` como el `SyntaxError` incorporado de `JSON.parse`.

Observe cómo usamos `instanceof` para verificar el tipo de error específico en la línea `(*)`.

También podríamos mirar `err.name`, así:

```js
// ...
// en lugar de (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

La versión `instanceof` es mucho mejor, porque en el futuro vamos a extender `ValidationError`, haremos subtipos de ella, como `PropertyRequiredError`. Y el control `instanceof` continuará funcionando para las nuevas clases heredadas. Entonces eso es a prueba de futuro.

<<<<<<< HEAD
También es importante que si `catch` encuentra un error desconocido, entonces lo vuelve a lanzar en la línea `(**)`. El bloque `catch` solo sabe cómo manejar los errores de validación y sintaxis, otros tipos (debido a un error tipográfico en el código u otros desconocidos) deben fallar.
=======
Also it's important that if `catch` meets an unknown error, then it rethrows it in the line `(**)`. The `catch` block only knows how to handle validation and syntax errors, other kinds (due to a typo in the code or other unknown ones) should fall through.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## Herencia adicional

La clase `ValidationError` es muy genérica. Muchas cosas pueden salir mal. La propiedad puede estar ausente o puede estar en un formato incorrecto (como un valor de cadena para `age`). Hagamos una clase más concreta `PropertyRequiredError`, exactamente para propiedades ausentes. Llevará información adicional sobre la propiedad que falta.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Sin propiedad: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Uso
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Ejemplo de trabajo con try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Dato inválido: " + err.message); // Dato inválido: Sin propiedad: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("Error de sintaxis JSON: " + err.message);
  } else {
    throw err; // error desconocido, vuelva a lanzarlo
  }
}
```

La nueva clase `PropertyRequiredError` es fácil de usar: solo necesitamos pasar el nombre de la propiedad: `new PropertyRequiredError(property)`. El `message` legible para humanos es generado por el constructor.

<<<<<<< HEAD
Tenga en cuenta que `this.name` en el constructor `PropertyRequiredError` se asigna de nuevo manualmente. Eso puede volverse un poco tedioso: asignar `this.name = <class name>` en cada clase de error personalizada. Podemos evitarlo haciendo nuestra propia clase "error básico" que asigna `this.name = this.constructor.name`. Y luego herede todos nuestros errores personalizados.
=======
Please note that `this.name` in `PropertyRequiredError` constructor is again assigned manually. That may become a bit tedious -- to assign `this.name = <class name>` in every custom error class. We can avoid it by making our own "basic error" class that assigns `this.name = this.constructor.name`. And then inherit all our custom errors from it.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Llamémosla `MyError`.

Aquí está el código con `MyError` y otras clases error personalizadas, simplificadas:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("sin propiedad: " + property);
    this.property = property;
  }
}

// name es incorrecto
alert( new PropertyRequiredError("campo").name ); // PropertyRequiredError
```

Ahora los errores personalizados son mucho más cortos, especialmente `ValidationError`, ya que eliminamos la línea `"this.name = ..."` en el constructor.

## Empacado de Excepciones

El propósito de la función `readUser` en el código anterior es "leer los datos del usuario". Puede haber diferentes tipos de errores en el proceso. En este momento tenemos `SyntaxError` y `ValidationError`, pero en el futuro la función `readUser` puede crecer y probablemente generar otros tipos de errores.

El código que llama a `readUser` debe manejar estos errores. En este momento utiliza múltiples `if` en el bloque `catch`, que verifican la clase y manejan los errores conocidos y vuelven a arrojar los desconocidos.

El esquema es así:

```js
try {
  ...
  readUser()  // la fuente potencial de error
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // manejar errores de validación
  } else if (err instanceof SyntaxError) {
    // manejar errores de sintaxis
  } else {
    throw err; // error desconocido, vuelva a lanzarlo
  }
}
```

En el código anterior podemos ver dos tipos de errores, pero puede haber más.

Si la función `readUser` genera varios tipos de errores, entonces debemos preguntarnos: ¿realmente queremos verificar todos los tipos de error uno por uno cada vez?

<<<<<<< HEAD
A menudo, la respuesta es "No": nos gustaría estar "un nivel por encima de todo eso". Solo queremos saber si hubo un "error de lectura de datos": el por qué ocurrió exactamente es a menudo irrelevante (el mensaje de error lo describe). O, mejor aún, nos gustaría tener una forma de obtener los detalles del error, pero solo si es necesario.

La técnica que describimos aquí se llama "empacado de excepciones".

1. Crearemos una nueva clase `ReadError` para representar un error genérico de "lectura de datos".
2. La función `readUser` detectará los errores de lectura de datos que ocurren dentro de ella, como `ValidationError` y `SyntaxError`, y generará un `ReadError` en su lugar.
3. El objeto `ReadError` mantendrá la referencia al error original en su propiedad `cause`.

Entonces, el código que llama a `readUser` solo tendrá que verificar `ReadError`, no todos los tipos de errores de lectura de datos. Y si necesita más detalles de un error, puede verificar su propiedad `cause`.
=======
The purpose of the function `readUser` in the code above is "to read the user data". There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but in the future `readUser` function may grow and probably generate other kinds of errors.

The code which calls `readUser` should handle these errors. Right now it uses multiple `if`s in the `catch` block, that check the class and handle known errors and rethrow the unknown ones.

The scheme is like this:

```js
try {
  ...
  readUser()  // the potential error source
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // handle validation errors
  } else if (err instanceof SyntaxError) {
    // handle syntax errors
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

In the code above we can see two types of errors, but there can be more.

If the `readUser` function generates several kinds of errors, then we should ask ourselves: do we really want to check for all error types one-by-one every time?

Often the answer is "No": we'd like to be "one level above all that". We just want to know if there was a "data reading error" -- why exactly it happened is often irrelevant (the error message describes it). Or, even better, we'd like to have a way to get the error details, but only if we need to.

The technique that we describe here is called "wrapping exceptions".

1. We'll make a new class `ReadError` to represent a generic "data reading" error.
2. The function `readUser` will catch data reading errors that occur inside it, such as `ValidationError` and `SyntaxError`, and generate a `ReadError` instead.
3. The `ReadError` object will keep the reference to the original error in its `cause` property.

Then the code that calls `readUser` will only have to check for `ReadError`, not for every kind of data reading errors. And if it needs more details of an error, it can check its `cause` property.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Aquí está el código que define `ReadError` y demuestra su uso en `readUser` y `try..catch`:

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Error de sintaxis", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Error de validación", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{json malo}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Error original: SyntaxError: inesperado token b en JSON en la posición 1
    alert("Error original: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

En el código anterior, `readUser` funciona exactamente como se describe: detecta los errores de sintaxis y validación y arroja los errores `ReadError` en su lugar (los errores desconocidos se vuelven a generar como de costumbre).

<<<<<<< HEAD
Entonces, el código externo verifica `instanceof ReadError` y eso es todo. No es necesario enumerar todos los tipos de error posibles.

El enfoque se llama "empacado de excepciones", porque tomamos excepciones de "bajo nivel" y las "ajustamos" en `ReadError` que es más abstracto. Es ampliamente utilizado en la programación orientada a objetos.
=======
So the outer code checks `instanceof ReadError` and that's it. No need to list all possible error types.

The approach is called "wrapping exceptions", because we take "low level" exceptions and "wrap" them into `ReadError` that is more abstract. It is widely used in object-oriented programming.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## Resumen

<<<<<<< HEAD
- Podemos heredar de `Error` y otras clases de error incorporadas normalmente. Solo necesitamos cuidar la propiedad `name` y no olvidemos llamar `super`.
- Podemos usar `instanceof` para verificar errores particulares. También funciona con herencia. Pero a veces tenemos un objeto error que proviene de una biblioteca de terceros y no hay una manera fácil de obtener su clase. Entonces la propiedad `name` puede usarse para tales controles.
- Empacado de excepciones es una técnica generalizada: una función maneja excepciones de bajo nivel y crea errores de alto nivel en lugar de varios errores de bajo nivel. Las excepciones de bajo nivel a veces se convierten en propiedades de ese objeto como `err.cause` en los ejemplos anteriores, pero eso no es estrictamente necesario.
=======
- We can inherit from `Error` and other built-in error classes normally. We just need to take care of the `name` property and don't forget to call `super`.
- We can use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from a 3rd-party library and there's no easy way to get its class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique: a function handles low-level exceptions and creates higher-level errors instead of various low-level ones. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
