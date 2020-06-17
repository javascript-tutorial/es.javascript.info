# Promesa: then versus catch

¿Son iguales estos fragmentos de código? En otras palabras, ¿se comportan de la misma manera en cualquier circunstancia, para cualquier función de controlador?

```js
promise.then(f1).catch(f2);
```

Versus:

```js
promise.then(f1, f2);
```
