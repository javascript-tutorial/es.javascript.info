<<<<<<< HEAD
# Importaciones dinámicas

Las declaraciones de exportación e importación que cubrimos en capítulos anteriores se denominan "estáticas". La sintaxis es muy simple y estricta. 

Primero, no podemos generar dinámicamente ningún parámetro de `import`.

La ruta del módulo debe ser una cadena primitiva, no puede ser una llamada de función. Esto no funcionará:
=======
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static". The syntax is very simple and strict.

First, we can't dynamically generate any parameters of `import`.

The module path must be a primitive string, can't be a function call. This won't work:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
import ... from *!*getModuleName()*/!*; // Error, from sólo permite "string"
```

En segundo lugar, no podemos importar condicionalmente o en tiempo de ejecución:

```js
if(...) {
  import ...; // ¡Error, no permitido!
}

{
  import ...; // Error, no podemos poner importación en ningún bloque.
}
```

<<<<<<< HEAD
Esto se debe a que `import`/`export` proporcionan una columna vertebral para la estructura del código. Eso es algo bueno, ya que la estructura del código se puede analizar, los módulos se pueden reunir y agrupar en un archivo mediante herramientas especiales, las exportaciones no utilizadas se pueden eliminar ("tree-shaken"). Eso es posible solo porque la estructura de las importaciones / exportaciones es simple y fija.

Pero, ¿cómo podemos importar un módulo dinámicamente, a petición?

## La expresión import() 

La expresión `import(module)` carga el módulo y devuelve una promesa que se resuelve en un objeto de módulo que contiene todas sus exportaciones. Se puede llamar desde cualquier lugar del código.

Podemos usarlo dinámicamente en cualquier lugar del código, por ejemplo:

```js
let modulePath = prompt("¿Qué modulo cargar?");
=======
That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() expression

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

```js
let modulePath = prompt("Which module to load?");
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
<<<<<<< HEAD
```

O, podríamos usar `let module = await import(modulePath)` si está dentro de una función asíncrona.

Por ejemplo, si tenemos el siguiente módulo `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hola`);
}

export function bye() {
  alert(`Adiós`);
}
```

...Entonces la importación dinámica puede ser así:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

O, si `say.js` tiene la exportación predeterminada:

```js
// 📁 say.js
export default function() {
  alert("Módulo cargado (export default)!");
}
=======
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

...Luego, para acceder a él, podemos usar la propiedad `default` del objeto del módulo:

<<<<<<< HEAD
```js
let obj = await import('./say.js');
let say = obj.default;
// o, en una línea: let {default: say} = await import('./say.js');
=======
For instance, if we have the following module `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

Or, if `say.js` has the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

...Then, in order to access it, we can use `default` property of the module object:

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

say();
```

<<<<<<< HEAD
Aquí está el ejemplo completo:
=======
Here's the full example:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

[codetabs src="say" current="index.html"]

```smart
<<<<<<< HEAD
Las importaciones dinámicas funcionan en scripts normales, no requieren `script type="module"`.
```

```smart
Aunque `import()` parece una llamada de función, es una sintaxis especial que solo usa paréntesis (similar a `super ()`).

Por lo tanto, no podemos copiar `import` a una variable o usar `call/apply` con ella. No es una función.
=======
Dynamic imports work in regular scripts, they don't require `script type="module"`.
```

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

So we can't copy `import` to a variable or use `call/apply` with it. It's not a function.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```
