
# "Getters" y "setters" de propiedad

Hay dos tipos de propiedades de objetos.

El primer tipo son las *propiedades de datos*. Ya sabemos cómo trabajar con ellas. Todas las propiedades que hemos estado usando hasta ahora eran propiedades de datos.

El segundo tipo de propiedades es algo nuevo. Son las *propiedades de acceso* o *accessors*. Son, en esencia, funciones que se ejecutan para obtener ("get") y asignar ("set") un valor, pero que para un código externo se ven como propiedades normales.

## Getters y setters

Las propiedades de acceso se construyen con métodos de obtención "getter" y asignación "setter". En un objeto literal se denotan con `get` y `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, el código ejecutado para obtener obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, el código ejecutado para asignar obj.propName = value
  }
};
```

El getter funciona cuando se lee `obj.propName`, y el setter cuando se asigna.

Por ejemplo, tenemos un objeto "usuario" con "nombre" y "apellido":

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

Ahora queremos añadir una propiedad de "Nombre completo" (`fullName`), que debería ser `"John Smith"`. Por supuesto, no queremos copiar-pegar la información existente, así que podemos aplicarla como una propiedad de acceso:

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

Desde fuera, una propiedad de acceso se parece a una normal. Esa es la idea de estas propiedades. No *llamamos* a `user.fullName` como una función, la *leemos* normalmente: el "getter" corre detrás de escena.

Hasta ahora, "Nombre completo" sólo tiene un receptor. Si intentamos asignar `user.fullName=`, habrá un error.

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Test"; // Error (property has only a getter)
*/!*
```

Arreglémoslo agregando un setter para `user.fullName`:

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

Como resultado, tenemos una propiedad virtual `fullName` que puede leerse y escribirse.


## Descriptores de acceso

Los descriptores de propiedades de acceso son diferentes de aquellos para las propiedades de datos.

Para las propiedades de acceso, no hay cosas como "valor" y "escritura", sino de "get" y "set".

Así que un descriptor de accesos puede tener:

- **`get`** -- una función sin argumentos, que funciona cuando se lee una propiedad,
- **`set`** -- una función con un argumento, que se llama cuando se establece la propiedad,
- **`enumerable`** -- lo mismo que para las propiedades de datos,
- **`configurable`** -- lo mismo que para las propiedades de datos.

Por ejemplo, para crear un acceso `fullName` con `defineProperty`, podemos pasar un descriptor con `get` y `set`:

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

Tenga en cuenta que una propiedad puede ser un acceso (tiene métodos `get/set`)  o una propiedad de datos (tiene un 'valor'), no ambas.

Si intentamos poner tanto `get` como `valor` en el mismo descriptor, habrá un error:

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

## Getters y setters más inteligentes

Getters y setters pueden ser usados como envoltorios sobre valores de propiedad "reales" para obtener más control sobre ellos.

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

Entonces, el nombre es almacenado en la propiedad `_name`, y el acceso se hace a través de getter y setter.

Técnicamente, el código externo todavía puede acceder al nombre directamente usando "usuario._nombre". Pero hay un acuerdo ampliamente conocido de que las propiedades que comienzan con un guión bajo "_" son internas y no deben ser manipuladas desde el exterior del objeto.


## Uso para compatibilidad

Una de los grandes usos de los getters y setters es que permiten tomar el control de una propiedad de datos "normal" y reemplazarla un getter y un setter y así refinar su comportamiento.

Imagina que empezamos a implementar objetos usuario usando las propiedades de datos "nombre" y "edad":

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

Pues mantengámoslo.

Añadiendo un getter para la "edad" resuelve el problema:

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
