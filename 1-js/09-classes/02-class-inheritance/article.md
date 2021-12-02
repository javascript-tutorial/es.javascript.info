
# Herencia de clase

La herencia de clase es el modo para que una clase extienda a otra.

De esta manera podemos añadir nueva funcionalidad a la ya existente.

## La palabra clave "extends"

Digamos que tenemos la clase `Animal`:

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} corre a una velocidad de ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} se queda quieto.`);
  }
}

let animal = new Animal("Mi animal");
```

Así es como podemos representar gráficamente el objeto `animal` y la clase `Animal`:

![](rabbit-animal-independent-animal.svg)

...Y nos gustaría crear otra clase `Rabbit`.

Como los conejos son animales, la clase 'Rabbit' debería basarse en 'Animal' y así tener acceso a métodos animales, para que los conejos puedan hacer lo que los animales "genéricos" pueden hacer.

La sintaxis para extender otra clase es: `class Hijo extends Padre`.

Construyamos la clase `Rabbit` que herede de `Animal`:

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`¡${this.name} se esconde!`);
  }
}

let rabbit = new Rabbit("Conejo Blanco");

rabbit.run(5); // Conejo Blanco corre a una velocidad de 5.
rabbit.hide(); // ¡Conejo Blanco se esconde!
```

Los objetos de la clase `Rabbit` tienen acceso a los métodos de `Rabbit`, como `rabbit.hide()`, y también a los métodos `Animal`, como `rabbit.run()`.

Internamente, la palabra clave `extends` funciona con la buena mecánica de prototipo: establece `Rabbit.prototype.[[Prototype]]` a `Animal.prototype`. Entonces, si no se encuentra un método en `Rabbit.prototype`, JavaScript lo toma de `Animal.prototype`.

![](animal-rabbit-extends.svg)

Por ejemplo, para encontrar el método `rabbit.run`, el motor revisa (en la imagen, de abajo hacia arriba):
1. El objeto `rabbit`: no tiene el método `run`.
2. Su prototipo, que es `Rabbit.prototype`: tiene el método `hide`, pero no el método `run`.
3. Su prototipo, que es `Animal.prototype` (debido a `extends`): Este finalmente tiene el método `run`.

Como podemos recordar del capítulo <info:native-prototypes>, JavaScript usa la misma herencia prototípica para los objetos incorporados. Por ejemplo, `Date.prototype.[[Prototype]]` es `Object.prototype`. Es por esto que "Date" tiene acceso a métodos de objeto genéricos.

````smart header="Cualquier expresión está permitida después de `extends`"
La sintaxis de clase permite especificar no solo una clase, sino cualquier expresión después de `extends`.

Por ejemplo, una llamada a función que genera la clase padre:

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

*!*
class User extends f("Hola") {}
*/!*

new User().sayHi(); // Hola
```
Observa que `class User` hereda del resultado de `f("Hola")`.

Eso puede ser útil para patrones de programación avanzados cuando usamos funciones para generar clases dependiendo de muchas condiciones y podamos heredar de ellas.
````

## Sobrescribir un método

Ahora avancemos y sobrescribamos un método. Por defecto, todos los métodos que no están especificados en la clase `Rabbit` se toman directamente "tal cual" de la clase `Animal`.

Pero Si especificamos nuestro propio método `stop()` en `Rabbit`, es el que se utilizará en su lugar:

```js
class Rabbit extends Animal {
  stop() {
    // ...esto se usará para rabbit.stop()
    // en lugar de stop() de la clase Animal
  }
}
```

Usualmente, no queremos reemplazar totalmente un método padre, sino más bien construir sobre él, modificarlo o ampliar su funcionalidad. Hacemos algo con nuestro método, pero queremos llamar al método padre antes, después o durante el proceso.

Las clases proporcionan la palabra clave `"super"` para eso.

- `super.metodo(...)` llama un método padre.
- `super(...)` llama un constructor padre (solo dentro de nuestro constructor).

Por ejemplo, hagamos que nuestro conejo se oculte automáticamente cuando se detenga:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} corre a una velocidad de ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} se queda quieto.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`¡${this.name} se esconde!`);
  }

*!*
  stop() {
    super.stop(); // llama el stop padre
    this.hide(); // y luego hide
  }
*/!*
}

let rabbit = new Rabbit("Conejo Blanco");

