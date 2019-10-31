
# *Imports* dinámicos

Las declaraciones *export* e *import* que hemos visto en capítulos anteriores se dice que son "estáticas".

El motivo es que realmente son estáticas. La sintaxis es muy estricta.

En primer lugar, no podemos generar de manera dinámica ningún parámetro para `import`.

En la ruta del módulo no puede haber una llamada a una función, sólo una cadena de texto. Esto no va a funcionar:

```js
import ... from *!*getModuleName()*/!*; // Error, sólo se permiten cadenas de texto
```

En segundo lugar, no podemos hacer un `import` dentro de un condicional o en tiempo de ejecución:

```js
if(...) {
  import ...; // Error, ¡no permitido!
}

{
  import ...; // Error, no podemos poner un import dentro de un bloque
}
```

El motivo de esto es que el objetivo de *import*/*export* es proporcionar una columna vertebral a la estructura del código. Es algo bueno, porque la estructura de código puede ser analizada, los módulos se pueden unir y juntar, los *exports* que no se usan se pueden eliminar (sacudir el árbol). Todo eso es posible porque todo ha quedado fijado.

Pero, ¿cómo podemos importar un módulo de manera dinámica, en caso de ser necesario?

## La función import()

La función `import(módulo)` se puede llamar desde cualquier lado. Devuelve una promesa que se resuelve como un objeto módulo.

La manera de usarla tiene este aspecto:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

O, podríamos usar `let module = await import(modulePath)` si se encuentra dentro de una función asíncrona.

Como aquí:

[codetabs src="say" current="index.html"]

Como ves, importar dinámicante es muy sencillo.

Además, las importaciones dinámicas funcionar en *scripts* normales, no necesitan requerir un `script type="module"`.
