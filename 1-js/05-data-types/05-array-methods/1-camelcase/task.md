importance: 5

---

# Transforma border-left-width en borderLeftWidth

Escribe la función `camelize(str)` que convierta palabras separadas por guión como "mi-cadena-corta" en palabras con mayúscula "miCadenaCorta".

Esto sería: remover todos los guiónes y que cada palabra después de un guión comience con mayúscula.

Ejemplos:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.D. Pista: usa `split` para dividir el string en un array, transformalo y vuelve a unirlo (`join`).
