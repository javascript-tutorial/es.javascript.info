importance: 4

---

# Reescriba la función utilizando '?' o '||'

La siguiente función devuelve `true` si el parametro `age` es mayour que `18`.

De lo contrario, solicita una confirmación y devuelve su resultado.

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('¿Tienes permiso de tus padres para acceder a esta página?');
  }
}
```

Reescríbalo, para realizar lo mismo, pero sin `if`, en una sola linea.

Haz dos variantes de `checkAge`:

1. Usando un operador de signo de interrogación `?`
2. Usando Ó `||`
