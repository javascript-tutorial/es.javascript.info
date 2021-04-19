Usando un operador signo de pregunta `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('¿Tus padres te lo permitieron?');
}
```

Usando Ó `||` (la variante más corta):

```js
function checkAge(age) {
  return (age > 18) || confirm('¿Tus padres te lo permitieron?');
}
```

<<<<<<< HEAD
Tenga en cuenta que los paréntesis alrededor de `age > 18` no son requeridos acá. Existen para una mejor legibilidad.
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96
