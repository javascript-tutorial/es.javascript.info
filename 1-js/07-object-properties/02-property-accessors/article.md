
# Property getters and setters

<<<<<<< HEAD
Hay dos tipos de propiedades de objetos.

El primer tipo son las *propiedades de los datos*. Ya sabemos cómo trabajar con ellas. En realidad, todas las propiedades que hemos estado usando hasta ahora eran propiedades de datos.

El segundo tipo de propiedades es algo nuevo. Son las *propiedades de acceso*. Estas son esencialmente funciones que se ejecutan para la obtención y asignación de un valor, pero parecen propiedades normales para un código externo.
=======
There are two kinds of object properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using until now were data properties.

The second type of properties is something new. It's *accessor properties*. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Getters and setters

Las propiedades de acceso están representadas por métodos "getter" y "setter". Propiamente, en un objeto se denotan por `get` y `set`:

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

El getter funciona cuando se lee `obj.propName`, el setter -- cuando se asigna.

Por ejemplo, tenemos un objeto "usuario" con "nombre" y "apellido":

```js
let user = {
  name: "John",
  surname: "Smith"
};
```

<<<<<<< HEAD
Ahora queremos añadir una propiedad de "Nombre completo" (`fullName`), que debería ser `"John Smith"`. Por supuesto, no queremos copiar-pegar la información existente, así que podemos aplicarla como una propiedad de acceso:
=======
Now we want to add a `fullName` property, that should be `"John Smith"`. Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
Desde fuera, una propiedad de acceso se parece a una normal. Esa es la idea de estas propiedades. No *llamamos* a `user.fullName` como una función, la *leemos* normalmente: el "getter" corre detrás de la escena.

A partir de ahora, "Nombre completo" sólo tiene un receptor. Si intentamos asignar `user.fullName=`, habrá un error.

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

=======
From the outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error:

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
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

<<<<<<< HEAD
Como resultado, tenemos una propiedad virtual `fullName` que puede leerse y escribirse.


## Accessor descriptors

Los descriptores de las propiedades de acceso son diferentes de aquellos para las propiedades de los datos.

Para las propiedades de acceso, no hay cosas como "valor" y "escritura", sino de "get" y "set".

Así que un descriptor de accesos puede tener:
=======
As the result, we have a "virtual" property `fullName`. It is readable and writable.

## Accessor descriptors

Descriptors for accessor properties are different from those for data properties.

For accessor properties, there is no `value` or `writable`, but instead there are `get` and `set` functions.

That is, an accessor descriptor may have:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

- **`get`** -- una función sin argumentos, que funciona cuando se lee una propiedad,
- **`set`** -- una función con un argumento, que se llama cuando se establece la propiedad,
- **`enumerable`** -- lo mismo que para las propiedades de los datos,
- **`configurable`** -- lo mismo que para las propiedades de los datos.

Por ejemplo, para crear un acceso " Nombre Completo" con "Definir Propiedad", podemos pasar un descriptor con `get` y `set`:

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

<<<<<<< HEAD
Tenga en cuenta que una propiedad puede ser un acceso (tiene métodos `get/set`)  o una propiedad de datos (tiene un 'valor'), no ambas.
=======
Please note that a property can be either an accessor (has `get/set` methods) or a data property (has a `value`), not both.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

## Smarter getters/setters

<<<<<<< HEAD
Getters/setters pueden ser usados como envoltorios sobre valores de propiedad "reales" para obtener más control sobre ellos.

Por ejemplo, si queremos prohibir nombres demasiado cortos para "usuario", podemos guardar "nombre" en una propiedad especial "nombre". Y filtrar las asignaciones en el setter:
=======
Getters/setters can be used as wrappers over "real" property values to gain more control over operations with them.

For instance, if we want to forbid too short names for `user`, we can have a setter `name` and keep the value in a separate property `_name`:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
Entonces, el nombre es almacenado en la propiedad `_name`, y el acceso se hace a traves de getter y setter.

Técnicamente, el código externo todavía puede acceder al nombre directamente usando "usuario._nombre". Pero hay un acuerdo ampliamente conocido de que las propiedades que comienzan con un guión bajo "_" son internas y no deben ser manipuladas desde el exterior del objeto.
=======
So, the name is stored in `_name` property, and the access is done via getter and setter.

Technically, external code is able to access the name directly by using `user._name`. But there is a widely known convention that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439


## Using for compatibility

<<<<<<< HEAD
Una de los grandes usos de los getters y setters es que permiten tomar el control de una propiedad de datos "normal" y reemplazarla con getter y setter y así refinar su coportamiento.

Imagina que empezamos a implementar objetos usuario usando las propiedades de datos "nombre" y "edad":
=======
One of the great uses of accessors is that they allow to take control over a "regular" data property at any moment by replacing it with a getter and a setter and tweak its behavior.

Imagine we started implementing user objects using data properties `name` and `age`:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
Pues mantengámoslo.

Añadiendo un getter para la "edad" resuelve el problema:
=======
We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people. And besides, `age` is a nice thing to have in `user`, right?

Let's keep it.

Adding a getter for `age` solves the problem:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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
