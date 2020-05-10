importance: 5

---

# ¿Una función recoge los últimos cambios?

La función sayHi usa un nombre de variable externo. Cuando se ejecuta la función, ¿qué valor va a utilizar?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // ¿qué mostrará: "John" o "Pete"?

```
Tales situaciones son comunes tanto en el desarrollo del navegador como del lado del servidor. Se puede programar que una función se ejecute más tarde de lo que se creó, por ejemplo, después de una acción del usuario o una solicitud de red.

Entonces, la pregunta es: ¿recoge los últimos cambios?
