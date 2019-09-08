Using a question mark operator `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('¿Tús padres te lo permitieron?');
}
```

Usando Ó `||` (la variante más corta):

```js
function checkAge(age) {
  return (age > 18) || confirm('¿Tús padres te lo permitieron?');
}
```

Tenga en cuenta que los paréntesis alrededor de `age > 18` no son requeridos aca. Existen para una mejor legibilidad.
