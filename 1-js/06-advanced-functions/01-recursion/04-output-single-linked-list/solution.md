# Solución basada en el bucle

La solución basada en el bucle:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Ten en cuenta que utilizamos una variable temporal `tmp` para recorrer la lista. Técnicamente, podríamos usar una función con una `list` de parámetros en su lugar:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Pero eso no sería prudente. En el futuro, es posible que necesitemos extender la función, hacer algo distinto con la lista. Si cambiamos `list`, entonces perdemos la habilidad.

Hablando sobre buenos nombres de variables, `list` aquí es la lista en sí. El primer elemento de la misma. Y debería permanecer así. Eso queda claro y fiable.

Desde el otro lado, el papel de `tmp` es exclusivamente para recorrer la lista, como `i` en el bucle `for`.

# Solución recursiva

La solución recursiva de `printList(list)` sigue una lógica simple: para generar una lista debemos generar el elemento actual `list`, luego hacer lo mismo con `list.next`:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // genera el elemento actual

  if (list.next) {
    printList(list.next); // hace lo mismo para el resto de la lista
  }

}

printList(list);
```

Ahora, ¿Qué es mejor?

Técnicamente, el bucle es más efectivo. Estas dos variantes hacen lo mismo, pero el bucle no gasta recursos en llamadas a funciones anidadas.

Por otro lado, la variante recursiva es más corta y a veces más sencilla de entender.
