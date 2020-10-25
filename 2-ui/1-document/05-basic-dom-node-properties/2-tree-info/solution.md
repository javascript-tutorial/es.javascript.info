Hagamos un ciclo sobre `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

En el ciclo, necesitamos introducir el texto dentro de cada `li`.

Podemos leer el texto del primer nodo hijo de `li`, que es el nodo de texto:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // el título es el texto en <li> antes de cualquier otro nodo
}
```

Entonces podemos obtener el número de descendientes como `li.getElementsByTagName('li').length`.
