<<<<<<< HEAD

# Export e Import

Las directivas export e import tienen varias variantes de sintáxis.

En el artículo anterior vimos un uso simple, ahora exploremos más ejemplos.
=======
# Export and Import

Export and import directives have several syntax variants.

In the previous article we saw a simple use, now let's explore more examples.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## Export antes de las sentencias

Podemos etiquetar cualquier sentencia como exportada colocando 'export' antes, ya sea una variable, función o clase.

Por ejemplo, aquí todas las exportaciones son válidas:

```js
// exportar un array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// exportar una constante
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// exportar una clase
*!*export*/!* clase User {
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
````smart header="Sin punto y coma después de export clase/función"
Tenga en cuenta que `export` antes de una clase o una función no la hace una [expresión de función](info:function-expressions). Sigue siendo una declaración de función, aunque exportada.

La mayoría de las guías de estilos JavaScript no recomiendan los punto y comas después de declarar funciones y clases.

Es por esto que no hay necesidad de un punto y coma al final de `export class` y `export function`:
=======
````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions). It's still a function declaration, albeit exported.

Most JavaScript style guides don't recommend semicolons after function and class declarations.

That's why there's no need for a semicolon at the end of `export class` and `export function`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // no ; at the end */!*
```
````

## Export separado de la declaración

También podemos colocar `export` por separado.

Aquí primero declaramos y luego exportamos:

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // una lista de variables exportadas
*/!*
```

...O, técnicamente podemos colocar `export` arriba de las funciones también.

## Import *

<<<<<<< HEAD
Generalmente, colocamos una lista de lo que queremos importar en llaves `import {...}`, de esta manera:
=======
Usually, we put a list of what to import in curly braces `import {...}`, like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

<<<<<<< HEAD
Pero si hay mucho para importar, podemos importar todo como un objeto utilizando `import * as <obj>`, por ejemplo:
=======
But if there's a lot to import, we can import everything as an object using `import * as <obj>`, for instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

A primera vista, "importar todo" parece algo tan genial, corto de escribir, por qué deberíamos listar explícitamente lo que necesitamos importar?

Pues hay algunas razones.

1. Las herramientas de ensamblaje modernas ([webpack](http://webpack.github.io) y otras) empaquetan los módulos juntos y los optimiza para acelerar la carga y quitan las cosas sin usar.

Digamos que agregamos una librería externa `say.js` a nuestro proyecto con varias funciones:

<<<<<<< HEAD
=======
    Let's say, we added a 3rd-party library `say.js` to our project with many functions:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

<<<<<<< HEAD
    Ahora si solamnente utilizamos una de las funciones de `say.js` en nuestro proyecto:

=======
    Now if we only use one of `say.js` functions in our project:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
<<<<<<< HEAD
    
...Entonces el optimizador lo verá y eliminará las otras funciones del código empaquetado, por lo tanto la compilación es más pequeña. Esto se llama "tree-shaking".

2. Listar explícitamente qué importar da nombres más cortos: `sayHi()` en lugar de `say.sayHi()`.
3. La lista explícita de importaciones ofrece una mejor visión general de la estructura del código: qué se usa y dónde. Facilita el soporte de código y la refactorización.
=======
    ...Then the optimizer will see that and remove the other functions from the bundled code, thus making the build smaller. That is called "tree-shaking".

2. Explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`.
3. Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

## Importar "as"

También podemos utilizar `as` para importar bajo nombres diferentes.

<<<<<<< HEAD
Por ejemplo, importemos `sayHi` en la variable local `hi` para brevedad, e importar `sayBye` como `bye`:
=======
For instance, let's import `sayHi` into the local variable `hi` for brevity, and import `sayBye` as `bye`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## Exportar "as"

Existe un sintáxis similar para `export`.

