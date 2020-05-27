# Export e Import

Las directivas export e import tienen varias variantes de sintáxis.

En el artículo anterior vimos un uso simple, ahora exploremos más ejemplos.

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

````smart header="Sin punto y coma después de export clase/función"
Tenga en cuenta que `export` antes de una clase o una función no la hace una [expresión de función](info:function-expressions). Sigue siendo una declaración de función, aunque exportada.

La mayoría de las guías de estilos JavaScript no recomiendan los punto y comas después de declarar funciones y clases.

Es por esto que no hay necesidad de un punto y coma al final de `export class` y `export function`:

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

Generalmente, colocamos una lista de lo que queremos importar en llaves `import {...}`, de esta manera:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

Pero si hay mucho para importar, podemos importar todo como un objeto utilizando `import * as <obj>`, por ejemplo:

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
    ```js
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Ahora si solamnente utilizamos una de las funciones de `say.js` en nuestro proyecto:
    ```js
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
...Entonces el optimizador lo verá y eliminará las otras funciones del código empaquetado, por lo tanto la compilación es más pequeña. Esto se llama "tree-shaking".

2. Listar explícitamente qué importar da nombres más cortos: `sayHi()` en lugar de `say.sayHi()`.
3. La lista explícita de importaciones ofrece una mejor visión general de la estructura del código: qué se usa y dónde. Facilita el soporte de código y la refactorización.

## Importar "as"

También podemos utilizar `as` para importar bajo nombres diferentes.

Por ejemplo, importemos `sayHi` en la variable local `hi` para brevedad, e importar `sayBye` como `bye`:

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

Ahora `hi` y `bye` son los nombres oficiales para desconocidos, a ser utilizados en importaciones:

```js
// 📁 main.js
import * as say from './say.js';

say.*!*hi*/!*('John'); // Hello, John!
say.*!*bye*/!*('John'); // Bye, John!
```

## Export default

En la práctica, existen principalmente dos tipos de módulos.

1. Módulos que contienen una librería, paquete de funciones, como `say.js` de arriba.
2. Módulos que declaran una entidad simple, por ejemplo un módulo `user.js` exporta únicamente `class User`.

Principalmente, se prefiere el segundo enfoque, de modo que cada "cosa" reside en su propio módulo.

Naturalmente, eso requiere muchos archivos, ya que todo quiere su propio módulo, pero eso no es un problema en absoluto. En realidad, la navegación de código se vuelve más fácil si los archivos están bien nombrados y estructurados en carpetas.

Los módulos proporcionan una sintaxis especial 'export default' ("la exportación predeterminada") para que la forma de "una cosa por módulo" se vea mejor.

Poner `export default` antes de la entidad a exportar:

```js
// 📁 user.js
export *!*default*/!* class User { // sólo agregar "default"
  constructor(name) {
    this.name = name;
  }
}
```

Sólo puede existir un sólo `export default` por archivo.

...Y luego importarlo sin llaves:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // no {User}, sólo User

new User('John');
```

Las importaciones sin llaves se ven mejor. Un error común al comenzar a usar módulos es olvidarse de las llaves. Entonces, recuerde, `import` necesita llaves para las exportaciones con nombre y no las necesita para la predeterminada.

| Export con nombre | Export predeterminada |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Técnicamente, podemos tener exportaciones predeterminadas y con nombre en un solo módulo, pero en la práctica la gente generalmente no las mezcla. Un módulo tiene exportaciones con nombre o la predeterminada.

Como puede haber como máximo una exportación predeterminada por archivo, la entidad exportada puede no tener nombre.

Por ejemplo, todas estas son exportaciones predeterminadas perfectamente válidas:

```js
export default class { // sin nombre de clase
  constructor() { ... }
}
```

```js
export default function(user) { // sin nombre de función
  alert(`Hello, ${user}!`);
}
```

```js
// exportar un único valor, sin crear una variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

No dar un nombre está bien, porque solo hay un "export default" por archivo, por lo que "import" sin llaves sabe qué importar.

Sin `default`, dicha exportación daría un error:

