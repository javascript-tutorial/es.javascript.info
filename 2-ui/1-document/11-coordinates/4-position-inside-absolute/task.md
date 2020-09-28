importance: 5

---

# Posiciona la nota adentro (absolute)

Ampliando a la tarea anterior <info:task/position-at-absolute>: enséñale a la función `positionAt(anchor, position, elem)` a insertar `elem` dentro de `anchor`.

Los nuevos valores para posición son `position`:

- `top-out`, `right-out`, `bottom-out` -- funciona ingual que antes, inserta el `elem` encima, a la derecha o debajo de `anchor`.
- `top-in`, `right-in`, `bottom-in` -- inserta el `elem` dentro del `anchor`: lo fija en la parte superior, derecha o inferior del borde.

Por ejemplo:

```js
// Muestra la nota encima de la cita textual
positionAt(blockquote, "top-out", note);

// Muestra la nota dentro de la cita textual en la parte superior
positionAt(blockquote, "top-in", note);
```

El resultado:

[iframe src="solution" height="310" border="1" link]

Para el código fuente toma la solución de la tarea <info:task/position-at-absolute>.
