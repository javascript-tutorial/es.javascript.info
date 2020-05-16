importance: 5

---

# Crea un objeto con el mismo constructor

Imagínese, tenemos un objeto arbitrario `obj`, creado por una función constructora; no sabemos cuál, pero nos gustaría crear un nuevo objeto con él.

¿Podemos hacerlo así?

```js
let obj2 = new obj.constructor();
```

Dé un ejemplo de una función constructora para `obj` que permita que dicho código funcione correctamente. Y un ejemplo que hace que funcione mal.
