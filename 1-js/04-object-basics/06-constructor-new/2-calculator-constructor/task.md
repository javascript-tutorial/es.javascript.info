importance: 5

---

# Crear nueva Calculadora

Crear una función constructora `Calculator` que crea objetos con 3 métodos:

<<<<<<< HEAD
- `read()` pide dos valores usando `prompt` y los recuerda en las propiedades del objeto.
- `sum()` devuelve la suma de estas propiedades.
- `mul()` devuelve el producto de multiplicación de estas propiedades.
=======
- `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
- `sum()` returns the sum of these properties.
- `mul()` returns the multiplication product of these properties.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Por ejemplo:

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
