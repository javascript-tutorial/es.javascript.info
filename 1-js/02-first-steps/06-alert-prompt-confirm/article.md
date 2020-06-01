# Interacción: alert, prompt, confirm

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Esta parte del tutorial pretende cubrir JavaScript "como es", sin ajustes específicos del entorno.

Pero como seguiremos utilizando el navegador como entorno de demostración, deberíamos conocer al menos algunas de sus funciones de la interfaz de usuario. En este capítulo, nos familiarizaremos con las funciones del navegador `alert`, `prompt` y `confirm`.

## alert

Sintaxis:

```js
alert(mensaje);
```

Esto muestra un mensaje y detiene la ejecución del script hasta que el usuario pulsa "OK".
=======
As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to presses "OK".
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Por ejemplo:

```js run
alert("Hola");
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
La mini-ventana con el mensaje se llama *ventana modal*. La palabra "modal" significa que el usuario no puede interactuar con el resto de la página, presionar otros botones, etc. hasta que no se haya ocupado de la ventana. En este caso, hasta que pulse "OK".
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

## prompt

La función `prompt` acepta dos argumentos:

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
Muestra una ventana modal con un mensaje de texto, un campo de entrada para el visitante y los botones OK/CANCELAR.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

`title`
: El texto a mostrar al usuario.

`default`
: Un segundo parámetro opcional, el valor inicial del campo de entrada.

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
El usuario puede escribir algo en el campo de entrada y pulsar OK. O puede cancelar la entrada pulsando CANCELAR o presionando la tecla `key:Esc`.
=======
```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter as optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

La llamada a `prompt` retorna el texto del campo de entrada o `null` si la entrada fue cancelada.

Por ejemplo:

```js run
let age = prompt ('¿Cuántos años tienes?', 100);

alert(`Tienes ${age} años!`); //Tienes 100 años!
```

````warn header="En IE: siempre proporciona un `predeterminado`"
El segundo parámetro es opcional, pero si no lo proporcionamos, Internet Explorer insertará el texto `"undefined"` en el prompt.

Ejecuta este código en Internet Explorer para verlo:

```js run
let test = prompt("Test");
```

Por lo tanto, para que las indicaciones se vean bien en IE, recomendamos siempre proporcionar el segundo argumento:

```js run
let test = prompt("Test", ''); // <-- para IE
```
````

## confirm

La sintaxis:

```js
result = confirm(pregunta);
```

<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
La función `confirm` muestra una ventana modal con una `pregunta` y dos botones: OK y CANCELAR.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

El resultado es `true` si se pulsa OK y `false` en caso contrario.

Por ejemplo:

```js run
let isBoss = confirm("¿Eres el jefe?");

alert( isBoss ); // true si se pulsa OK
```

## Resumen

Cubrimos 3 funciones específicas del navegador para interactuar con los usuarios:

`alert`
: muestra un mensaje.

`prompt`
<<<<<<< HEAD:1-js/02-first-steps/09-alert-prompt-confirm/article.md
: muestra un mensaje pidiendo al usuario que introduzca un texto. Retorna el texto o, si se hace clic en CANCELAR o `key:Esc`, retorna `null`.

`confirm`
: muestra un mensaje y espera a que el usuario pulse "OK" o "CANCELAR". Retorna `true` si se presiona OK y `false` si se presiona CANCEL/`key:Esc`.
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74:1-js/02-first-steps/06-alert-prompt-confirm/article.md

Todos estos métodos son modales: detienen la ejecución del script y no permiten que el usuario interactúe con el resto de la página hasta que la ventana se haya cerrado.

Hay dos limitaciones comunes a todos los métodos anteriores:

1. La ubicación exacta de la ventana modal está determinada por el navegador. Normalmente, está en el centro.
2. El aspecto exacto de la ventana también depende del navegador. No podemos modificarlo.

Ese es el precio de la simplicidad. Existen otras formas de mostrar ventanas más atractivas e interactivas para el usuario, pero si la "apariencia" no importa mucho, estos métodos funcionan bien.
