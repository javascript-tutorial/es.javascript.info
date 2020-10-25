
Para agregar el botón podemos usar cualquiera de las opciones `position:absolute` (y hacer el panel `position:relative`) o `float:right`. El `float:right` tiene la ventaja de que el botón no se encima con el texto, pero  `position:absolute` da más libertad. Entonces la elección es tuya.

Luego, para cada panel, el código puede ser así:
```js
pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
```

Luego el `<button>` se convierte en `pane.firstChild`, por lo que podemos agregarle un controlador como este:

```js
pane.firstChild.onclick = () => pane.remove();
```
