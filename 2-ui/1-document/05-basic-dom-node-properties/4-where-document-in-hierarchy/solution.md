
Podemos ver a qué clase pertenece, imprimiéndola, así:

```js run
alert(document); // [object HTMLDocument]
```

O:

```js run
alert(document.constructor.name); // HTMLDocument
```

Entonces, `document` es una instancia de la clase `HTMLDocument`.

¿Cuál es su lugar en la jerarquía?

Sí, podríamos examinar las especificaciones, pero sería más rápido averiguarlo manualmente.

Recorramos la cadena de prototype través de `__proto__`.

Como sabemos, los métodos de una clase están en el `prototype` del constructor. Por ejemplo, `HTMLDocument.prototype` tiene métodos para documentos.

Además, hay una referencia a la función constructor dentro de `prototype`:

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

Para obtener un nombre de la clase como string, podemos usar `constructor.name`. Hagámoslo para toda la cadena prototype de `document`, hasta la clase `Node`:

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

Esa es la jerarquía.

También podríamos examinar el objeto usando `console.dir(document)` y ver estos nombres abriendo `__proto__`. La consola los toma del `constructor` internamente.
