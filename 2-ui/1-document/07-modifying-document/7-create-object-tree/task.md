importance: 5

---

# Crea un árbol desde el objeto

Escribe una función `createTree` que crea una lista ramificada `ul/li` desde un objeto ramificado.

Por ejemplo:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

La sintaxis:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // crea el árbol en el contenedor
*/!*
```

El árbol resultante debe verse así:

[iframe border=1 src="build-tree-dom"]

Elige una de estas dos formas para resolver esta tarea:

1. Crear el HTML para el árbol y entonces asignarlo a `container.innerHTML`.
2. Crear los nodos del árbol y añadirlos con métodos DOM.

Sería muy bueno que hicieras ambas soluciones.

P.S. El árbol no debe tener elementos "extras" como `<ul></ul>` vacíos para las hojas.
