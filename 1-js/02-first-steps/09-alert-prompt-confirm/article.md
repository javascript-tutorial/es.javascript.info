# Interacción: alert, prompt, confirm

<<<<<<< HEAD
Esta parte del tutorial pretende cubrir JavaScript "como es", sin ajustes específicos del entorno.
=======
In this part of the tutorial we cover JavaScript language "as is", without environment-specific tweaks.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

Pero como seguiremos utilizando el navegador como entorno de demostración, deberíamos conocer al menos algunas de sus funciones de la interfaz de usuario. En este capítulo, nos familiarizaremos con las funciones del navegador `alert`, `prompt` y `confirm`.

## alert

Sintaxis:

```js
alert(mensaje);
```

Esto muestra un mensaje y detiene la ejecución del script hasta que el usuario pulsa "OK".

Por ejemplo:

```js run
alert("Hola");
```

La mini-ventana con el mensaje se llama *ventana modal*. La palabra "modal" significa que el usuario no puede interactuar con el resto de la página, presionar otros botones, etc. hasta que no se haya ocupado de la ventana. En este caso, hasta que pulse "OK".

## prompt

La función `prompt` acepta dos argumentos:

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
Muestra una ventana modal con un mensaje de texto, un campo de entrada para el visitante y los botones OK/CANCELAR.
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

`title`
: El texto a mostrar al usuario.

`default`
: Un segundo parámetro opcional, el valor inicial del campo de entrada.

<<<<<<< HEAD
El usuario puede escribir algo en el campo de entrada y pulsar OK. O puede cancelar la entrada pulsando CANCELAR o presionando la tecla `key:Esc`.
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

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

<<<<<<< HEAD
La función `confirm` muestra una ventana modal con una `pregunta` y dos botones: OK y CANCELAR.
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

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
<<<<<<< HEAD
: muestra un mensaje pidiendo al usuario que introduzca un texto. Retorna el texto o, si se hace clic en CANCELAR o `key:Esc`, retorna `null`.

`confirm`
: muestra un mensaje y espera a que el usuario pulse "OK" o "CANCELAR". Retorna `true` si se presiona OK y `false` si se presiona CANCEL/`key:Esc`.
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

Todos estos métodos son modales: detienen la ejecución del script y no permiten que el usuario interactúe con el resto de la página hasta que la ventana se haya cerrado.

Hay dos limitaciones comunes a todos los métodos anteriores:

1. La ubicación exacta de la ventana modal está determinada por el navegador. Normalmente, está en el centro.
2. El aspecto exacto de la ventana también depende del navegador. No podemos modificarlo.

Ese es el precio de la simplicidad. Existen otras formas de mostrar ventanas más atractivas e interactivas para el usuario, pero si la "apariencia" no importa mucho, estos métodos funcionan bien.
