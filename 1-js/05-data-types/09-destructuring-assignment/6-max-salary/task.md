importance: 5

---

# El salario máximo

Hay un objeto `salarios`:

```js
let salarios = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Crear la función `topSalary(salarios)` que devuelva el nombre de la persona mejor pagada.

- Si `salarios` es vacío, debería devolver `null`.
- Si hay varias personas con mejor paga, devolver cualquiera de ellos.

PD: Utilice `Object.entries` y desestructuración para iterar sobre pares de propiedades/valores.