Exportemos funciones como `hi` y `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

<<<<<<< HEAD
Ahora `hi` y `bye` son los nombres oficiales para desconocidos, a ser utilizados en importaciones:
=======
Now `hi` and `bye` are official names for outsiders, to be used in imports:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

<<<<<<< HEAD
En la práctica, existen principalmente dos tipos de módulos.

1. Módulos que contienen una librería, paquete de funciones, como `say.js` de arriba.
2. Módulos que declaran una entidad simple, por ejemplo un módulo `user.js` exporta únicamente `class User`.
=======
In practice, there are mainly two kinds of modules.

1. Modules that contain a library, pack of functions, like `say.js` above.
2. Modules that declare a single entity, e.g. a module `user.js` exports only `class User`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Principalmente, se prefiere el segundo enfoque, de modo que cada "cosa" reside en su propio módulo.

<<<<<<< HEAD
Naturalmente, eso requiere muchos archivos, ya que todo quiere su propio módulo, pero eso no es un problema en absoluto. En realidad, la navegación de código se vuelve más fácil si los archivos están bien nombrados y estructurados en carpetas.

Los módulos proporcionan una sintaxis especial 'export default' ("la exportación predeterminada") para que la forma de "una cosa por módulo" se vea mejor.

Poner `export default` antes de la entidad a exportar:
=======
Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" way look better.

Put `export default` before the entity to export:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 user.js
export *!*default*/!* class User { // sólo agregar "default"
  constructor(name) {
    this.name = name;
  }
}
```

<<<<<<< HEAD
Sólo puede existir un sólo `export default` por archivo.

...Y luego importarlo sin llaves:

=======
There may be only one `export default` per file.

