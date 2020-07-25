importance: 5

---

# Verificar los vacíos

Escribe la función `isEmpty(obj)` que devuelva el valor `true` si el objeto no tiene propiedades, en caso contrario `false`.

Debería funcionar así:

```js
let schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "Hora de levantarse";

alert( isEmpty(schedule) ); // false
```

