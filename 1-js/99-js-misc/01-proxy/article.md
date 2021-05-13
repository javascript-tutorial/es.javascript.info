# Proxy y Reflect

Un objeto `Proxy` envuelve (es un "wrapper": envoltura, contenedor) a otro objeto e intercepta sus operaciones (como leer y escribir propiedades, entre otras). El proxy puede manejar estas operaciones él mismo o, en forma transparente permitirle manejarlas al objeto envuelto.

Los proxys son usados en muchas librerías y en algunos frameworks de navegador. En este artículo veremos muchas aplicaciones prácticas.

## Proxy

La sintaxis:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- es el objeto a envolver, puede ser cualquier cosa, incluso funciones.
- `handler` -- configuración de proxy: un objeto que "atrapa", métodos que interceptan operaciones. Ejemplos, la trampa `get` para leer una propiedad de `target`, la trampa `set` para escribir una propiedad en `target`, entre otras.

Cuando hay una operación sobre `proxy`, este verifica si hay una trampa correspondiente en `handler`. Si la trampa existe se ejecuta y el proxy tiene la oportunidad de manejarla, de otro modo la operación es ejecutada por `target`.

Como ejemplo para comenzar, creemos un proxy sin ninguna trampa:

```js run
let target = {};
let proxy = new Proxy(target, {}); // manejador vacío

proxy.test = 5; // escribiendo en el proxy (1)
alert(target.test); // 5, ¡la propiedad apareció en target!

alert(proxy.test); // 5, también podemos leerla en el proxy (2)

for(let key in proxy) alert(key); // test, la iteración funciona (3)
```

Como no hay trampas, todas las operaciones sobre `proxy` son redirigidas a `target`.

1. Una operación de escritura `proxy.test=` establece el valor en `target`.
2. Una operación de lectura `proxy.test` devuelve el valor desde `target`.
3. La iteración sobre `proxy` devuelve valores de `target`.

Como podemos ver, sin ninguna trampa, `proxy` es un envoltorio transparente alrededor de `target`.

![](proxy.svg)

`Proxy` es un "objeto exótico" especial. No tiene propiedades propias. Con un manejador transparente redirige todas las operaciones hacia `target`.

Para activar más habilidades, agreguemos trampas.

¿Qué podemos interceptar con ellas?

Para la mayoría de las operaciones en objetos existe el denominado "método interno" en la especificación Javascript que describe cómo este trabaja en el más bajo nivel. Por ejemplo `[[Get]]`: es el método interno para leer una propiedad, `[[Set]]`: el método interno para escribirla, etcétera. Estos métodos solamente son usados en la especificación, no podemos llamarlos directamente por nombre.

Las trampas del proxy interceptan la invocación a estos métodos. Están listadas en la [Especificación del proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) y en la tabla debajo.

Para cada método interno, existe una "trampa" en esta tabla: es el nombre del método que podemos agregar al parámetro `handler` de `new Proxy` para interceptar la operación:

| Método interno | Método manejador | Cuándo se dispara |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | leyendo una propiedad |
| `[[Set]]` | `set` | escribiendo una propiedad |
| `[[HasProperty]]` | `has` | operador `in` |
| `[[Delete]]` | `deleteProperty` | operador `delete`|
| `[[Call]]` | `apply` | llamado a función |
| `[[Construct]]` | `construct` | operador `new` |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

```warn header="Invariantes"
JavaScript impone algunas invariantes: condiciones que deben ser satisfechas por métodos internos y trampas.

La mayor parte de ellos son para devolver valores:
- `[[Set]]` debe devolver `true` si el valor fue escrito correctamente, de otro modo `false`.
- `[[Delete]]` debe devolver `true` si el valor fue borrado correctamente, de otro modo `false`.
- ...y otros, veremos más ejemplos abajo.

Existen algunas otras invariantes, como:
- `[[GetPrototypeOf]]`, aplicado al proxy, debe devolver el mismo valor que `[[GetPrototypeOf]]` aplicado al "target" del proxy. En otras palabras, leer el prototipo de un proxy debe devolver siempre el prototipo de su objeto target.

Las trampas pueden interceptar estas operaciones, pero deben seguir estas reglas.

Las invariantes aseguran un comportamiento correcto y consistente de características de lenguaje. La lista completa de invariantes está en [la especificación](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). Probablemente no las infringirás si no estás haciendo algo retorcido.
```

