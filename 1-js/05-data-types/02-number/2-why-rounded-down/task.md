importance: 4

---

# ¿Por qué 6.35.toFixed(1) == 6.3?

Según la documentación `Math.round` y `toFixed` redondean al número más cercano: `0..4` hacia abajo mientras `5..9` hacia arriba.

Por ejemplo:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

En el ejemplo  similar que sigue, ¿por qué `6.35` es redondeado a `6.3`, y no a `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

¿Cómo redondear `6.35` de manera correcta?