```js
export class { // Error! (exportación no predeterminada necesita un nombre)
  constructor() {}
}
```     

### El nombre "default"

En algunas situaciones, la palabra clave `default` se usa para hacer referencia a la exportación predeterminada.

Por ejemplo, para exportar una función por separado de su definición:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// lo mismo que si agregamos "export default" antes de la función
export {sayHi as default};
```

Otra situación, supongamos un módulo `user.js` exporta una cosa principal "default", y algunas cosas con nombre (raro el caso, pero sucede):

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

Y por último, si importamos todo `*` como un objeto, entonce la propiedad `default` es exactamente la exportación predeterminada:

```js
// 📁 main.js
import * as user from './user.js';

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

Por lo general, para evitar eso y mantener el código consistente, existe una regla que establece que las variables importadas deben corresponder a los nombres de los archivos, por ejemplo:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

Aún así, algunos equipos lo consideran un serio inconveniente de las exportaciones predeterminadas. Por lo tanto, prefieren usar siempre exportaciones con nombre. Incluso si solo se exporta una sola cosa, todavía se exporta con un nombre, sin `default`.

Eso también hace que la reexportación (ver más abajo) sea un poco más fácil.

## Reexportación 

La sintáxis "Reexportar" `export ... from ...` permite importar cosas e inmediatamente exportarlas (posiblemente bajo otro nombre), de esta manera:

```js
export {sayHi} from './say.js'; // reexportar sayHi

export {default as User} from './user.js'; // reexportar default
```

¿Por qué se necesitaría eso? Veamos un caso de uso práctico.

Imagínese, estamos escribiendo un "paquete": una carpeta con muchos módulos, con algunas de las funciones exportadas al exterior (herramientas como NPM nos permiten publicar y distribuir dichos paquetes), y muchos módulos son solo "ayudantes", para uso interno en otros módulos de paquete.

La estructura del archivo podría ser así:
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

La idea es que los extraños, los desarrolladores que usan nuestro paquete, no deben entrometerse con su estructura interna, buscar archivos dentro de nuestra carpeta de paquetes. Exportamos solo lo que es necesario en `auth/index.js` y mantenemos el resto oculto a miradas indiscretas.

Como la funcionalidad real exportada se encuentra dispersa entre el paquete, podemos importarla en `auth/index.js` y exportar desde ella:

```js
// 📁 auth/index.js

// importar login/logout e inmediatamente exportarlas
import {login, logout} from './helpers.js';
export {login, logout};

// importar default como User y exportarlo
import User from './user.js';
export {User};
...
```

Ahora los usuarios de nuestro paquete pueden hacer esto `import {login} from "auth/index.js"`.

La sintáxis `export ... from ...` es solo una notación más corta para tales importación-exportación:

```js
// 📁 auth/index.js
// importar login/logout e inmediatamente exportarlos
export {login, logout} from './helpers.js';

// importar default como User y exportarlo
export {default as User} from './user.js';
...
```

### Reexportando la exportación predeterminada

La exportación predeterminada necesita un manejo separado cuando se reexporta.

Digamos que tenemos `user.js`, y nos gustaría volver a exportar la clase `User` de él:

```js
// 📁 user.js
export default class User {
  // ...
}
```

1. `export User from './user.js'` no funcionará. Qué puede fallar?... Pero es un errro de sintáxis!

Para reexportar la exportación predeterminada, tenemos que escribir `export {default as User}`, tal como en el ejemplo de arriba.    

2. `export * from './user.js'` reexporta únicamente las exportaciones con nombre, pero ignora la exportación predeterminada.

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

**Tenga en cuenta que las declaraciones de import/export no funcionan si están dentro `{...}`.**

Una importación condicional, como esta, no funcionará:
```js
if (something) {
  import {sayHi} from "./say.js"; // Error: import debe estar en nivel superior
}
```

...Pero, ¿qué pasa si realmente necesitamos importar algo condicionalmente? O en el momento adecuado? Por ejemplo, ¿cargar un módulo a pedido, cuando realmente se necesita?

Veremos importaciones dinámicas en el próximo artículo.