importance: 5

---

# Decorador debounce

<<<<<<< HEAD
El resultado del decorador `debounce(f, ms)` es un contenedor que suspende las llamadas a `f` hasta que haya `ms` milisegundos de inactividad (sin llamadas, "período de enfriamiento"), luego invoca `f` una vez con los últimos argumentos.

Por ejemplo, teníamos una función `f` y la reemplazamos con `f = debounce(f, 1000)`.

Entonces, si la función contenedora se llama a 0ms, 200ms y 500ms, y luego no hay llamadas, entonces la 'f' real solo se llamará una vez, a 1500ms. Es decir: después del período de enfriamiento de 1000 ms desde la última llamada.

![](debounce.svg)

... Y obtendrá los argumentos de la última llamada, y se ignorarán otras llamadas.

Aquí está el código para ello (usa el decorador debounce del [Lodash library](https://lodash.com/docs/4.17.15#debounce):
=======
The result of `debounce(f, ms)` decorator is a wrapper that suspends calls to `f` until there's `ms` milliseconds of inactivity (no calls, "cooldown period"), then invokes `f` once with the latest arguments.

For instance, we had a function `f` and replaced it with `f = debounce(f, 1000)`.

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual `f` will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

![](debounce.svg)

...And it will get the arguments of the very last call, other calls are ignored.

Here's the code for it (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce):
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500); 
<<<<<<< HEAD
// la función debounce espera 1000 ms después de la última llamada y luego ejecuta: alert ("c")
```


Ahora un ejemplo práctico. Digamos que el usuario escribe algo y nos gustaría enviar una solicitud al servidor cuando finalice la entrada.

No tiene sentido enviar la solicitud para cada caracter escrito. En su lugar, nos gustaría esperar y luego procesar todo el resultado.

En un navegador web, podemos configurar un controlador de eventos, una función que se llama en cada cambio de un campo de entrada. Normalmente, se llama a un controlador de eventos con mucha frecuencia, por cada tecla escrita. Pero si le pasamos `debounce` por 1000ms, entonces solo se llamará una vez, después de 1000ms después de la última entrada.

```online

En este ejemplo en vivo, el controlador coloca el resultado en un cuadro a continuación, pruébelo:

[iframe border=1 src="debounce" height=200]

¿Ve? La segunda entrada llama a la función debounce, por lo que su contenido se procesa después de 1000 ms desde la última entrada.
```

Entonces, `debounce` es una excelente manera de procesar una secuencia de eventos: ya sea una secuencia de pulsaciones de teclas, movimientos del mouse u otra cosa.


Espera el tiempo dado después de la última llamada y luego ejecuta su función, que puede procesar el resultado.

La tarea es implementar el decorador `debounce`.

Sugerencia: son solo algunas líneas si lo piensas :)
=======
// debounced function waits 1000ms after the last call and then runs: alert("c")
```


Now a practical example. Let's say, the user types something, and we'd like to send a request to the server when the input is finished.

There's no point in sending the request for every character typed. Instead we'd like to wait, and then process the whole result.

In a web-browser, we can setup an event handler -- a function that's called on every change of an input field. Normally, an event handler is called very often, for every typed key. But if we `debounce` it by 1000ms, then it will be only called once, after 1000ms after the last input.

```online

In this live example, the handler puts the result into a box below, try it:

[iframe border=1 src="debounce" height=200]

See? The second input calls the debounced function, so its content is processed after 1000ms from the last input.
```

So, `debounce` is a great way to process a sequence of events: be it a sequence of key presses, mouse movements or something else.


It waits the given time after the last call, and then runs its function, that can process the result.

The task is to implement `debounce` decorator.

Hint: that's just a few lines if you think about it :)
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
