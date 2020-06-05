# Map y Set

Hasta este momento, hemos aprendido sobre las siguientes estructuras de datos:

- Objetos para almacenar colecciones de propiedades.
- Arrays para almacenar colecciones ordenadas.

Pero eso no es suficiente para la vida real. Por eso también existen Map y Set.

## Map

[Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map) es una colección de elementos de datos con propiedad, al igual que un objeto, y valor. Pero la principal diferencia es que Map permite propiedades de cualquier tipo.

Los métodos y propiedades son:

- `new Map()` -- crea el mapa.
- `map.set(propiedad, valor)` -- almacena el valor para la propiedad.
- `map.get(propiedad)` -- devuelve el valor de la propiedad: será `undefined` si la `propiedad` no exite en Map.
- `map.has(propiedad)` -- devuelve`true` si la `propiedad` exite, y `false` si no existe.
- `map.delete(propiedad)` -- elimina los valores de la propiedad.
- `map.clear()` -- limpia el Map.
- `map.size` -- retorna el número del elemento actual en el recuento de elementos en el Map.

Por ejemplo:

```js run
let map = new Map();

map.set('1', 'str1');   // un string como propiedad
map.set(1, 'num1');     // un número como propiedad
map.set(true, 'bool1'); // un booleano como propiedad

// recuerda el objeto regular? convertiría las propiedades en un string
// Map mantiene el tipo de dato en las propiedades, por lo que estas dos son diferentes:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Como podemos ver, a diferencia de los objetos, las propiedades no se convierten en strings. Cualquier tipo de propiedad es posible en un Map.

```smart header="map[propiedad] no es la forma correcta para usar Map"
Aunque el map[propiedad] también funciona, por ejemplo, podemos establecer map[propiedad] = 2, esto es tratar a map como un objeto JavaScript simple, por lo que implica todas las limitaciones correspondientes (sin objetos como propiedad, etc.).

Por lo tanto, deberíamos usar los métodos de `Map`: set, get, etc.
```

**El mapa también puede usar objetos como propiedades.**

Por ejemplo:

```js run
//John es un objeto
let john = { name: "John" };

// para cada usuario, almacenemos el recuento de visitas
let visitsCountMap = new Map();

// John es la propiedad para el Map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

El uso de objetos como propiedades es una de las características de `Map` más notables e importantes. Para las propiedades de tipo string, `Object` puede estar bien, pero no para las propiedades de tipo objeto.

Intentémoslo:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // intenta usar un objeto

visitsCountObj[john] = 123; // intenta usar el objeto john como propiedad

// Esto es lo que se escribió!
alert( visitsCountObj["[object Object]"] ); // 123
```

Como `visitsCountObj` es un objeto, convierte todas las propiedades, como John en string, por lo que tenemos la propiedad de tipo string `"[objeto Objeto]"`. Definitivamente no es lo que queremos.


```smart header="Cómo `Map` compara las propiedades"
`Map` utiliza el algoritmo [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero). Es aproximadamente lo mismo que la igualdad estricta `===`, pero la diferencia es que `NaN` se considera igual a `NaN`. Por lo tanto, `NaN` también se puede usar como propiedad.

Este algoritmo no se puede cambiar ni personalizar.
```

````smart header="Encadenamiento"
Cada llamada a `map.set` devuelve Map en sí, para que podamos "encadenar" las llamadas:

```js
map.set('1', 'str1')
   .set(1, 'num1')
   .set(true, 'bool1');
```
````

## Iteración sobre Map
Para recorrer un `Map`, hay 3 métodos:

- `map.keys()` – devuelve un iterable para las propiedades.
- `map.values()` – devuelve un iterable para los valores.
- `map.entries()` – devuelve un iterable para las entradas `[propiedad, valor]`, se usa por defecto en `for..of`.

Por ejemplo:

```js run
let recipeMap = new Map([
  ['pepino', 500],
  ['tomates', 350],
  ['cebollas',    50]
]);

// iterando sobre las propiedades (verduras)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // pepino, tomates, cebollas
}

// iterando sobre los valores (precios)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterando sobre las entradas [propiedad, valor]
for (let entry of recipeMap) { // lo mismo que recipeMap.entries()
  alert(entry); // pepino,500 (etc)
}
```
```smart header="Se utiliza el orden de inserción."
La iteración va en el mismo orden en que se insertaron los valores. `Map` conserva este orden, a diferencia de un `Objeto` normal.
```

Además de eso, `Map` tiene un método `forEach` incorporado, similar a `Array`:

```js
// recorre la función para cada par (propiedad, valor)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // pepino: 500 etc
});
```

## Object.entries: Map desde Objeto

Cuando se crea un `Map`, podemos pasar un array (u otro iterable) con pares propiedad / valor para la inicialización, de esta manera:

```js run
// array de [propiedad, valor]
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```
Aquí hay un método incorporado [Object.entries(obj)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/entries) que devuelve un array de pares propiedad / valor para un objeto exactamente en ese formato.

Entonces podemos inicializar un mapa desde un objeto como este:

```js run
let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```

Aquí, `Object.entries` devuelve el array de pares propiedad / valor: [["" name "," John "], [" age ", 30]]. Eso es lo que necesita `Map`.

## Object.fromEntries: Objeto desde Map
Acabamos de ver cómo crear un `Map` a partir de un objeto simple con `Object.entries (obj).`

Existe el método `Object.fromEntries` que hace lo contrario: dado un array de pares [propiedad, valor], crea un objeto a partir de ellos:
```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// ahora prices es un objeto = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```
Podemos usar `Object.fromEntries` para obtener un objeto plano de `Map`.

