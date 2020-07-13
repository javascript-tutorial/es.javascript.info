# Los Mixins

En JavaScript podemos heredar de un solo objeto. Solo puede haber un `[[Prototype]]` para un objeto. Y una clase puede extender únicamente otra clase.

<<<<<<< HEAD
Pero a veces eso se siente restrictivo. Por ejemplo, tenemos una clase `StreetSweeper` y una clase `Bicycle`, y queremos hacer su combinación: un `StreetSweepingBicycle`.

O tenemos una clase `User` y una clase `EventEmitter` que implementa la generación de eventos, y nos gustaría agregar la funcionalidad de `EventEmitter` a `User`, para que nuestros usuarios puedan emitir eventos.
=======
But sometimes that feels limiting. For instance, we have a class `StreetSweeper` and a class `Bicycle`, and want to make their mix: a `StreetSweepingBicycle`.

Or we have a class `User` and a class `EventEmitter` that implements event generation, and we'd like to add the functionality of `EventEmitter` to `User`, so that our users can emit events.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Hay un concepto que puede ayudar aquí, llamado "mixins".

<<<<<<< HEAD
Como se define en Wikipedia, un [mixin](https://es.wikipedia.org/wiki/Mixin) es una clase que contiene métodos que pueden ser utilizados por otras clases sin necesidad de heredar de ella.
=======
As defined in Wikipedia, a [mixin](https://en.wikipedia.org/wiki/Mixin) is a class containing methods that can be used by other classes without a need to inherit from it.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

En otras palabras, un *mixin* proporciona métodos que implementan cierto comportamiento, pero su uso no es exclusivo, lo usamos para agregar el comportamiento a otras clases.

## Un ejemplo de mixin

<<<<<<< HEAD
La forma más sencilla de implementar un mixin en JavaScript es hacer un objeto con métodos útiles, para que podamos combinarlos fácilmente en un prototipo de cualquier clase.
=======
The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Por ejemplo, aquí el mixin `sayHiMixin` se usa para agregar algo de "diálogo" a `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Hola ${this.name}`);
  },
  sayBye() {
    alert(`Adios ${this.name}`);
  }
};

*!*
// uso:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// copia los métodos
Object.assign(User.prototype, sayHiMixin);

