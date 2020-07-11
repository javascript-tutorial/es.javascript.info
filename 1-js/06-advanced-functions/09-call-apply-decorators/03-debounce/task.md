importance: 5

---

# Decorador debounce

El resultado del decorador `debounce(f, ms)` es un contenedor que suspende las llamadas a `f` hasta que haya `ms` milisegundos de inactividad (sin llamadas, "período de enfriamiento"), luego invoca `f` una vez con los últimos argumentos.

Por ejemplo, teníamos una función `f` y la reemplazamos con `f = debounce(f, 1000)`.

Entonces, si la función contenedora se llama a 0ms, 200ms y 500ms, y luego no hay llamadas, entonces la 'f' real solo se llamará una vez, a 1500ms. Es decir: después del período de enfriamiento de 1000 ms desde la última llamada.

![](debounce.svg)

... Y obtendrá los argumentos de la última llamada, y se ignorarán otras llamadas.

Aquí está el código para ello (usa el decorador debounce del [Lodash library](https://lodash.com/docs/4.17.15#debounce):

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500); 
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
