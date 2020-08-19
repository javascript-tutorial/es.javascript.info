importance: 4

---

# ¿Qué día del mes era hace algunos días atrás?

Crea una función `getDateAgo(date, days)` que devuelva el día del mes que corresponde, contando la cantidad de días `days` respecto de la fecha `date`.

Por ejemplo, si hoy es 20, entonces `getDateAgo(new Date(), 1)` debería ser 19 y `getDateAgo(new Date(), 2)` debería ser 18.

Debe poder funcionar para `days=365` o más:

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.D.: La función no debería modificar la fecha `date` pasada como argumento.
