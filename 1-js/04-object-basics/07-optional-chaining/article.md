
# Encadenamiento opcional '?.'

[recent browser="new"]

El encadenamiento opcional `?.` es una forma a prueba de errores para acceder a las propiedades anidadas de los objetos, incluso si no existe una propiedad intermedia.

## El problema de la propiedad que no existe

Si acaba de comenzar a leer el tutorial y aprender JavaScript, quizás el problema aún no lo haya tocado, pero es bastante común.

Como ejemplo, digamos que tenemos objetos `user` que contienen información de nuestros usuarios. 

La mayoría de nuestros usuarios tienen la dirección en la propiedad `user.address`, con la calle en `user.address.street`, pero algunos no la proporcionaron.

En tal caso, cuando intentamos obtener `user.address.street`en un usuario sin dirección obtendremos un error:

```js run
let user = {}; // usuario sin propiedad "address"

alert(user.address.street); // Error!
```

Este es el resultado esperado. JavaScript funciona así, como `user.address` es `undefined`, el intento de obtener `user.address.street` falla dando un error.

En muchos casos prácticos preferiríamos obtener `undefined` en lugar del error (dando a entender "sin calle")

... y otro ejemplo. En desarrollo web, podemos obtener un objeto que corresponde a un elemento de página web usando el llamado a un método especial como `document.querySelector('.elem')`, que devuelve `null` cuando no existe tal elemento.

```js run
// Error si el resultado de querySelector (...) es null
let html = document.querySelector('.my-element').innerHTML;
```

Una vez más, si el elemento no existe, obtendremos un error al intentar acceder a la propiedad `.innerHTML` de `null`. Y en algunos casos, cuando la ausencia del elemento es normal, quisiéramos evitar el error y simplemente aceptar `html = null` como resultado.

¿Cómo podemos hacer esto?

La solución obvia sería chequear el valor usando `if` o el operador condicional `?` antes de usar la propiedad:

```js 
let user = {};

alert(user.address ? user.address.street : undefined);
```

Esto funciona, no hay error... Pero es bastante poco elegante. Como puedes ver, `"user.address"` aparece dos veces en el código. 

Aquí, el mismo caso pero con la búsqueda de `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

Podemos ver que el elemento de búsqueda `document.querySelector('.elem')` es llamado dos veces aquí. Nada bueno.

En propiedades anidadas más profundamente, esto se vuelve un problema porque se requerirán más repeticiones.

Ejemplo: Tratemos de obtener `user.address.street.name` de manera similar.

```js
let user = {}; // El usuario no tiene dirección

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Esto es horrible, podemos tener problemas para siquiera entender tal código.

Hay una mejor manera de escribirlo, usando el operador `&&`:

```js run
let user = {}; // usuario sin dirección

alert( user.address && user.address.street && user.address.street.name ); // undefined (sin error)
```

Poniendo AND en el camino completo a la propiedad asegura que todos los componentes existen (si no, la evaluación se detiene), pero no es lo ideal.

Como puedes ver, los nombres de propiedad aún están duplicados en el código. Por ejemplo en el código de arriba `user.address` aparece tres veces.

Es por ello que el encadenamiento opcional `?.` fue agregado al lenguaje. ¡Para resolver este problema de una vez por todas!

## Encadenamiento opcional

El encadenamiento opcional `?.` detiene la evaluación y devuelve `undefined` si el valor antes del `?.` es `undefined` o `null`. 

**De aquí en adelante en este artículo, por brevedad, diremos que algo "existe" si no es `null` o `undefined`.**

En otras palabras, `value?.prop`:
- funciona como `value.prop` si `value` existe,
- de otro modo (cuando `value` es `undefined/null`) devuelve `undefined`.

Aquí está la forma segura de acceder a `user.address.street` usando `?.`:

```js run
let user = {}; // El usuario no tiene dirección

alert( user?.address?.street ); // undefined (no hay error)
```

El código es corto y claro, no hay duplicación en absoluto

Aquí tenemos un ejemplo con `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // será undefined si no existe el elemento
```

