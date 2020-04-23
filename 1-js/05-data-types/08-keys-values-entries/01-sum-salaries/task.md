importance: 5

---

# Suma las propiedades

Hay un objeto `salaries` con un número arbitrario de salarios. 

Escriba la función `sumSalaries(salaries)` que devuelva la suma de todos los salarios utilizando `Object.values` y el bucle `for..of`.

Si `salaries` está vacío, entonces el resultado debe ser `0`.

Por ejempl:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

