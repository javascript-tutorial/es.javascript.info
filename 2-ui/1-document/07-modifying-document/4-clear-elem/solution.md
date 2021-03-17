
Primero veamos cómo *no* hacerlo:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

Eso no funciona, porque la llamada a `remove()` desplaza la colección `elem.childNodes`, entonces los elementos comienzan desde el índice `0` cada vez. Pero `i` se incrementa y algunos elementos serán saltados.

El bucle `for..of` también hace lo mismo.

Una variante correcta puede ser:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

Y también una manera más simple de hacer lo mismo:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
