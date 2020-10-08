# Usando recursividad

La lógica recursiva es un poco complicada aquí.

Primero necesitamos generar el resto de la lista y *entonces* generar la lista actual:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Usando un bucle

La variante con bucle también es un poco más complicada que la salida directa.

No hay manera de obtener el último valor en nuestra `list`. Tampoco podemos ir "hacia atrás".

Entonces, lo que podemos hacer primero es recorrer los elementos en el orden directo guardándolos en un array, y entonces generar los elementos guardados en el orden inverso:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

Ten en cuenta que la solución recursiva en realidad hace exactamente lo mismo: recorre la lista, guarda los elementos en la cadena de llamadas anidadas (en la pila de contexto de ejecución), y luego los genera.
