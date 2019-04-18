Hay muchas maneras, por ejemplo:


El nodo DOM `<div>`:

```js
document.body.firstElementChild
// o
document.body.children[0]
// o (el primer nodo es el espacio, así que tomamos el segundo)
document.body.childNodes[1]
```

El nodo DOM `<ul>`:

```js
document.body.lastElementChild
// o
document.body.children[1]
```

El segundo `<li>` (con Pedro):

```js
// obtener <ul>, y luego obtener su último elemento hijo
document.body.lastElementChild.lastElementChild
```
