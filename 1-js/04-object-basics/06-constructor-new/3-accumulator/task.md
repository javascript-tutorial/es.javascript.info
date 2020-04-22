importance: 5

---

# Crear nuevo Acumulador

Crear una función contructor `Accumulator(valorInicial)`.

El objeto que crea debería:

- Almacene el "valor actual" en la propiedad `value`. El valor inicial se establece en el argumento del constructor `valorInicial`.
- El método `read ()` debe usar `prompt` para leer un nuevo número y agregarlo a` value`.

En otras palabras, la propiedad `value` es la suma de todos los valores ingresados por el usuario con el valor inicial` startingValue`.

Aquí está la demostración del código:

```js
let accumulator = new Accumulator(1); // valor inicial 1
accumulator.read(); // agrega el valor introducido por el usuario
accumulator.read(); // agrega el valor introducido por el usuario
alert(accumulator.value); // muestra la suma de estos valores
```

[demo]
