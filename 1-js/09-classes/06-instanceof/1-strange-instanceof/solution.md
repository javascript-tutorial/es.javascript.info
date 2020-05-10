Sí, se ve extraño de hecho.

Pero a `instanceof` no le importa la función, sino más bien su `prototype`, que coincide con la cadena del prototipo.

Y aquí `a.__ proto__ == B.prototype`, entonces `instanceof` devuelve `true`.

Entonces, según la lógica de `instanceof`, el `prototype` en realidad define el tipo, no la función constructora.
