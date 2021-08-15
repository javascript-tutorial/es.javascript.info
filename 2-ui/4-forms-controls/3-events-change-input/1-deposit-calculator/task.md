importance: 5

---

# Calculadora de depósito

Crea una interfaz que permita ingresar una suma de depósito bancario y porcentaje, luego calcula cuánto será después de un periodo de tiempo determinado.

Acá una demostración:

[iframe src="solution" height="350" border="1"]

Cualquier modificación debe ser procesada de inmediato.

La fórmula es:
```js
// initial: la suma inicial de dinero
// interest: e.g. 0.05 significa 5% anual
// years: cuántos años esperar 
let result = Math.round(initial * (1 + interest) ** years);
```
