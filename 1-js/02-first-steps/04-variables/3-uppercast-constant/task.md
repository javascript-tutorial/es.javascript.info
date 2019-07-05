importance: 4

---

# Mayusculas const?

Examina el siguiente codigo:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aqui tenemos una constante `birthday` y `age` es calculada desde `birthday` con la ayuda de cierto codigo (no esta provisto para abreviacion, y porque los detalles no importan aqui).

Seria correcto usar mayusculas para `birthday`? Para `age`? O incluso para ambos?

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```

