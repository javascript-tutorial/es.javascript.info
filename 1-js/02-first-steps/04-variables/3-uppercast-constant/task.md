importance: 4

---

# ¿const mayúsculas?

Examina el siguiente código:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aquí tenemos una constante `birthday` y `age` es calculada desde `birthday` con la ayuda de cierto código (no está provisto para abreviar y porque los detalles no importan aquí).

¿Sería correcto usar mayúsculas para `birthday`? ¿Para `age`? ¿O incluso para ambos?

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```

