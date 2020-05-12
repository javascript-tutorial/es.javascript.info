importance: 2

---

# Suma con una cantidad arbitraria de paréntesis

Escriba la función `sum` que funcionaría así:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.D Sugerencia: es posible que deba configurar un objeto personalizado para una conversión primitiva para su función.
