importance: 5

---

# Formulario modal

Crea una función `showPrompt(html, callback)`  que muestre un formulario con el mensaje `html`, un campo input y botones `OK/CANCELAR`.

- Un usuario debe escribir algo en el campo de texto y pulsar `key:Enter` o el botón OK, entonces `callback(value)` es llamado con el valor introducido.
- En caso contrario, si el usuario pulsa `key:Esc` o CANCELAR, entonces `callback(null)` es llamado.

En ambos casos se finaliza el proceso se y borra el formulario.

Requisitos:

- El formulario debe estar en el centro de la ventana.
- El formulario es *modal*. Es decir que no habrá interacción con el resto de la página, siempre que sea posible, hasta que el usuario lo cierre.
- Cuando se muestra el formulario, el foco debe estar en el `<input>` del usuario.
- Las teclas `key:Tab`/`key:Shift+Tab` deben alternar el foco entre los diferentes campos del formulario, no se permite cambiar el foco a otros elementos de la página. 

Ejemplo de uso:

```js
showPrompt("Escribe algo<br>...inteligente :)", function(value) {
  alert(value);
});
```

Demo en el iframe:

[iframe src="solution" height=160 border=1]

P.S. El código fuente tiene el HTML/CSS para el formulario con posición fija. Pero tú decides cómo haces el modal.
