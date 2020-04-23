
# Object.keys, valores, entradas

Alejémonos de las estructuras de datos individuales y hablemos sobre las iteraciones sobre ellas.

En el capítulo anterior vimos métodos `map.keys()`, `map.values()`, `map.entries()`.

Estos métodos son genéricos, existe un acuerdo común para usarlos para estructuras de datos. Si alguna vez creamos una estructura de datos propia, también deberíamos implementarla.

Son compatibles para:

- `Map`
- `Set`
- `Array`

Los objetos simples también admiten métodos similares, pero la sintaxis es un poco diferente.

## Object.keys, valores, entradas

Para objetos simples, los siguientes métodos están disponibles:

- [Object.keys(obj)](mdn:js/Object/keys) -- devuelve un array de propiedades.
- [Object.values(obj)](mdn:js/Object/values) -- devuelve un array de valores.
- [Object.entries(obj)](mdn:js/Object/entries) -- devuelve un array de pares `[propiedad, valor]` pairs.

Tenga en cuenta las distinciones (en comparación con map, por ejemplo):

|             | Map              | Objeto       |
|-------------|------------------|--------------|
| Sintaxis de llamada | `map.keys()`     | `Object.keys(obj)`, pero no `obj.keys()` |             
| Devuelve    | iterable    | "real" Array                     |

La primera diferencia es que tenemos que llamar `Object.keys(obj)`, y no `obj.keys()`.

¿Porque? La razón principal es la flexibilidad. Recuerda, los objetos son una base de todas las estructuras complejas en JavaScript. Entonces, podemos tener un objeto propio como `data` que implementa su propio método ` data.values () `. Y todavía podemos llamar a `Object.values (data)` en él. 

La segunda diferencia es que los métodos `Object. *` Devuelven objetos de array "reales", no solo un iterable. Eso es principalmente por razones históricas.

Por ejemplo:

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Aquí hay un ejemplo del uso de `Object.values` para recorrer los valores de propiedad:

```js run
let user = {
  name: "John",
  age: 30
};

// bucle sobre los valores
for (let value of Object.values(user)) {
  alert(value); // John, luego 30
}
```

```warn header="Object.keys/values/entries ignoran propiedades simbólicas"
Al igual que un bucle `for..in`, estos métodos ignoran propiedades que utilizan `Symbol(...)` como propiedades.

Normalmente, esto es conveniente. Pero si también queremos propiedades simbólicas, entonces hay un método aparte [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) que devuelve un array de únicamente propiedades simbólicas. También existe un método [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que devuelve *todas* las propiedades.
```


## Transformando objetos

Los objetos carecen de muchos métodos que existen para los arrays, p. Ej. `map`,` filter` y otros.

Si nos gustaría aplicarlos, entonces podemos usar `Object.entries` seguido de `Object.fromEntries`:

1. Use `Object.entries (obj)` para obtener un array de pares propiedad / valor de `obj`.
2. Use métodos de array en ese array, p. `map`.
3. Use `Object.fromEntries (array)` en el array resultante para convertirlo nuevamente en un objeto.

Por ejemplo, tenemos un objeto con precios y nos gustaría duplicarlos:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // conviertir a array, map, y luego fromEntries nos devuelve el objecto
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

Puede parecer difícil a primera vista, pero se vuelve fácil de entender después de usarlo una o dos veces. Podemos hacer poderosas cadenas de transformaciones de esta manera. 