Leer la dirección con `user?.Address` funciona incluso si el objeto `user` no existe:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Tenga en cuenta: la sintaxis `?.` hace opcional el valor delante de él, pero no más allá.

Por ejemplo, en `user?.address.street.name`, el `?.` permite que `user` sea `null/undefined` (y devuelve `undefined` en tal caso), pero solo a `user`. El resto de las propiedades son accedidas de la manera normal.  Si queremos que algunas de ellas sean opcionales, necesitamos reemplazar más `.` con `?.`.

```warn header="No abuses del encadenamiento opcional"
Deberíamos usar `?.` solo donde está bien que algo no exista.

Por ejemplo, si de acuerdo con la lógica de nuestro código, el objeto `user` debe existir, pero `address` es opcional, entonces deberíamos escribir `user.address?.street` y no `user?.address?.street`.

De esta forma, si por un error `user` no está definido, lo sabremos y lo arreglaremos. De lo contrario, los errores de codificación pueden silenciarse donde no sea apropiado y volverse más difíciles de depurar.
```

````warn header="La variable antes de `?.` debe declararse"
Si no hay una variable `user` declarada, entonces `user?.anything` provocará un error:

```js run
// ReferenceError: user no está definido
user?.address;
```
La variable debe ser declarada (con `let/const/var user` o como parámetro de función). El encadenamiento opcional solo funciona para variables declaradas.
````

## Short-circuiting (Cortocircuitos)

Como se dijo antes, el `?.` detiene inmediatamente ("cortocircuito") la evaluación si la parte izquierda no existe.

Entonces, si a la derecha de `?.` hay funciones u operaciones adicionales, estas no se ejecutarán:

Por ejemplo:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no hay "user", por lo que la ejecución no alcanza a sayHi ni a x++

alert(x); // 0, el valor no se incrementa
```

## Otros casos: ?.(), ?.[]

El encadenamiento opcional `?.` no es un operador, es una construcción de sintaxis especial que también funciona con funciones y corchetes.

Por ejemplo, `?.()` se usa para llamar a una función que puede no existir.

En el siguiente código, algunos de nuestros usuarios tienen el método `admin`, y otros no:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // no pasa nada (no existe tal método)
*/!*
```

Aquí, en ambas líneas, primero usamos el punto (`userAdmin.admin`) para obtener la propiedad `admin`, porque asumimos que el objeto user existe y es seguro leerlo.

Entonces `?.()` comprueba la parte izquierda: si la función `admin` existe, entonces se ejecuta (para `userAdmin`). De lo contrario (para `userGuest`) la evaluación se detiene sin errores.

La sintaxis `?.[]` también funciona si quisiéramos usar corchetes `[]` para acceder a las propiedades en lugar de punto `.`. Al igual que en casos anteriores, permite leer de forma segura una propiedad de un objeto que puede no existir.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

También podemos usar `?.` con `delete`:

```js run
delete user?.name; // Eliminar user.name si el usuario existe
```

````warn header="Podemos usar `?.` para una lectura y eliminación segura, pero no para escribir"
El encadenamiento opcional `?.` no puede usarse en el lado izquierdo de una asignación:

Por ejemplo:
```js run
let user = null;

user?.name = "John"; // Error, no funciona
// porque se evalúa como: undefined = "John"
```

````

## Resumen

La sintaxis de encadenamiento opcional `?.` tiene tres formas:

1. `obj?.prop` -- devuelve `obj.prop` si `obj` existe, si no, `undefined`.
2. `obj?.[prop]` -- devuelve `obj[prop]` si `obj` existe, si no, `undefined`.
3. `obj.method?.()` -- llama a `obj.method()` si `obj.method` existe, si no devuelve `undefined`.

Como podemos ver, todos ellos son sencillos y fáciles de usar. El `?.` comprueba si la parte izquierda es `null/undefined` y permite que la evaluación continúe si no es así.

Una cadena de `?.` permite acceder de forma segura a las propiedades anidadas.

Aún así, debemos aplicar `?.` con cuidado, solamente donde sea aceptable que, de acuerdo con nuestra lógica, la parte izquierda no exista. Esto es para que no nos oculte errores de programación, si ocurren.
