
# Propiedades y métodos privados y protegidos.

Uno de los principios más importantes de la programación orientada a objetos: delimitar la interfaz interna de la externa.

Esa es una práctica "imprescindible" en el desarrollo de algo más complejo que una aplicación "hola mundo".

Para entender esto, alejémonos del desarrollo y volvamos nuestros ojos al mundo real..

Por lo general, los dispositivos que estamos usando son bastante complejos. Pero delimitar la interfaz interna de la externa permite usarlas sin problemas.

## Un ejemplo de la vida real

Por ejemplo, una máquina de café. Simple desde el exterior: un botón, una pantalla, algunos agujeros ... Y, seguramente, el resultado: ¡excelente café! :)

![](coffee.jpg)

Pero adentro ... (una imagen del manual de reparación)

![](coffee-inside.jpg)

Muchos detalles. Pero podemos usarlo sin saber nada.

Las cafeteras son bastante confiables, ¿no es así? Podemos usarlos por años, y solo si algo sale mal, tráigalo para repararlo.

El secreto de la fiabilidad y la simplicidad de una máquina de café: todos los detalles están bien ajustados y *ocultos* en su interior.

Si retiramos la cubierta protectora de la cafetera, su uso será mucho más complejo (¿dónde presionar?) Y peligroso (puedes electrocutarte).

Como veremos, en la programación los objetos son como máquinas de café.

Pero para ocultar detalles internos, no utilizaremos una cubierta protectora, sino una sintaxis especial del lenguaje y las convenciones.

## Interfaz interna y externa

En la programación orientada a objetos, las propiedades y los métodos se dividen en dos grupos:

- *Interfaz interna* -- métodos y propiedades, accesibles desde otros métodos de la clase, pero no desde el exterior.
- *Interfaz externa* - métodos y propiedades, accesibles también desde fuera de la clase.

Si continuamos la analogía con la máquina de café, lo que está oculto en su interior: un tubo de caldera, un elemento calefactor, etc., es su interfaz interna.

Se utiliza una interfaz interna para que el objeto funcione, sus detalles se utilizan entre sí. Por ejemplo, un tubo de caldera está unido al elemento calefactor.

Pero desde afuera, una máquina de café está cerrada por la cubierta protectora, para que nadie pueda alcanzarlos. Los detalles están ocultos e inaccesibles. Podemos usar sus funciones a través de la interfaz externa.

Entonces, todo lo que necesitamos para usar un objeto es conocer su interfaz externa. Es posible que no seamos completamente conscientes de cómo funciona dentro, y eso es genial.

Esa fue una introducción general.

En JavaScript, hay dos tipos de campos de objeto (propiedades y métodos):

- Público: accesible desde cualquier lugar. Comprenden la interfaz externa. Hasta ahora solo estábamos usando propiedades y métodos públicos.
- Privado: accesible solo desde dentro de la clase. Estos son para la interfaz interna.

En muchos otros lenguajes también existen campos "protegidos": accesibles solo desde dentro de la clase y aquellos que lo extienden (como privado, pero más acceso desde clases heredadas). También son útiles para la interfaz interna. En cierto sentido, están más extendidos que los privados, porque generalmente queremos que las clases heredadas tengan acceso a ellas.

Los campos protegidos no se implementan en JavaScript a nivel de lenguaje, pero en la práctica son muy convenientes, por lo que se emulan.

Ahora haremos una máquina de café en JavaScript con todos estos tipos de propiedades. Una máquina de café tiene muchos detalles, no los modelaremos todos, seremos simples (aunque podríamos).

## Proteger "waterAmount"

Hagamos primero una clase de cafetera simple:

```js run
class CoffeeMachine {
  waterAmount = 0; // la cantidad de agua adentro

  constructor(power) {
    this.power = power;
    alert( `Se creó una máquina de café, poder: ${power}` );
  }

}

// se crea la máquina de café
let coffeeMachine = new CoffeeMachine(100);

// agregar agua
coffeeMachine.waterAmount = 200;
```

En este momento las propiedades `waterAmount` y` power` son públicas. Podemos obtenerlos/configurarlos fácilmente desde el exterior a cualquier valor.

Cambiemos la propiedad `waterAmount` a protegida para tener más control sobre ella. Por ejemplo, no queremos que nadie lo ponga por debajo de cero.

**Las propiedades protegidas generalmente tienen el prefijo de subrayado `_`.**

Eso no se aplica a nivel de lenguaje, pero existe una convención bien conocida entre los programadores de que no se debe acceder a tales propiedades y métodos desde el exterior.

Entonces nuestra propiedad se llamará `_waterAmount`:

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Agua en negativo");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// se crea la máquina de café
let coffeeMachine = new CoffeeMachine(100);

// agregar agua
coffeeMachine.waterAmount = -10; // Error: Agua en negativo
```

Ahora el acceso está bajo control, por lo que falla el ajuste del agua por debajo de cero.

## "Power" de solo lectura

Para la propiedad `power`, hagámoslo de solo lectura. A veces sucede que una propiedad debe establecerse solo en el momento de la creación y nunca modificarse.

Ese es exactamente el caso de una máquina de café: la potencia nunca cambia.

Para hacerlo, solo necesitamos hacer `getter`, pero no `setter`:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// se crea la máquina de café
let coffeeMachine = new CoffeeMachine(100);

alert(`La potencia es: ${coffeeMachine.power}W`); // Potencia es: 100W

coffeeMachine.power = 25; // Error (sin setter)
```

