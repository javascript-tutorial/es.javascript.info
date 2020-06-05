importance: 4

---

# Filtrar anagramas

[Anagramas](https://es.wikipedia.org/wiki/Anagrama) son palabras que tienen el mismo número de letras, pero en diferente orden.

Por ejemplo:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Escriba una función `aclean(arr)` que devuelva un array limpio de anagramas.

Por ejemplo:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" o "PAN,cheaters,era"
```

Es decir, de cada grupo de anagramas debe quedar solo una palabra, sin importar cual.
