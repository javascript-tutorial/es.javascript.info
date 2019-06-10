# Interacción: alert, prompt, confirm

<<<<<<< HEAD
Esta parte del tutorial pretende cubrir JavaScript "como es", sin ajustes específicos del entorno.
=======
In this part of the tutorial we cover JavaScript language "as is", without environment-specific tweaks.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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

Muestra una ventana modal con un mensaje de texto, un campo de entrada para el visitante y los botones OK/CANCELAR.

`title`
: El texto a mostrar al usuario.

`default`
: Un segundo parámetro opcional, el valor inicial del campo de entrada.

El usuario puede escribir algo en el campo de entrada y pulsar OK. O puede cancelar la entrada pulsando CANCELAR o presionando la tecla `key:Esc`.

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

La función `confirm` muestra una ventana modal con una `pregunta` y dos botones: OK y CANCELAR.

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
: muestra un mensaje pidiendo al usuario que introduzca un texto. Retorna el texto o, si se hace clic en CANCELAR o `key:Esc`, retorna `null`.

`confirm`
: muestra un mensaje y espera a que el usuario pulse "OK" o "CANCELAR". Retorna `true` si se presiona OK y `false` si se presiona CANCEL/`key:Esc`.

Todos estos métodos son modales: detienen la ejecución del script y no permiten que el usuario interactúe con el resto de la página hasta que la ventana se haya cerrado.

Hay dos limitaciones comunes a todos los métodos anteriores:

1. La ubicación exacta de la ventana modal está determinada por el navegador. Normalmente, está en el centro.
2. El aspecto exacto de la ventana también depende del navegador. No podemos modificarlo.

Ese es el precio de la simplicidad. Existen otras formas de mostrar ventanas más atractivas e interactivas para el usuario, pero si la "apariencia" no importa mucho, estos métodos funcionan bien.
