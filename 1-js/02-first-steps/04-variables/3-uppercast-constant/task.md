importance: 4

---

# ¿const mayúsculas?

Examina el siguiente código:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
Aquí tenemos una constante `birthday` y `age` es calculada desde `birthday` con la ayuda de cierto código (no está provisto para abreviar y porque los detalles no importan aquí).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

¿Sería correcto usar mayúsculas para `birthday`? ¿Para `age`? ¿O incluso para ambos?

```js
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
```
