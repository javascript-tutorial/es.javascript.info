importance: 4

---

# ¿const mayúsculas?

Examina el siguiente código:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Aquí tenemos una constante `birthday` para la fecha de cumpleaños, y la edad `age`, que también es constante.

`age` es calculada desde `birthday` con la ayuda de "cierto código" `someCode()`, que es una llamada a función que no hemos explicado aún (¡lo haremos pronto!); los detalles no importan aquí, el punto es que `age` se calcula de alguna forma basándose en `birthday`.

¿Sería correcto usar mayúsculas en `birthday`? ¿Y en `age`? ¿O en ambos?

```js
const BIRTHDAY = '18.04.1982'; // ¿birthday en mayúsculas?

const AGE = someCode(BIRTHDAY); // ¿age en mayúsculas?
```
