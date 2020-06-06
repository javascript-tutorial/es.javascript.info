
El método puede tomar todas las claves enumerables usando `Object.keys` y generar su lista.

Para hacer que `toString` no sea enumerable, definámoslo usando un descriptor de propiedad. La sintaxis de `Object.create` nos permite proporcionar un objeto con descriptores de propiedad como segundo argumento.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // define la propiedad toString
    value() { // el valor es una funcion
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Manzana";
dictionary.__proto__ = "prueba";

// manzana y __proto__ están en el ciclo
for(let key in dictionary) {
  alert(key); // "manzana", despues "__proto__"
}  

// lista de propiedades separadas por comas por toString
alert(dictionary); // "manzana,__proto__"
```

Cuando creamos una propiedad usando un descriptor, sus banderas son `false` por defecto. Entonces, en el código anterior, `dictionary.toString` no es enumerable.

Consulte el capítulo [](info:property-descriptors) para su revisión.