rabbit.run(5); // Conejo Blanco corre a una velocidad de 5.
rabbit.stop(); // Conejo Blanco se queda quieto. ¡Conejo Blanco se esconde!
```

Ahora `Rabbit` tiene el método `stop` que llama al padre `super.stop()` en el proceso.

````smart header="Las funciones de flecha no tienen `super`"
Como se mencionó en el capítulo <info:arrow-functions>, las funciones de flecha no tienen `super`.

Si se lo accede, lo toma de la función externa. Por ejemplo:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // llama al stop() padre después de 1 segundo
  }
}
```

El método `super` en la función de flecha es el mismo que en `stop()`, y funciona según lo previsto. Si aquí especificáramos una función "regular", habría un error:

```js
// super inesperado
setTimeout(function() { super.stop() }, 1000);
```
````


## Sobrescribir un constructor

Con los constructores se pone un poco complicado.

Hasta ahora, `Rabbit` no tenía su propio `constructor`.

De acuerdo con la [especificación](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), si una clase extiende otra clase y no tiene `constructor`, se genera el siguiente `constructor` "vacío":

```js
class Rabbit extends Animal {
  // es generado por extender la clase sin constructor propio
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

Como podemos ver, básicamente llama al `constructor` padre pasándole todos los argumentos. Esto sucede si no escribimos un constructor propio.

Ahora agreguemos un constructor personalizado a `Rabbit`. Especificará `earLength` además de `name`:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
// No funciona!
let rabbit = new Rabbit("Conejo Blanco", 10); // Error: this no está definido.
*/!*
```

¡Vaya! Tenemos un error. Ahora no podemos crear conejos. ¿Qué salió mal?

La respuesta corta es: 

- **Los constructores en las clases heredadas deben llamar a `super(...)`, y (¡!) hacerlo antes de usar `this`**.

...¿Pero por qué? ¿Qué está pasando aqui? De hecho, el requisito parece extraño.

Por supuesto, hay una explicación. Vamos a entrar en detalles, para que realmente entiendas lo que está pasando.

En JavaScript, hay una distinción entre una función constructora de una clase heredera (llamada "constructor derivado") y otras funciones. Un constructor derivado tiene una propiedad interna especial `[[ConstructorKind]]:"derived"`. Esa es una etiqueta interna especial.

Esa etiqueta afecta su comportamiento con `new`.

- Cuando una función regular se ejecuta con `new`, crea un objeto vacío y lo asigna a `this`.
- Pero cuando se ejecuta un constructor derivado, no hace esto. Espera que el constructor padre haga este trabajo.

Entonces un constructor derivado debe llamar a `super` para ejecutar su constructor padre (base), de lo contrario no se creará el objeto para `this`. Y obtendremos un error.

Para que el constructor `Rabbit` funcione, necesita llamar a `super()` antes de usar `this`, como aquí:

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
// todo bien ahora
let rabbit = new Rabbit("Conejo Blanco", 10);
alert(rabbit.name); // Conejo Blanco
alert(rabbit.earLength); // 10
*/!*
```



### Sobrescribiendo campos de clase: una nota con trampa

```warn header="Nota avanzada"
Esta nota asume que tienes cierta experiencia con clases, quizás en otros lenguajes de programación.

Brinda una visión más profunda al lenguaje y también explica el comportamiento que podría causar errores (pero no muy a menudo).

