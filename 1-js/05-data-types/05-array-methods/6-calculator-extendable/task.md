importance: 5

---

# Crea una calculadora extensible

Crea una función `Calculator` que cree objetos calculadores "extensibles".

La actividad consiste de dos partes.

1. Primero, implementar el método `calculate(str)` que toma un string como `"1 + 2"` en el formato "NUMERO operador NUMERO" (delimitado por espacios) y devuelve el resultado. Debe entender más `+` y menos `-`.

    Ejemplo de uso:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Luego agrega el método `addMethod(name, func)` que enseñe a la calculadora una nueva operación. Toma el operador `name` y la función con dos argumentos `func(a,b)` que lo implementa.

    Por ejemplo, vamos a agregar la multiplicación `*`, division `/` y potencia `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- Sin paréntesis ni expresiones complejas en esta tarea.
- Los números y el operador deben estar delimitados por exactamente un espacio.
- Puede haber manejo de errores si quisieras agregarlo.
