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

Tenga en cuenta que aquí los paréntesis alrededor de `age > 18` no son requeridos. Existen para una mejor legibilidad.