Si lo encuentras difícil de entender, simplemente sigue adelante, continúa leyendo y vuelve aquí más adelante.
```

Podemos sobrescribir no solo métodos, sino también los campos de la clase.

Pero hay un comportamiento peculiar cuando accedemos a los campos sobrescritos en el constructor padre, muy diferente a de la mayoría de los demás lenguajes de programación.

Considera este ejemplo:

```js run
class Animal {
  name = 'animal';

constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

Aquí, la clase `Rabbit` extiende `Animal` y sobrescribe el campo `name` con un valor propio.

`Rabbit` no tiene su propio constructor, entonces es llamado el de `Animal`.

Lo interesante es que en ambos casos: `new Animal()` y `new Rabbit()`, el `alert` en la línea `(*)` muestra `animal`.

**En otras palabras, el constructor padre siempre usa el valor de su propio campo de clase, no el sobrescrito.**

¿Qué es lo extraño de esto?

Si esto aún no está claro, comparáralo con lo que ocurre con los métodos.

Aquí está el mismo código, pero en lugar del campo `this.name` llamamos el método `this.showName()`:

```js run
class Animal {
  showName() {  // en vez de this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // en vez de alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

Observa que ahora la salida es diferente.

Y es lo que esperamos naturalmente. Cuando el constructor padre es llamado en la clase derivada, usa el método sobrescrito.

...Pero con los campos esto no es así. Como dijimos antes, el constructor padre siempre utiliza el campo padre.

¿Por que existe la diferencia?

Bien, la razón está en el orden de inicialización, El campo de clase es inicializado:
- Antes del constructor para la clase de base (que no extiende nada),
- Inmediatamente después de `super()` para la clase derivada.

En nuestro caso, `Rabbit` es la clase derivada. No hay `constructor()` en ella. Como establecimos previamente, es lo mismo que si hubiera un constructor vacío con solamente `super(...args)`.

Entonces, `new Rabbit()` llama a `super()` y se ejecuta el constructor padre, y (por la regla de la clase derivada) solamente después de que sus campos de clase sean inicializados. En el momento de la ejecución del constructor padre, todavía no existen los campos de clase de `Rabbit`, por ello los campos de `Animal` son los usados.

Esta sutil diferencia entre campos y métodos es particular de JavaScript

Afortunadamente este comportamiento solo se revela si los campos sobrescritos son usados en el constructor padre. En tal caso puede ser difícil entender qué es lo que está pasando, por ello lo explicamos aquí.

Si esto se vuelve un problema, uno puede corregirlo usando métodos o getters/setters en lugar de campos.


## El método `super` internamente [[HomeObject]] 

```warn header="Información avanzada"
Si está leyendo el tutorial por primera vez, esta sección puede omitirse.

Esta sección trata de los mecanismos internos detrás de la herencia y el método `super`.
```

Vamos a profundizar un poco más el tema de `super`. Veremos algunas cosas interesantes en el camino.

En primer lugar, de todo lo que hemos aprendido hasta ahora, ¡es imposible que `super` funcione en absoluto!

Entonces, preguntémonos: ¿cómo debería funcionar técnicamente? Cuando se ejecuta un método de objeto, obtiene el objeto actual como `this`. Si llamamos a `super.method()` entonces, el motor necesita obtener el `method` del prototipo del objeto actual. ¿Pero cómo?

La tarea puede parecer simple, pero no lo es. El motor conoce el objeto actual `this`, por lo que podría obtener el `method` padre como `this.__proto __.method`. Desafortunadamente, una solución tan "ingenua" no funcionará.

Demostremos el problema. Sin clases, usando objetos puros por simplicidad.

Puedes omitir esta parte e ir a la subsección `[[HomeObject]]` si no deseas conocer los detalles. Eso no hará daño. O sigue leyendo si estás interesado en comprender las cosas en profundidad.

En el siguiente ejemplo, se hace la asignación `rabbit.__ proto__ = animal`. Ahora intentemos: en `rabbit.eat()` llamaremos a `animal.eat()`, usando `this.__proto__`:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} come.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Conejo",
  eat() {
*!*
    // así es como supuestamente podría funcionar super.eat()
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Conejo come.
```

En la línea `(*)` tomamos `eat` del prototipo (`animal`) y lo llamamos en el contexto del objeto actual. Tenga en cuenta que `.call(this)` es importante aquí, porque un simple `this.__ proto __.eat()` ejecutaría al padre `eat` en el contexto del prototipo, no del objeto actual.

Y en el código anterior, funciona según lo previsto: tenemos el `alert` correcto.

Ahora agreguemos un objeto más a la cadena. Veremos cómo se rompen las cosas:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} come.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...rebota al estilo de conejo y llama al método padre (animal)
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...haz algo con orejas largas y llama al método padre (rabbit)
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Se excedió el número máximo de llamadas a la pila
*/!*
```

¡El código ya no funciona! Podemos ver el error al intentar llamar a `longEar.eat()`.

Puede que no sea tan obvio, pero si depuramos la llamada `longEar.eat()`, podremos ver por qué. En ambas líneas `(*)` y `(**)` el valor de `this` es el objeto actual (`longEar`). Eso es esencial: todos los métodos de objeto obtienen el objeto actual como `this`, no un prototipo o algo así.

Entonces, en ambas líneas `(*)` y `(**)` el valor de `this.__proto__` es exactamente el mismo: `rabbit`. Ambos llaman a  `rabbit.eat` sin subir la cadena en el bucle sin fin.

Aquí está la imagen de lo que sucede:

![](this-super-loop.svg)

1. Dentro de `longEar.eat()`, la línea `(**)` llama a `rabbit.eat` proporcionándole `this=longEar`.
    ```js
    // dentro de longEar.eat() tenemos this = longEar
    this.__proto__.eat.call(this) // (**)
    // se convierte en
    longEar.__proto__.eat.call(this)
    // es decir
    rabbit.eat.call(this);
    ```
2. Luego, en la línea `(*)` de `rabbit.eat`, queremos pasar la llamada aún más arriba en la cadena; pero como `this=longEar`, entonces `this.__ proto__.eat` ¡es nuevamente `rabbit.eat`!

    ```js
    // dentro de rabbit.eat () también tenemos this = longEar
    this.__proto__.eat.call(this) // (*)
    // se convierte en
    longEar.__proto__.eat.call(this)
    // o (de nuevo)
    rabbit.eat.call(this);
    ```

3. ...Entonces `rabbit.eat` se llama a sí mismo en el bucle sin fin, porque no puede ascender más.

El problema no se puede resolver usando solamente `this`.

### `[[HomeObject]]`

Para proporcionar la solución, JavaScript agrega una propiedad interna especial para las funciones: `[[HomeObject]]`.

Cuando una función se especifica como un método de clase u objeto, su propiedad `[[HomeObject]]` se convierte en ese objeto.

Entonces `super` lo usa para resolver el problema del prototipo padre y sus métodos.

Veamos cómo funciona, primero con objetos simples:

```js run
let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} come.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Conejo",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Oreja Larga",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