// Ahora el User puede decir hola
new User("tío").sayHi(); // Hola tío!
```

<<<<<<< HEAD
No hay herencia, sino un simple método de copia. Entonces, `User` puede heredar de otra clase y también incluir el mixin para "mezclar" los métodos adicionales, como este:
=======
There's no inheritance, but a simple method copying. So `User` may inherit from another class and also include the mixin to "mix-in" the additional methods, like this:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Los mixins pueden hacer uso de la herencia dentro de sí mismos.

Por ejemplo, aquí `sayHiMixin` hereda de `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (o podríamos usar Object.create para configurar el prototype aquí)

  sayHi() {
    *!*
    // llama al método padre
    */!*
<<<<<<< HEAD
    super.say(`Hola ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Adios ${this.name}`); // (*)
=======
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copia los métodos
Object.assign(User.prototype, sayHiMixin);

// User ahora puede decir hola
new User("tío").sayHi(); // Hola tío!
```

<<<<<<< HEAD
Ten en cuenta que la llamada al método padre `super.say()` de `sayHiMixin` (en las líneas etiquetadas con `(*)`) busca el método en el prototipo de ese mixin, no en la clase.

Aquí está el diagrama (ver la parte derecha):

![](mixin-inheritance.svg)
=======
Please note that the call to the parent method `super.say()` from `sayHiMixin` (at lines labelled with `(*)`) looks for the method in the prototype of that mixin, not the class.

Here's the diagram (see the right part):

![](mixin-inheritance.svg)

That's because methods `sayHi` and `sayBye` were initially created in `sayHiMixin`. So even though they got copied, their `[[HomeObject]]` internal property references `sayHiMixin`, as shown in the picture above.

As `super` looks for parent methods in `[[HomeObject]].[[Prototype]]`, that means it searches `sayHiMixin.[[Prototype]]`, not `User.[[Prototype]]`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Esto se debe a que los métodos `sayHi` y `sayBye` se crearon inicialmente en `sayHiMixin`. Entonces, a pesar de que se copiaron, su propiedad interna `[[[HomeObject]]` hace referencia a `sayHiMixin`, como se muestra en la imagen de arriba.

Como `super` busca métodos primarios en `[[HomeObject]].[[Prototype]]`,  significa que busca `sayHiMixin.[[Prototype]]`, no `User.[[Prototype]]`.

## EventMixin

<<<<<<< HEAD
Ahora hagamos un mixin para la vida real.

Una característica importante de muchos objetos del navegador (por ejemplo) es que pueden generar eventos. Los eventos son una excelente manera de "transmitir información" a cualquiera que lo desee. Así que hagamos un mixin que nos permita agregar fácilmente funciones relacionadas con eventos a cualquier clase/objeto.

- El mixin proporcionará un método `.trigger(name, [...data])` para "generar un evento" cuando le ocurra algo importante. El argumento `name` es un nombre del evento, opcionalmente seguido de argumentos adicionales con datos del evento.
- También el método `.on(name, handler)` que agrega la función `handler` como listener a eventos con el nombre dado. Se llamará cuando se desencadene un evento con el nombre `name` dado, y obtenga los argumentos de la llamada `.trigger`.
- ...Y el método `.off(name, handler)` que elimina el listener `handler`.

Después de agregar el mixin, un objeto `user` podrá generar un evento `"login"` cuando el visitante inicie sesión. Y otro objeto, por ejemplo, `calendar` puede querer escuchar dichos eventos para cargar el calendario para el persona registrada.

O bien, un `menu` puede generar el evento `"seleccionar"` cuando se selecciona un elemento del menú, y otros objetos pueden asignar controladores para reaccionar ante ese evento. Y así.

Aquí está el código:
=======
An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let eventMixin = {
  /**
   * Suscribe al evento, uso:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancelar la suscripción, uso:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
<<<<<<< HEAD
   * Generar un evento con el nombre y los datos
=======
   * Generate an event with the given name and data
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // no hay controladores para ese nombre de evento
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```


<<<<<<< HEAD
- `.on(eventName, handler)`: asigna la función `handler` para que se ejecute cuando se produce el evento con ese nombre. Técnicamente, hay una propiedad `_eventHandlers` que almacena una matriz de controladores para cada nombre de evento, y simplemente la agrega a la lista.
- `.off(eventName, handler)` - elimina la función de la lista de controladores.
- `.trigger(eventName, ...args)` - genera el evento: se llama a todos los controladores de `_eventHandlers[eventName]`, con una lista de argumentos `...args`.
=======
- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name occurs. Technically, there's an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Uso:

```js run
// Construir una clase
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
<<<<<<< HEAD
// Agrega el mixin con métodos relacionados con eventos
=======
// Add the mixin with event-related methods
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

<<<<<<< HEAD
// agrega un controlador, que se llamará en la selección:
=======
// add a handler, to be called on selection:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
*!*
menu.on("select", value => alert(`Valor seleccionado: ${value}`));
*/!*

<<<<<<< HEAD
// desencadena el evento => el controlador anterior se ejecuta y muestra:
// Valor seleccionado: 123
menu.choose("123");
```

Ahora, si queremos que el código reaccione a una selección de menú, podemos escucharlo con `menu.on(...)`.

Y el mixin de `eventMixin`  hace que sea fácil agregar ese comportamiento a tantas clases como queramos, sin interferir con la cadena de herencia.
=======
// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Resumen

*Mixin* -- es un término genérico de programación orientado a objetos: una clase que contiene métodos para otras clases.

<<<<<<< HEAD
Algunos lenguajes permiten la herencia múltiple. JavaScript no admite la herencia múltiple, pero los mixins se pueden implementar copiando métodos en el prototipo.

Podemos usar mixins como una forma de expandir una clase agregando múltiples comportamientos, como el manejo de eventos que hemos visto anteriormente.

Los mixins pueden convertirse en un punto de conflicto si sobrescriben accidentalmente los métodos de clase existentes. Por lo tanto, generalmente debes planificar correctamente la definición de métodos de un mixin, para minimizar la probabilidad de que suceda.
=======
Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