Ej. almacenamos los datos en un `Map`, pero necesitamos pasarlos a un código de terceros que espera un objeto simple.

Aquí vamos:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // hace un objeto simple

// Hecho!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

Una llamada a `map.entries()` devuelve un array de pares propiedad / valor, exactamente en el formato correcto para `Object.fromEntries.`

También podríamos acortar la línea 6 del ejemplo anterior:

```js
let obj = Object.fromEntries(map); // omitimos .entries()
```
Es lo mismo, porque `Object.fromEntries` espera un objeto iterable como argumento. No necesariamente un array. Y la iteración estándar para el `Map` devuelve los mismos pares propiedad / valor que `map.entries()`. Entonces obtenemos un objeto simple con las mismas propiedades / valores que `Map`.

## Set
`Set` es una colección de tipo especial: "conjunto de valores" (sin propiedades), donde cada valor puede aparecer solo una vez.

Sus principales métodos son:

- `new Set(iterable)` -- crea el set y, si se proporciona un objeto iterable (generalmente un array), copia los valores del mismo en el set.
- `set.add(valor)` -- agrega un valor, devuelve el set en sí.
- `set.delete(valor)` -- elimina el valor, devuelve `true` si `valor` existe al momento de la llamada, si no, devuelve `false`.
- `set.has(valor)` -- devuelve `true` si el valor existe en el set, si no, devuelve `false`.
- `set.clear()` -- elimina todo del set.
- `set.size` -- es el contador de los elementos.

La característica principal es que las llamadas repetidas de `set.add (valor)` con el mismo valor no hacen nada. Esa es la razón por la cual cada valor aparece en `Set` solo una vez.

Por ejemplo, tenemos visitantes que vienen y nos gustaría recordar a todos. Pero las visitas repetidas no deberían conducir a duplicados. Un visitante debe ser "contado" solo una vez.

`Set` es lo correcto para eso:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visitas, algunos usuarios lo hacen varias veces
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set solo guarda valores únicos
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (luego Pete y Mary)
}
```
La alternativa a `Set` podría ser un array de usuarios y el código para verificar si hay duplicados en cada inserción usando [arr.find](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Pero el rendimiento sería mucho peor, porque este método recorre el array completo comprobando cada elemento. `Set` está mucho mejor optimizado internamente para verificaciones de unicidad.

## Iteración sobre Set
Podemos recorrer `Set` con `for..of` o usando `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// lo mismo que forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Tenga en cuenta algo gracioso: la función callback pasada en forEach tiene 3 argumentos:  un valor, luego el mismo valor "valueAgain" y luego el objeto de destino que es set. El mismo valor aparece en los argumentos dos veces.

Eso es por compatibilidad con `Map` donde la función callback tiene tres argumentos. Parece un poco extraño, seguro. Pero puede ayudar a reemplazar `Map` con `Set` en ciertos casos con facilidad, y viceversa.

También soporta los mismos métodos que `Map` tiene para los iteradores:

- `set.keys()` – devuelve un iterable para las propiedades.
- `set.values()` – lo mismo que `set.keys()`, por su compatibilidad con `Map`.
- `set.entries()` – devuelve un iterable para las entradas `[propiedad, valor]`, por su compatibilidad con `Map`.

## Resumen
`Map`: es una colección de valores con propiedad.

Métodos y propiedades:
- `new Map()` -- crea el mapa.
- `map.set(propiedad, valor)` -- almacena el valor para la propiedad.
- `map.get(propiedad)` -- devuelve el valor de la propiedad: será `undefined` si la `propiedad` no exite en Map.
- `map.has(propiedad)` -- devuelve`true` si la `propiedad` exite, y `false` si no existe.
- `map.delete(propiedad)` -- elimina los valores de la propiedad.
- `map.clear()` -- limpia el Map.
- `map.size` -- retorna el número del elemento actual en el recuento de elementos en el Map.

La diferencia con `Objeto` regular:
- Cualquier propiedad, los objetos tambien pueden ser propiedads.
- Adicionalmente tiene métodos que nos convienen, como la propiedad `size`.

`Set`: es una colección de valores únicos.

Métodos y propiedades:
- `new Set(iterable)` -- crea el set y, si se proporciona un objeto iterable (generalmente un array), copia los valores del mismo en el set.
- `set.add(valor)` -- agrega un valor, devuelve el set en sí.
- `set.delete(valor)` -- elimina el valor, devuelve `true` si `valor` existe al momento de la llamada, si no, devuelve `false`.
- `set.has(valor)` -- devuelve `true` si el valor existe en el set, si no, devuelve `false`.
- `set.clear()` -- elimina todo del set.
- `set.size` -- es el contador de los elementos.

La iteración sobre `Map` y `Set` siempre está en el orden de inserción, por lo que no podemos decir que estas colecciones están desordenadas, pero no podemos reordenar elementos u obtener un elemento directamente por su número.