...And then import it without curly braces:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // no {User}, sólo User
new User('John');
```

<<<<<<< HEAD
Las importaciones sin llaves se ven mejor. Un error común al comenzar a usar módulos es olvidarse de las llaves. Entonces, recuerde, `import` necesita llaves para las exportaciones con nombre y no las necesita para la predeterminada.
=======
Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named exports and doesn't need them for the default one.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

| Export con nombre | Export predeterminada |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

<<<<<<< HEAD
Técnicamente, podemos tener exportaciones predeterminadas y con nombre en un solo módulo, pero en la práctica la gente generalmente no las mezcla. Un módulo tiene exportaciones con nombre o la predeterminada.

Como puede haber como máximo una exportación predeterminada por archivo, la entidad exportada puede no tener nombre.
=======
Technically, we may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por ejemplo, todas estas son exportaciones predeterminadas perfectamente válidas:

```js
export default class { // sin nombre de clase
  constructor() { ... }
}
```

```js
<<<<<<< HEAD
export default function(user) { // sin nombre de función
=======
export default function(user) { // no function name
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  alert(`Hello, ${user}!`);
}
```

```js
<<<<<<< HEAD
// exportar un único valor, sin crear una variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

No dar un nombre está bien, porque solo hay un "export default" por archivo, por lo que "import" sin llaves sabe qué importar.

Sin `default`, dicha exportación daría un error:
=======
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

Not giving a name is fine, because there is only one `export default` per file, so `import` without curly braces knows what to import.

Without `default`, such an export would give an error:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
export class { // Error! (exportación no predeterminada necesita un nombre)
  constructor() {}
}
```     

<<<<<<< HEAD
### El nombre "default"

En algunas situaciones, la palabra clave `default` se usa para hacer referencia a la exportación predeterminada.

Por ejemplo, para exportar una función por separado de su definición:
=======
### The "default" name

In some situations the `default` keyword is used to reference the default export.

For example, to export a function separately from its definition:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

<<<<<<< HEAD
// lo mismo que si agregamos "export default" antes de la función
export {sayHi as default};
```

Otra situación, supongamos un módulo `user.js` exporta una cosa principal "default", y algunas cosas con nombre (raro el caso, pero sucede):
=======
// same as if we added "export default" before the function
export {sayHi as default};
```

Or, another situation, let's say a module `user.js` exports one main "default" thing, and a few named ones (rarely the case, but it happens):
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Aquí la manera de importar la exportación predeterminada junto con la exportación con nombre:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

<<<<<<< HEAD
Y por último, si importamos todo `*` como un objeto, entonce la propiedad `default` es exactamente la exportación predeterminada:
=======
And, finally, if importing everything `*` as an object, then the `default` property is exactly the default export:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 main.js
import * as user from './user.js';
<<<<<<< HEAD
let User = user.default; // la exportación predeterminada
new User('John');
```

### Unas palabras contra exportaciones predeterminadas

Las exportaciones con nombre son explícitas. Nombran exactamente lo que importan, así que tenemos esa información de ellos; Eso es bueno.

Las exportaciones con nombre nos obligan a usar exactamente el nombre correcto para importar:

```js
import {User} from './user.js';
// import {MyUser} no funcionará, el nombre debe ser {User}
```

...Mientras que para una exporación predeterminada siempre elegimos el nombre al importar:

```js
import User from './user.js'; // funciona
import MyUser from './user.js'; // también funciona
// puede ser import Cualquiera... y aun funcionaría
```

Por lo tanto, los miembros del equipo pueden usar diferentes nombres para importar lo mismo, y eso no es bueno.
=======

let User = user.default; // the default export
new User('John');
```

### A word against default exports

Named exports are explicit. They exactly name what they import, so we have that information from them; that's a good thing.

Named exports force us to use exactly the right name to import:

```js
import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
```

...While for a default export, we always choose the name when importing:

```js
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
```

So team members may use different names to import the same thing, and that's not good.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por lo general, para evitar eso y mantener el código consistente, existe una regla que establece que las variables importadas deben corresponder a los nombres de los archivos, por ejemplo:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

<<<<<<< HEAD
Aún así, algunos equipos lo consideran un serio inconveniente de las exportaciones predeterminadas. Por lo tanto, prefieren usar siempre exportaciones con nombre. Incluso si solo se exporta una sola cosa, todavía se exporta con un nombre, sin `default`.
=======
Still, some teams consider it a serious drawback of default exports. So they prefer to always use named exports. Even if only a single thing is exported, it's still exported under a name, without `default`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Eso también hace que la reexportación (ver más abajo) sea un poco más fácil.

## Reexportación 

La sintáxis "Reexportar" `export ... from ...` permite importar cosas e inmediatamente exportarlas (posiblemente bajo otro nombre), de esta manera:

```js
<<<<<<< HEAD
export {sayHi} from './say.js'; // reexportar sayHi
export {default as User} from './user.js'; // reexportar default
```

¿Por qué se necesitaría eso? Veamos un caso de uso práctico.

Imagínese, estamos escribiendo un "paquete": una carpeta con muchos módulos, con algunas de las funciones exportadas al exterior (herramientas como NPM nos permiten publicar y distribuir dichos paquetes), y muchos módulos son solo "ayudantes", para uso interno en otros módulos de paquete.

La estructura del archivo podría ser así:

=======
export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
```

Why would that be needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, with some of the functionality exported outside (tools like NPM allow us to publish and distribute such packages), and many modules are just "helpers", for internal use in other package modules.

The file structure could be like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```
auth/
    index.js  
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

Nos gustaría exponer la funcionalidad del paquete a través de un único punto de entrada, el "archivo principal" `auth/index.js`, para ser utilizado así:

```js
import {login, logout} from 'auth/index.js'
```

<<<<<<< HEAD
La idea es que los extraños, los desarrolladores que usan nuestro paquete, no deben entrometerse con su estructura interna, buscar archivos dentro de nuestra carpeta de paquetes. Exportamos solo lo que es necesario en `auth/index.js` y mantenemos el resto oculto a miradas indiscretas.

Como la funcionalidad real exportada se encuentra dispersa entre el paquete, podemos importarla en `auth/index.js` y exportar desde ella:

```js
// 📁 auth/index.js
// importar login/logout e inmediatamente exportarlas
import {login, logout} from './helpers.js';
export {login, logout};
// importar default como User y exportarlo
=======
The idea is that outsiders, developers who use our package, should not meddle with its internal structure, search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can import it into `auth/index.js` and export from it:

```js
// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
import User from './user.js';
export {User};
...
```

<<<<<<< HEAD
Ahora los usuarios de nuestro paquete pueden hacer esto `import {login} from "auth/index.js"`.

La sintáxis `export ... from ...` es solo una notación más corta para tales importación-exportación:

```js
// 📁 auth/index.js
// importar login/logout e inmediatamente exportarlos
export {login, logout} from './helpers.js';

// importar default como User y exportarlo
=======
Now users of our package can `import {login} from "auth/index.js"`.

The syntax `export ... from ...` is just a shorter notation for such import-export:

```js
// 📁 auth/index.js
// import login/logout and immediately export them
export {login, logout} from './helpers.js';

// import default as User and export it
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
export {default as User} from './user.js';
...
```

<<<<<<< HEAD
### Reexportando la exportación predeterminada

La exportación predeterminada necesita un manejo separado cuando se reexporta.

Digamos que tenemos `user.js`, y nos gustaría volver a exportar la clase `User` de él:
=======
### Re-exporting the default export

The default export needs separate handling when re-exporting.

Let's say we have `user.js`, and we'd like to re-export class `User` from it:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
// 📁 user.js
export default class User {
  // ...
}
```

<<<<<<< HEAD
=======
1. `export User from './user.js'` won't work. What can go wrong?... But that's a syntax error!

    To re-export the default export, we have to write `export {default as User}`, as in the example above.    

2. `export * from './user.js'` re-exports only named exports, but ignores the default one.

    If we'd like to re-export both named and the default export, then two statements are needed:
    ```js
    export * from './user.js'; // to re-export named exports
    export {default} from './user.js'; // to re-export the default export
    ```

Such oddities of re-exporting the default export are one of the reasons why some developers don't like them.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

1. `export User from './user.js'` no funcionará. Qué puede fallar?... Pero es un errro de sintáxis!

Para reexportar la exportación predeterminada, tenemos que escribir `export {default as User}`, tal como en el ejemplo de arriba.    

2. `export * from './user.js'` reexporta únicamente las exportaciones con nombre, pero ignora la exportación predeterminada.

<<<<<<< HEAD
Si nos gustaría reexportar tanto la exportación con nombre como la predeterminada, se necesitan dos declaraciones:
    ```js
    export * from './user.js'; // para reexportar exportaciones con nombre
    export {default} from './user.js'; // para reexportar la exportación predeterminada
    ```

Tales rarezas de reexportar la exportación predeterminada son una de las razones por las que a algunos desarrolladores no les gustan.

## Resumen

Aquí están todos los tipos de 'exportación' que cubrimos en este y en artículos anteriores.

Puede comprobarlo al leerlos y recordar lo que significan:

- Antes de la declaración de clase/función/..:
  - `export [default] clase/función/variable ...`
- Export independiente:
  - `export {x [as y], ...}`.
- Reexportar:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (no reexporta la predeterminada).
  - `export {default [as y]} from "module"` (reexporta la predeterminada).

Importación:

- Exportación con nombre desde módulo:
  - `import {x [as y], ...} from "module"`
- Exportación predeterminada:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Todo:
  - `import * as obj from "module"`
- Importar el módulo (su código se ejecuta), pero no lo asigna a una variable:
  - `import "module"`

Podemos poner las declaraciones `import/export` en la parte superior o inferior de un script, eso no importa.

Entonces, técnicamente este código está bien:

```js
sayHi();
// ...
import {sayHi} from './say.js'; // import al final del archivo
```

En la práctica, las importaciones generalmente se encuentran al comienzo del archivo, pero eso es solo para mayor comodidad.
=======
Here are all types of `export` that we covered in this and previous articles.

You can check yourself by reading them and recalling what they mean:

- Before declaration of a class/function/..:
  - `export [default] class/function/variable ...`
- Standalone export:
  - `export {x [as y], ...}`.
- Re-export:
  - `export {x [as y], ...} from "module"`
  - `export * from "module"` (doesn't re-export default).
  - `export {default [as y]} from "module"` (re-export default).

Import:

- Named exports from module:
  - `import {x [as y], ...} from "module"`
- Default export:  
  - `import x from "module"`
  - `import {default as x} from "module"`
- Everything:
  - `import * as obj from "module"`
- Import the module (its code runs), but do not assign it to a variable:
  - `import "module"`

We can put `import/export` statements at the top or at the bottom of a script, that doesn't matter.

So, technically this code is fine:
```js
sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
```

In practice imports are usually at the start of the file, but that's only for more convenience.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

**Tenga en cuenta que las declaraciones de import/export no funcionan si están dentro `{...}`.**

Una importación condicional, como esta, no funcionará:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import debe estar en nivel superior
}
```

...Pero, ¿qué pasa si realmente necesitamos importar algo condicionalmente? O en el momento adecuado? Por ejemplo, ¿cargar un módulo a pedido, cuando realmente se necesita?

<<<<<<< HEAD
Veremos importaciones dinámicas en el próximo artículo.
=======
We'll see dynamic imports in the next article.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
