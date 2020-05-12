
1. Para que todo funcione *de cualquier forma*, el resultado de `sum` debe ser una función.
2. Esa función debe mantener en la memoria el valor actual entre llamadas.
3. Según la tarea, la función debe convertirse en el número cuando se usa en `==`. Las funciones son objetos, por lo que la conversión se realiza como se describe en el capítulo <info:object-toprimitive>, y podemos proporcionar nuestro propio método para devolver el número.

Ahora el código:

```js run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Tenga en cuenta que la función `sum` en realidad solo funciona una vez. Devuelve la función `f`.

Luego, en cada llamada posterior, `f` agrega su parámetro a la suma` currentSum`, y se devuelve.

**No hay recursividad en la última línea de `f`.**

Así es como se ve la recursividad:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- llamada recursiva
}
```

Y en nuestro caso, solo devolvemos la función, sin llamarla:

```js
function f(b) {
  currentSum += b;
  return f; // <-- no se llama a sí mismo, se devuelve
}
```

Esta `f` se usará en la próxima llamada, nuevamente se devolverá, tantas veces como sea necesario. Luego, cuando se usa como un número o una cadena, el `toString` devuelve el `currentSum`. También podríamos usar `Symbol.toPrimitive`  o `valueOf` para la conversión.
