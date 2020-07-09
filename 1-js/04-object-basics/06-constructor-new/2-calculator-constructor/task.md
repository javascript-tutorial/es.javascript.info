importance: 5

---

# Crear nueva Calculadora

Crear una función constructora `Calculator` que crea objetos con 3 métodos:

- `read()` pide dos valores usando `prompt` y los recuerda en las propiedades del objeto.
- `sum()` devuelve la suma de estas propiedades.
- `mul()` devuelve el producto de multiplicación de estas propiedades.

Por ejemplo:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