Veamos cómo funciona en ejemplos prácticos.

## Valores "por defecto" con la trampa "get"

Las trampas más comunes son para leer y escribir propiedades.

Para interceptar una lectura, el `handler` debe tener un método `get(target, property, receiver)`.

Se dispara cuando una propiedad es leída, con los siguientes argumentos:

- `target` -- "objetivo", es el objeto pasado como primer argumento a `new Proxy`,
- `property` -- nombre de la propiedad,
- `receiver` -- si la propiedad objetivo es un getter, el `receiver` es el objeto que va a ser usado como `this` en su llamado. Usualmente es el objeto `proxy` mismo (o un objeto que hereda de él, si heredamos desde proxy). No necesitamos este argumento ahora mismo, así que se verá en más detalle luego.

Usemos `get` para implementar valores por defecto a un objeto.

Crearemos un arreglo numérico que devuelve `0` para valores no existentes.

Lo usual al tratar de obtener un ítem inexistente de un array es obtener `undefined`, pero envolveremos un array normal en un proxy que atrape lecturas y devuelva `0` si no existe tal propiedad:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // valor por defecto
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (porque no existe tal ítem)
*/!*
```

Como podemos ver, es muy fácil de hacer con una trampa `get`.

Podemos usar `Proxy` para implementar cualquier lógica para valores "por defecto".

Supongamos que tenemos un diccionario con frases y sus traducciones:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

Por ahora, si no existe la frase, la lectura de `dictionary` devuelve `undefined`. Pero en la práctica dejar la frase sin traducir es mejor que `undefined`. Así que hagamos que devuelva la frase sin traducir en vez de `undefined`.

Para lograr esto envolvemos `dictionary` en un proxy que intercepta las operaciones de lectura:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // intercepta la lectura de una propiedad en dictionary
*/!*
    if (phrase in target) { // si existe en el diccionario
      return target[phrase]; // devuelve la traducción
    } else {
      // caso contrario devuelve la frase sin traducir
      return phrase;
    }
  }
});

// ¡Busque frases en el diccionario!
// En el peor caso, no serán traducidas.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (sin traducir)
*/!*
```

````smart
Nota cómo el proxy sobrescribe la variable:

```js
dictionary = new Proxy(dictionary, ...);
```

El proxy debe reemplazar completamente al objeto "target" que envolvió: nadie debe jamás hacer referencia al objeto target saltando tal envoltura. De otro modo sería fácil desbaratarlo. 
````

## Validación con la trampa "set"

Digamos que queremos un array exclusivamente para números. Si se agrega un valor de otro tipo, debería dar un error.

La trampa `set` se dispara cuando una propiedad es escrita.

`set(target, property, value, receiver)`:

- `target` -- objetivo, el objeto pasado como primer argumento a `new Proxy`,
- `property` -- nombre de la propiedad,
- `value` -- valor de la propiedad,
- `receiver` -- similar para la trampa `get`, de importancia solamente en propiedades setter.

La trampa `set` debe devolver `true` si la escritura fue exitosa, y `false` en caso contrario (dispara `TypeError`).

Usémoslo para validar valores nuevos:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // para interceptar la escritura de propiedad
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // añadido correctamente  
numbers.push(2); // añadido correctamente
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' en el proxy devolvió false)
*/!*

alert("Esta linea nunca es alcanzada (error en la línea de arriba)");
```

Ten en cuenta: ¡la funcionalidad integrada de los arrays aún funciona! Los valores son añadidos por `push`. La propiedad `length` se autoincrementa cuando son agregados valores. Nuestro proxy no rompe nada.

No necesitamos sobrescribir métodos de valor añadido como `push`, `unshift` y demás para agregar los chequeos allí, porque internamente ellos usan la operación `[[Set]]` que es interceptada por el proxy.

Entonces el código es limpio y conciso.

```warn header="No olvides devolver `true`"
Como dijimos antes, hay invariantes que se deben mantener.