*!*
// funciona correctamente
longEar.eat();  // Oreja Larga come.
*/!*
```

Funciona según lo previsto, debido a la mecánica de `[[HomeObject]]`. Un método, como `longEar.eat`, conoce su `[[HomeObject]]` y toma el método padre de su prototipo. Sin el uso de `this`.

### Los métodos no son "libres"

Como aprendimos antes, generalmente las funciones son "libres", es decir que no están vinculadas a objetos en JavaScript. Esto es para que puedan copiarse entre objetos y llamarse con otro 'this`.

La existencia misma de `[[HomeObject]]` viola ese principio, porque los métodos recuerdan sus objetos. `[[HomeObject]]` no se puede cambiar, por lo que este vínculo es para siempre.

El único lugar en el lenguaje donde se usa `[[HomeObject]]` es en `super`. Si un método no usa `super`, entonces todavía podemos considerarlo "libre" y copiarlo entre objetos. Pero con `super` las cosas pueden salir mal.

Aquí está la demostración de un resultado incorrecto de `super` después de copiarlo:

```js run
let animal = {
  sayHi() {
    alert(`Soy un animal`);
  }
};

// rabbit hereda de animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("Soy una planta");
  }
};

// tree hereda de plant
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // Soy un animal (?!?)
*/!*
```

Una llamada a `tree.sayHi()` muestra "Soy un animal". Definitivamente mal.

La razón es simple:
- En la línea `(*)`, el método `tree.sayHi` se copió de `rabbit`. ¿Quizás solo queríamos evitar la duplicación de código?
- Su `[[HomeObject]]` es `rabbit`, ya que fue creado en `rabbit`. No hay forma de cambiar `[[HomeObject]]`.
- El código de `tree.sayHi()` tiene dentro a `super.sayHi()`. Sube desde 'rabbit' y toma el método de 'animal'.

Aquí está el diagrama de lo que sucede:

![](super-homeobject-wrong.svg)

### Métodos, no propiedades de función

`[[HomeObject]]` se define para métodos tanto en clases como en objetos simples. Pero para los objetos, los métodos deben especificarse exactamente como `method()`, no como `"method: function()"`.

La diferencia puede no ser esencial para nosotros, pero es importante para JavaScript.

En el siguiente ejemplo, se utiliza una sintaxis sin método para la comparación. La propiedad `[[HomeObject]]` no está establecida y la herencia no funciona:

```js run
let animal = {
  eat: function() { // escrito así intencionalmente en lugar de eat() {...
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
rabbit.eat();  // Error al llamar a super (porque no hay [[HomeObject]])
*/!*
```

## Resumen

1. Para extender una clase: `class Hijo extends Padre`:
     - Eso significa que `Hijo.prototype.__proto__` será `Padre.prototype`, por lo que los métodos se heredan.
2. Al sobrescribir un constructor:
     - Debemos llamar al constructor del padre `super()` en el constructor de `Hijo` antes de usar `this`.
3. Al sobrescribir otro método:
     - Podemos usar `super.method()` en un método `Hijo` para llamar al método `Padre`.
4. Características internas:
     - Los métodos recuerdan su clase/objeto en la propiedad interna `[[HomeObject]]`. Así es como `super` resuelve los métodos padres.
     - Por lo tanto, no es seguro copiar un método con `super` de un objeto a otro.

También:
- Las funciones de flecha no tienen su propio `this` o `super`, por lo que se ajustan de manera transparente al contexto circundante.
