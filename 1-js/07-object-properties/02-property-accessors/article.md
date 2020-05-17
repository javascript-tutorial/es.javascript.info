
# Property getters and setters

Hay dos tipos de propiedades.

El primer tipo son las *propiedades de los datos*. Ya sabemos cómo trabajar con ellas. En realidad, todas las propiedades que hemos estado usando hasta ahora eran propiedades de datos.

El segundo tipo de propiedades es algo nuevo. Son las *propiedades de los accesorios*. Estas son esencialmente funciones que trabajan en la obtención y configuración de un valor, pero que parecen propiedades normales de un código externo.

## Getters and setters

Las propiedades del accesorio están representadas por los métodos "getter" y "setter". En un objeto con la notación literal se denotan por "get" y "set":

```js
let obj = {
  *!*get propName()*/!* {
    // getter, el código ejecutado al obtener obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, el código ejecutado al obtener obj.propName = value
  }
};
```

El getter funciona cuando se lee `obj.propName`, el setter -- cuando se asigna.

Por ejemplo, tenemos un objeto "usuario" con "nombre" y "apellido":

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

Ahora queremos añadir una propiedad de "nombre completo", que debería ser "John Smith". Por supuesto, no queremos copiar-pegar la información existente, así que podemos aplicarla como un accesorio:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

Desde fuera, una propiedad accesoria se parece a una normal. Esa es la idea de las propiedades accesorias. No llamamos a " user.fullName" como una función, la leemos normalmente: el "getter" corre detrás de la escena.

A partir de ahora, "Nombre completo" sólo tiene un receptor. Si intentamos asignar "user.fullName", habrá un error.

Arreglémoslo agregando un setter para " user.fullName":

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName se ejecuta con el valor dado.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

Ahora tenemos una propiedad "virtual". Esta es legible y escribible, pero de hecho no existe.

```smart header="Accessor properties are only accessible with get/set"
Una vez que una propiedad se define con `get prop()` o `set prop()`, es una propiedad accesoria, ya no es una propiedad de los datos.

- Si hay un getter -- podemos leer `object.prop`, de otro modo no podemos.
- Si hay un setter -- podemos fijar `object.prop=...`, de otro modo no podemos.

Y en cualquier caso no podemos "borrar" una propiedad accesoria.
```


## Accessor descriptors

Los descriptores de las propiedades accesorias son different -- en comparación con las propiedades de los datos.

Para las propiedades de los accesorios, no hay funciones de "valor" y "escritura", sino de "get" y "set".

Así que un descriptor de accesorios puede tener:

- **`get`** -- una función sin argumentos, que funciona cuando se lee una propiedad,
- **`set`** -- una función con un argumento, que se llama cuando se establece la propiedad,
- **`enumerable`** -- lo mismo que para las propiedades de los datos,
- **`configurable`** -- lo mismo que para las propiedades de los datos.

Por ejemplo, para crear un accesorio " Nombre Completo" con "Definir Propiedad", podemos pasar un descriptor con `get` y `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Tenga en cuenta una vez más que una propiedad puede ser un accesorio o una propiedad de datos, no ambas.

Si intentamos poner tanto " get" como " valor" en el mismo descriptor, habrá un error:

```js run
*!*
// Error: Descriptor de propiedad inválido.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Smarter getters/setters

Getters/setters pueden ser usados como envoltorios sobre valores de propiedad "reales" para obtener más control sobre ellos.

Por ejemplo, si queremos prohibir nombres demasiado cortos para "usuario", podemos guardar "nombre" en una propiedad especial "nombre". Y filtrar las asignaciones en el setter:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("El nombre es demasiado corto, necesita al menos 4 caracteres");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // El nombre es demasiado corto...
```

Técnicamente, el código externo todavía puede acceder al nombre directamente usando "usuario._nombre". Pero hay un acuerdo ampliamente conocido de que las propiedades que comienzan con un guión bajo "_" son internas y no deben ser manipuladas desde el exterior del objeto.


## Using for compatibility

Una de las grandes ideas detrás de los getters y setters -- permiten tomar el control de una propiedad de datos "normal" y ajustarla en cualquier momento.

Por ejemplo, empezamos a implementar objetos de usuario usando las propiedades de datos "nombre" y "edad":

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Pero tarde o temprano, las cosas pueden cambiar. En lugar de "edad" podemos decidir almacenar "cumpleaños", porque es más preciso y conveniente:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Ahora, ¿qué hacer con el viejo código que todavía usa la propiedad de la "edad"?

Podemos intentar encontrar todos esos lugares y arreglarlos, pero eso lleva tiempo y puede ser difícil de hacer si ese código está escrito por otras personas. Y además, la "edad" es algo bueno para tener en "usuario", ¿verdad? En algunos lugares es justo lo que queremos.

Añadiendo un getter para la "edad" se atenúa el problema:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // La edad se calcula a partir de la fecha actual y del cumpleaños
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // El cumpleaños está disponible
alert( john.age );      // ...así como la edad
```

Ahora el viejo código funciona también y tenemos una buena propiedad adicional.
