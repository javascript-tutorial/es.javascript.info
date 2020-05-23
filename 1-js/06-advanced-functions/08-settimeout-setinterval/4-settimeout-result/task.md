importance: 5

---

# ¿Qué mostrará setTimeout?

En el siguiente código hay una llamada programada `setTimeout`, luego se ejecuta un cálculo pesado, que demora más de 100 ms en finalizar.

¿Cuándo se ejecutará la función programada?

1. Después del bucle.
2. Antes del bucle.
3. Al comienzo del bucle.


¿Qué va a mostrar "alerta"?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// supongamos que el tiempo para ejecutar esta función es> 100 ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
