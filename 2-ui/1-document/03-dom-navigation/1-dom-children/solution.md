Hay muchas maneras, por ejemplo:


El nodo `<div>` del DOM:

```js
document.body.firstElementChild
// o
document.body.children[0]
// o (el primer nodo es un espacio, así que tomamos el segundo)
document.body.childNodes[1]
```

El nodo `<ul>` del DOM:

```js
document.body.lastElementChild
// o
document.body.children[1]
```

El segundo `<li>` (con Pete):

```js
// obtener <ul>, y luego obtener su último elemento hijo
document.body.lastElementChild.lastElementChild
```