````smart header="Funciones getter/setter"
Aquí usamos la sintaxis getter/setter.

Pero la mayoría de las veces las funciones `get.../set...` son preferidas, como esta:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) throw new Error("Agua en negativo");
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

Eso parece un poco más largo, pero las funciones son más flexibles. Pueden aceptar múltiples argumentos (incluso si no los necesitamos en este momento).

Por otro lado, la sintaxis get/set es más corta, por lo que, en última instancia, no existe una regla estricta, depende de usted decidir.
````

```smart header="Los campos protegidos son heredados."
Si heredamos `class MegaMachine extends CoffeeMachine`, entonces nada nos impide acceder a `this._waterAmount` o `this._power` desde los métodos de la nueva clase.

Por lo tanto, los campos protegidos son naturalmente heredables. A diferencia de los privados que veremos a continuación.
```

## "#waterLimit" Privada

[recent browser=none]

Hay una propuesta de JavaScript terminada, casi en el estándar, que proporciona soporte a nivel de idioma para propiedades y métodos privados.

Los privados deberían comenzar con `#`. Solo son accesibles desde dentro de la clase.

Por ejemplo, aquí hay una propiedad privada `#waterLimit` y el método privado de control de agua `#checkWater`:

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #checkWater(value) {
    if (value < 0) throw new Error("Agua en negativo");
    if (value > this.#waterLimit) throw new Error("Demasiada agua");
  }
*/!*

}

let coffeeMachine = new CoffeeMachine();

*!*
// no puede acceder a privados desde fuera de la clase
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

En el nivel de idioma, `#` es una señal especial de que el campo es privado. No podemos acceder desde fuera o desde clases heredadas.

Los campos privados no entran en conflicto con los públicos. Podemos tener campos privados `#waterAmount` y públicos ` waterAmount` al mismo tiempo.

Por ejemplo, hagamos que `waterAmount` sea un accesorio para `#waterAmount`:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("Agua en negativo");
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

A diferencia de los protegidos, los campos privados son aplicados por el propio lenguaje. Eso es bueno.

Pero si heredamos de `CoffeeMachine`, entonces no tendremos acceso directo a `#waterAmount`. Tendremos que confiar en el getter/setter de `waterAmount`:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: solo se puede acceder desde CoffeeMachine
*/!*
  }
}
```

En muchos escenarios, esta limitación es demasiado severa. Si ampliamos una `CoffeeMachine`, es posible que tengamos razones legítimas para acceder a sus componentes internos. Es por eso que los campos protegidos se usan con más frecuencia, aunque no sean compatibles con la sintaxis del idioma.

````warn header="Los campos privados no están disponibles como this[name]"
Los campos privados son especiales.

Como sabemos, generalmente podemos acceder a los campos usando `this[name]`:

```js
class User {
  ...
  sayHi() {
    let fieldName = "nombre";
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
  }
}
```

Con campos privados eso es imposible: `this['#name']` no funciona. Esa es una limitación de sintaxis para garantizar la privacidad.
````

## Resumen

En términos de POO, la delimitación de la interfaz interna de la externa se llama [encapsulamiento] (https://en.wikipedia.org/wiki/Encapsulation_ (computer_programming)).

Ofrece los siguientes beneficios:

Protección para los usuarios, para que no se disparen en el pie: Imagínese, hay un equipo de desarrolladores que usan una máquina de café. Fue hecho por la compañía "Best CoffeeMachine" y funciona bien, pero se quitó una cubierta protectora. Entonces la interfaz interna está expuesta.

    Todos los desarrolladores son civilizados: usan la máquina de café según lo previsto. Pero uno de ellos, John, decidió que él era el más inteligente e hizo algunos ajustes en el interior de la máquina de café. Entonces la máquina de café falló dos días después.

    Seguramente no es culpa de John, sino de la persona que quitó la cubierta protectora y dejó que John hiciera sus manipulaciones.

    Lo mismo en programación. Si un usuario de una clase cambiará cosas que no están destinadas a ser cambiadas desde el exterior, las consecuencias son impredecibles.

Soportable
: La situación en la programación es más compleja que con una máquina de café de la vida real, porque no solo la compramos una vez. El código se somete constantemente a desarrollo y mejora.

    **Si delimitamos estrictamente la interfaz interna, el desarrollador de la clase puede cambiar libremente sus propiedades y métodos internos, incluso sin informar a los usuarios.**

    Si usted es un desarrollador de tal clase, es bueno saber que los métodos privados se pueden renombrar de forma segura, sus parámetros se pueden cambiar e incluso eliminar, porque ningún código externo depende de ellos.

    Para los usuarios, cuando sale una nueva versión, puede ser una revisión total internamente, pero aún así es simple de actualizar si la interfaz externa es la misma.

Ocultando complejidad
: La gente adora usar cosas que son simples. Al menos desde afuera. Lo que hay dentro es algo diferente.

    Los programadores no son una excepción.

    **Siempre es conveniente cuando los detalles de implementación están ocultos, y hay disponible una interfaz externa simple y bien documentada.**

Para ocultar una interfaz interna utilizamos propiedades protegidas o privadas:

- Los campos protegidos comienzan con `_`. Esa es una convención bien conocida, no aplicada a nivel de lenguaje. Los programadores solo deben acceder a un campo que comience con `_` de su clase y las clases que hereden de él.
- Los campos privados comienzan con `#`. JavaScript se asegura de que solo podamos acceder a los que están dentro de la clase.

En este momento, los campos privados no son compatibles entre los navegadores, pero se pueden rellenar.