Para `set`, debe devolver `true` si la escritura fue correcta.

Si olvidamos hacerlo o si devolvemos false, la operación dispara `TypeError`.
```

## Iteración con "ownKeys" y "getOwnPropertyDescriptor"

`Object.keys`, el bucle `for..in`, y la mayoría de los demás métodos que iteran sobre las propiedades de objeto usan el método interno `[[OwnPropertyKeys]]` (interceptado por la trampa `ownKeys`) para obtener una lista de propiedades .

Tales métodos difieren en detalles:
- `Object.getOwnPropertyNames(obj)` devuelve claves no symbol.
- `Object.getOwnPropertySymbols(obj)` devuelve claves symbol.
- `Object.keys/values()` devuelve claves/valores no symbol con indicador `enumerable` (los indicadores de propiedad fueron explicados en el artículo <info:property-descriptors>).
- `for..in` itera sobre claves no symbol con el indicador `enumerable`, y también claves prototípicas.

...Pero todos ellos comienzan con aquella lista.

En el ejemplo abajo usamos la trampa `ownKeys` para hacer el bucle `for..in` sobre `user`. También usamos `Object.keys` y `Object.values` para pasar por alto las propiedades que comienzan con un guion bajo `_`:

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// el filtro en "ownKeys" descarta _password
for(let key in user) alert(key); // name, then: age

// el mismo efecto con estos métodos:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

Hasta ahora, funciona.

Aunque si devolvemos una clave que no existe en el objeto, `Object.keys` no la listará:

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <vacío>
```

¿Por qué? La razón es simple: `Object.keys` devuelve solamente propiedades con el indicador `enumerable`. Para verificarlo, llama el método interno `[[GetOwnProperty]]` en cada propiedad para obtener [su descriptor](info:property-descriptors). Y aquí, como no hay propiedad, su descriptor está vacío, no existe el indicador `enumerable`, entonces lo salta.

Para que `Object.keys` devuelva una propiedad, necesitamos que, o bien exista en el objeto, con el indicador `enumerable`, o interceptamos llamadas a `[[GetOwnProperty]]` (la trampa `getOwnPropertyDescriptor` lo hace), y devolver un descriptor con `enumerable: true`.

Aquí un ejemplo de ello:

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // llamado una vez para obtener la lista de propiedades
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // llamada para cada propiedad
    return {
      enumerable: true,
      configurable: true
      /* ...otros indicadores, probablemente "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

Tomemos nota de nuevo: solamente necesitamos interceptar `[[GetOwnProperty]]` si la propiedad está ausente en el objeto.

## Propiedades protegidas con "deleteProperty" y otras trampas

Hay una convención extendida: las propiedades y los métodos que comienzan con guion bajo `_` son de uso interno. Ellos no deberían ser accedidos desde fuera del objeto.

Aunque es técnicamente posible:

```js run
let user = {
  name: "John",
  _password: "secreto"
};

alert(user._password); // secreto
```

Usemos proxy para prevenir cualquier acceso a propiedades que comienzan con `_`.

Necesitaremos las trampas:
- `get` para arrojar un error al leer tal propiedad,
- `set` para arrojar un error al escribirla,
- `deleteProperty` para arrojar un error al eliminar,
- `ownKeys` para excluir propiedades que comienzan con `_` de `for..in` y métodos como `Object.keys`.

Aquí el código:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acceso denegado");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // para interceptar la escritura de la propiedad
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acceso denegado");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // para interceptar la eliminación de la propiedad
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Acceso denegado");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // para interceptar su listado
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" no permite leer _password
try {
  alert(user._password); // Error: Acceso denegado
} catch(e) { alert(e.message); }

// "set" no permite escribir _password
try {
  user._password = "test"; // Error: Acceso denegado
} catch(e) { alert(e.message); }

// "deleteProperty" no permite eliminar _password
try {
  delete user._password; // Error: Acceso denegado
} catch(e) { alert(e.message); }

// "ownKeys" filtra descartando _password
for(let key in user) alert(key); // name
```

Nota el importante detalle en la trampa `get`, en la línea `(*)`:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

¿Por qué necesitamos una función para llamar `value.bind(target)`?

La razón es que los métodos de objeto, como `user.checkPassword()`, deben ser capaces de acceder a `_password`:

```js
user = {
  // ...
  checkPassword(value) {
    // método de objeto debe poder leer _password
    return value === this._password;
  }
}
```


Un llamado a `user.checkPassword()` hace que el objeto target `user` sea `this` (el objeto antes del punto se vuelve `this`), entonces cuando trata de acceder a `this._password`, la trampa `get` se activa (se dispara en cualquier lectura de propiedad) y arroja un error.

Entonces vinculamos (bind) el contexto de los métodos al objeto original, `target`, en la línea `(*)`. Así futuros llamados usarán `target` como `this`, sin trampas.

Esta solución usualmente funciona, pero no es ideal, porque un método podría pasar el objeto original hacia algún otro lado y lo habremos arruinado: ¿dónde está el objeto original, y dónde el apoderado?

Además, un objeto puede ser envuelto por proxys muchas veces (proxys múltiples pueden agregar diferentes ajustes al objeto), y si pasamos un objeto no envuelto por proxy a un método, puede haber consecuencias inesperadas.

Por lo tanto, tal proxy no debería usarse en todos lados.

```smart header="Propiedades privadas de una clase"
Los motores de JavaScript moderno soportan en las clases las propiedades privadas, aquellas con el prefijo `#`. Estas son descritas en el artículo <info:private-protected-properties-methods>. No requieren proxys.

Pero tales propiedades tienen sus propios problemas. En particular, ellas no se heredan.
```

## "In range" con la trampa "has"

Veamos más ejemplos.

Tenemos un objeto range:

```js
let range = {
  start: 1,
  end: 10
};
```

Queremos usar el operador `in` para verificar que un número está en el rango, `range`.

La trampa `has` intercepta la llamada `in`.

`has(target, property)`

- `target` -- objetivo, el objeto pasado como primer argumento a `new Proxy`,
- `property` -- nombre de propiedad

Aquí el demo:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end;
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

Bonita azúcar sintáctica, ¿no es cierto? Y muy simple de implementar.

## Envolviendo funciones: "apply" [#proxy-apply]

Podemos envolver un proxy a una función también.

La trampa `apply(target, thisArg, args)` maneja llamados a proxy como función:

- `target` es el objeto/objetivo (en JavaScript, la función es un objeto),
- `thisArg` es el valor de `this`.
- `args` es una lista de argumentos.

Por ejemplo, recordemos el decorador `delay(f, ms)` que hicimos en el artículo <info:call-apply-decorators>.

En ese artículo lo hicimos sin proxy. Un llamado a `delay(f, ms)` devolvía una función que redirigía todos los llamados a `f` después de `ms` milisegundos.

Aquí la version previa, implementación basada en función:

```js run
function delay(f, ms) {
  // devuelve un envoltorio que pasa el llamado a f después del timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// después de esta envoltura, los llamados a sayHi serán demorados por 3 segundos
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (después de 3 segundos)
```

Como ya hemos visto, esto mayormente funciona. La función envoltorio `(*)` ejecuta el llamado después del lapso.

Pero una simple función envoltura (wrapper) no redirige operaciones de lectura y escritura ni ninguna otra cosa. Una vez envuelta, el acceso a las propiedades de la función original (`name`, `length`) se pierde:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (length, longitud, en una función es la cantidad de argumentos en su declaración)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (en la declaración de envoltorio hay cero argumentos)
*/!*
```

El `Proxy` es mucho más poderoso, porque redirige todo lo que no maneja al objeto envuelto "target".

Usemos `Proxy` en lugar de una función envoltura:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) el proxy redirige la operación "get length" al objeto target
*/!*

sayHi("John"); // Hello, John! (después de 3 segundos)
```

El resultado es el mismo, pero ahora no solo las llamadas sino todas las operaciones son redirigidas a la función original. Así `sayHi.length` se devuelve correctamente luego de la envoltura en la línea `(*)`.

Obtuvimos una envoltura "enriquecida".

Existen otras trampas. La lista completa está en el principio de este artículo. Su patrón de uso es similar al de arriba.

## Reflect

`Reflect` es un objeto nativo que simplifica la creación de `Proxy`.

Se dijo previamente que los métodos internos como `[[Get]]`, `[[Set]]` son únicamente para la especificación, que no pueden ser llamados directamente.

El objeto `Reflect` hace de alguna manera esto posible. Sus métodos son envoltorios mínimos alrededor del método interno.

Aquí hay ejemplos de operaciones y llamados a `Reflect` que hacen lo mismo:

| Operación |  Llamada `Reflect` | Método interno |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

Por ejemplo:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

En particular, `Reflect` nos permite llamar a los operadores (`new`, `delete`, ...) como funciones (`Reflect.construct`, `Reflect.deleteProperty`, ...). Esta es una capacidad interesante, pero hay otra cosa importante.

**Para cada método interno atrapable por `Proxy`, hay un método correspondiente en `Reflect` con el mismo nombre y argumentos que la trampa `Proxy`.**

Entonces podemos usar `Reflect` para redirigir una operación al objeto original.

En este ejemplo, ambas trampas `get` y `set` transparentemente (como si no existieran) reenvían las operaciones de lectura y escritura al objeto, mostrando un mensaje:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // muestra "GET name"
user.name = "Pete"; // muestra "SET name=Pete"
```

Aquí:

- `Reflect.get` lee una propiedad de objeto.
- `Reflect.set` escribe una propiedad de objeto y devuelve `true` si fue exitosa, `false` si no lo fue.

Eso es todo, así de simple: si una trampa quiere dirigir el llamado al objeto, es suficiente con el llamado a `Reflect.<method>` con los mismos argumentos.

En la mayoría de los casos podemos hacerlo sin `Reflect`, por ejemplo, leer una propiedad `Reflect.get(target, prop, receiver)` puede ser reemplazado por `target[prop]`. Aunque hay importantes distinciones.

### Proxy en un getter

Veamos un ejemplo que demuestra por qué `Reflect.get` es mejor. Y veremos también por qué `get/set` tiene el tercer argumento `receiver` que no usamos antes.

Tenemos un objeto `user` con la propiedad `_name` y un getter para ella.

Aquí hay un proxy alrededor de él:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

La trampa `get` es "transparente" aquí, devuelve la propiedad original, y no hace nada más. Esto es suficiente para nuestro ejemplo.

Todo se ve bien. Pero hagamos el ejemplo un poco más complejo.

Después de heredar otro objeto `admin` desde `user`, podemos observar el comportamiento incorrecto:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Esperado: Admin
alert(admin.name); // salida: Guest (?!?)
*/!*
```

¡Leer `admin.name` debería devolver `"Admin"`, no `"Guest"`!

¿Qué es lo que pasa? ¿Acaso hicimos algo mal con la herencia?

Pero si quitamos el proxy, todo funciona como se espera.

En realidad el problema está en el proxy, en la línea `(*)`.

1. Cuando leemos `admin.name`, como el objeto`admin` no tiene su propia propiedad, la búsqueda va a su prototipo.
2. El prototipo es `userProxy`.
3. Cuando se lee la propiedad `name` del proxy, se dispara su trampa `get` y devuelve desde el objeto original como `target[prop]` en la línea `(*)`.

    Un llamado a `target[prop]`, cuando `prop` es un getter, ejecuta su código en el contexto `this=target`. Entonces el resultado es `this._name` desde el objeto original `target`, que es: desde `user`.

Para arreglar estas situaciones, necesitamos `receiver`, el tercer argumento de la trampa `get`. Este mantiene el `this` correcto para pasarlo al getter. Que en nuestro caso es `admin`.

¿Cómo pasar el contexto para un getter? Para una función regular podemos usar `call/apply`, pero es un getter, no es "llamado", solamente accedido.

`Reflect.get` hace eso. Todo funcionará bien si lo usamos.

Aquí la variante corregida:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin 
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

Ahora `receiver`, que mantiene una referencia al `this` correcto (que es `admin`), es pasado al getter usando `Reflect.get` en la línea `(*)`.

Podemos reescribir la trampa aún más corta:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```


Los llamados de `Reflect` fueron nombrados exactamente igual a las trampas y aceptan los mismos argumentos. Fueron específicamente diseñados así.

Entonces, `return Reflect...` brinda una forma segura y "no cerebral" de redirigir la operación y asegurarse de que no olvidamos nada relacionado a ello.

## Limitaciones del proxy

Proxy brinda una manera única de alterar o ajustar el comportamiento de objetos existentes al más bajo nivel. Pero no es perfecto. Hay limitaciones.

### Objetos nativos: slots internos

Muchos objetos nativos, por ejemplo `Map`, `Set`, `Date`, `Promise`, etc,  hacen uso de los llamados "slots internos".

Los slots (hueco, celda) son como propiedades pero están reservados para uso interno, con propósito de especificación únicamente. Por ejemplo, `Map` almacena items en el slot interno `[[MapData]]`. Los métodos nativos los acceden directamente, sin usar los métodos internos `[[Get]]/[[Set]]`. Entonces `Proxy` no puede interceptar eso.

¿Qué importa? ¡De cualquier manera son internos!

Bueno, hay un problema. Cuando se envuelve un objeto nativo el proxy no tiene acceso a estos slots internos, entonces los métodos nativos fallan.

Por ejemplo:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Error
*/!*
```

Internamente, un `Map` almacena todos los datos en su slot interno `[[MapData]]`. El proxy no tiene tal slot. El [método nativo `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) trata de acceder a la propiedad interna `this.[[MapData]]`, pero como `this=proxy`, no puede encontrarlo en `proxy` y simplemente falla.

Afortunadamente, hay una forma de arreglarlo:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (¡Funciona!)
```

Ahora funciona bien porque la trampa `get` vincula las propiedades de la función, tales como `map.set`, al objeto target mismo (`map`).

A diferencia del ejemplo previo, el valor de `this` dentro de `proxy.set(...)` no será `proxy` sino el `map` original. Entonces, cuando la implementación interna de `set` trata de acceder al slot interno `this.[[MapData]]`, lo logra.

```smart header="`Array` no tiene slots internos"
Una excepción notable: El objeto nativo `Array` no tiene slots internos. Esto es por razones históricas, ya que apareció hace tanto tiempo.

Así que no hay problema en usar proxy con un array.
```

### Campos privados

Algo similar ocurre con los "campos privados" usados en las clases.

Por ejemplo, el método `getName()` accede a la propiedad privada `#name` y falla cuando lo proxificamos:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Error
*/!*
```

La razón es que los campos privados son implementados usando slots internos. JavaScript no usa `[[Get]]/[[Set]]` cuando accede a ellos.

En la llamada a `getName()`, el valor de `this` es el proxy `user`que no tiene el slot con campos privados.

De nuevo, la solución de vincular el método hace que funcione:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

Dicho esto, la solución tiene su contra, explicada previamente: expone el objeto original al método, potencialmente permite ser pasado más allá y dañar otra funcionalidad del proxy.

### Proxy != target

El proxy y el objeto original son objetos diferentes. Es natural, ¿cierto?

Así que si usamos el objeto original como clave y luego lo hacemos proxy, entonces el proxy no puede ser hallado:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

Como podemos ver, después del proxy no podemos hallar `user` en el set `allUsers` porque el proxy es un objeto diferente.

```warn header="El proxy no puede interceptar un test de igualdad estricta `===`"
Los proxys pueden interceptar muchos operadores; tales como `new` (con `construct`), `in` (con `has`), `delete` (con `deleteProperty`) y otros.

Pero no hay forma de interceptar un test de igualdad estricta entre objetos. Un objeto es estrictamente igual únicamente a sí mismo y a ningún otro valor.

Por lo tanto todas las operaciones y clases nativas que hacen una comparación estricta de objetos diferenciarán entre el objeto original y su proxy. No hay reemplazo transparente aquí..
```

## Proxy revocable

Un proxy *revocable* es uno que puede ser deshabilitado.

Digamos que tenemos un recurso al que quisiéramos poder cerrar en cualquier momento.

Podemos envolverlo en un proxy revocable sin trampas. Tal proxy dirigirá todas las operaciones al objeto, y podemos deshabilitarlo en cualquier momento. 

La sintaxis es:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

La llamada devuelve un objeto con el `proxy` y la función `revoke` para deshabilitarlo.

Aquí hay un ejemplo:

```js run
let object = {
  data: "datos valiosos"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pasamos el proxy en lugar del objeto...
alert(proxy.data); // datos valiosos

// luego en nuestro código
revoke();

// el proxy no funciona más (revocado)
alert(proxy.data); // Error
```

La llamada a `revoke()` quita al proxy todas las referencias internas hacia el objeto target, ya no estarán conectados. 

En principio `revoke` está separado de `proxy`, así que podemos pasar `proxy` alrededor mientras mantenemos `revoke` en la vista actual.

También podemos vincular el método `revoke` al proxy asignándolo como propiedad: `proxy.revoke = revoke`.

Otra opción es crear un `WeakMap` que tenga a `proxy` como clave y su correspondiente `revoke` como valor, esto permite fácilmente encontrar el `revoke` para un proxy:

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ...en algún otro lado de nuestro código...
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revocado)
```

Usamos `WeakMap` en lugar de `Map` aquí porque no bloqueará la recolección de basura. Si el objeto proxy se vuelve inalcanzable (es decir, ya ninguna variable hace referencia a él), `WeakMap` permite eliminarlo junto con su `revoke` que no necesitaremos más.

## References

- Specification: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Proxy).

## Resumen

`Proxy` es un envoltorio (wrapper) alrededor de un objeto que redirige las operaciones en el hacia el objeto, opcionalmente atrapando algunas de ellas para manejarlas por su cuenta.

Puede envolver cualquier tipo de objeto, incluyendo clases y funciones.

La sintaxis es:

```js
let proxy = new Proxy(target, {
  /* trampas */
});
```

...Entonces deberíamos usar `proxy` en todos lados en lugar de `target`. Un proxy no tiene sus propias propiedades o métodos. Atrapa una operación si la trampa correspondiente le es provista, de otro modo la reenvía al objeto `target`.

Podemos atrapar:
- Lectura (`get`), escritura (`set`), eliminación de propiedad (`deleteProperty`) (incluso si no existe).
- Llamadas a función (trampa `apply`).
- El operador `new` (trampa `construct`).
- Muchas otras operaciones (la lista completa al principio del artículo y en [docs](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Proxy)).

Esto nos permite crear propiedades y métodos "virtuales", implementar valores por defecto, objetos observables, decoradores de función y mucho más.

También podemos atrapar un objeto múltiples veces en proxys diferentes, decorándolos con varios aspectos de funcionalidad.

La API de [Reflect](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Reflect) está diseñada para complementar [Proxy](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Proxy). Para cada trampa de `Proxy` hay una llamada `Reflect` con los mismos argumentos. Deberíamos usarlas para redirigir llamadas hacia los objetos target.

Los proxys tienen algunas limitaciones:

- Los objetos nativos tienen "slots internos" a los que el proxy no tiene acceso. Ver la forma de sortear el problema más arriba.
- Lo mismo cuenta para los campos privados en las clases porque están implementados internamente usando slots. Entonces las llamadas a métodos atrapados deben tener en `this` al objeto target para poder accederlos.
- El test de igualdad de objeto `===` no puede ser interceptado.
- Performance: los tests de velocidad dependen del motor, pero generalmente acceder a una propiedad usando el proxy más simple el tiempo se multiplica unas veces. Aunque en la práctica esto solo es importante para los objetos que son los "cuello de botella" de una aplicación.
