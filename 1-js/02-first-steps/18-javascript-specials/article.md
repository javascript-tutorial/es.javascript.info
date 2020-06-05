# Especiales JavaScript

Este capítulo resume brevemente las características de JavaScript que hemos aprendido hasta ahora, prestando especial atención a los momentos sutiles.

## Estructura de Código

Las declaraciones se delimitan con un punto y coma:

```js run no-beautify
alert('Hola'); alert('Mundo');
```

Usualmente, un salto de línea también se trata como un delimitador, por lo que también funcionaría:

```js run no-beautify
alert('Hola')
alert('Mundo')
```

Eso se llama "inserción automática de punto y coma". A veces no funciona, por ejemplo:

```js run
alert("Habrá un error después de este mensaje.")


[1, 2].forEach(alert)
```

La mayoría de las guías de estilo de código coinciden en que debemos poner un punto y coma después de cada declaración.

Los puntos y comas no son necesarios después los bloques de codigo `{...}` y los constructores de sintaxis como los bucles:

```js
function f() {
  // no se necesita punto y coma después de la declaración de función
}

for(;;) {
  // no se necesita punto y coma después del bucle
}
```

...Pero incluso si colocasemos un punto y coma "extra" en alguna parte, eso no es un error. Solo sería ignorado.

Más en: <info:structure>.

## Modo estricto

Para habilitar completamente todas las características de JavaScript moderno, debemos comenzar los scripts con `"use strict"`.

```js
'use strict';

...
```

La directiva debe estar en la parte superior de un script o al comienzo de una función.

Sin la directiva `"use strict"`, todo sigue funcionando, pero algunas características se comportan de la manera antigua y "compatible". Generalmente preferimos el comportamiento moderno.

Algunas características modernas del lenguaje (como las clases que estudiaremos en el futuro) activan el modo estricto implícitamente.

Más en: <info:strict-mode>.

## Variables

Se pueden declarar usando:

- `let`
- `const` (constante, no se puede cambiar)
- `var` (estilo antiguo, lo veremos más tarde)


Un nombre de variable puede incluir:
- Letras y dígitos, pero el primer carácter puede no ser un dígito.
- Los caracteres `$` y `_` son normales, al igual que las letras.
- Los alfabetos y jeroglíficos no latinos también están permitidos, pero comúnmente no se usan.

Las variables se escriben dinámicamente. Pueden almacenar cualquier valor:

```js
let x = 5;
x = "John";
```

Hay 7 tipos de datos:

- `number` tanto para números de punto flotante como enteros,
- `string` para textos,
- `boolean` para valores lógicos: `true/false`,
- `null` -- un tipo con un solo valor `null`, que significa "vacío" o "no existe",
- `undefined` -- un tipo con un solo valor `undefined`, que significa "no asignado",
- `object` y `symbol` -- para estructuras de datos complejas e identificadores únicos, aún no los hemos aprendido.

El operador `typeof` devuelve el tipo de un valor, con dos excepciones:
```js
typeof null == "object" // error del lenguaje
typeof function(){} == "function" // las funciones son tratadas especialmente
```

Más en: <info:variables> y <info:types>.

## Interacción

Estamos utilizando un navegador como entorno de trabajo, por lo que las funciones básicas de la interfaz de usuario serán:

[`prompt(question, [default])`](mdn:api/Window/prompt)
: Hace una pregunta `question`, y devuelve lo que ingresó el visitante o`null` si presionaron "cancelar".

[`confirm(question)`](mdn:api/Window/confirm)
: Hace una pregunta `question`, y sugiere elegir entre Aceptar y Cancelar. La eleccion se devuelve como booleano `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Muestra un `message`.

Todas estas funciones son *modales*, pausan la ejecución del código y evitan que el visitante interactúe con la página hasta que responda.

Por ejemplo:

```js run
let userName = prompt("¿Su nombre?", "Alice");
let isTeaWanted = confirm("¿Quiere té?");

alert( "Visitante: " + userName ); // Alice
alert( "Quiere te: " + isTeaWanted ); // true
```

Más en: <info:alert-prompt-confirm>.

## Operadores

JavaScript soporta los siguientes operadores:

Aritmeticos
: Regulares: `* + - /`, tambien `%` para los restos y `**` para aplicar potencia de un número.

    El binario más `+` concatena textos. Y si alguno de los operandos es un texto, el otro también se convierte en texto:

    ```js run
    alert( '1' + 2 ); // '12', texto
    alert( 1 + '2' ); // '12', texto
    ```

Asignaciones
: He aqui una asignacion simple: `a = b` y una combinada `a *= 2`.

Operador bit a bit
: Los operadores bit a bit funcionan con enteros a nivel de bit: mire la [documentación](mdn:/JavaScript/Reference/Operators/Bitwise_Operators) cuando son necesarios.

Ternarios
: El único operador con 3 parametros: `cond ? resultA : resultB`. Sí `cond` es verdadera, devuelve `resultA`, de lo contrario `resultB`.

Operadores Lógicos
: Logicos Y `&&` y Ó `||` realice una evaluación de cortocircuito y luego devuelva el valor donde se detuvo. Lógicos NOT `!` convierte el operando a tipo booleano y devuelve el valor inverso.

Comparadores
: Revision de igualdad `==` para valores de diferentes tipos los convierte en un número (excepto `null` y `undefined` que son iguales entre sí y nada más), por lo que son iguales:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Otras comparaciones también se convierten en un número.

    El operador de igualdad estricta `===` no realiza la conversión: diferentes tipos siempre significan diferentes valores para ella, así que:

    Valores `null` y `undefined` son especiales: son iguales `==` el uno al otro y no son iguales a nada más.

    Las comparaciones mayores / menores comparan las cadenas carácter por carácter, otros tipos se convierten en un número.

Otros operadores
: Hay algunos otros, como un operador de coma.

Más en: <info:operators>, <info:comparison>, <info:logical-operators>.

## Bucles

- Cubrimos 3 tipos de bucles:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- La variable declarada en `for(let...)` El bucle solo es visible dentro del bucle. Pero también podemos omitir el `let` y reutilizar una variable existente.
- Directivas `break/continue` permiten salir de todo el ciclo/iteración actual. Use etiquetas para romper bucles anidados.

Detalles en: <info:while-for>.

Más adelante estudiaremos más tipos de bucles para tratar con objetos.

## El constructor "switch"

El constructor "switch" puede reemplazar múltiples revisiones con `if`. Utiliza `===` (igualdad estricta) para comparar.

Por ejemplo:

```js run
let age = prompt('¿Su Edad?', 18);

switch (age) {
  case 18:
    alert("No funciona"); // the result of prompt is a string, not a number

  case "18":
    alert("¡Funciona!");
    break;

  default:
    alert("Cualquier valor no igual a uno arriba");
}
```

Detalles en: <info:switch>.

## Funciones

Cubrimos tres formas de crear una función en JavaScript:

1. Declaración de función: la función en el flujo del código principal

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Expresión de función: la función en el contexto de una expresión

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    }
    ```
    Las expresiones de función pueden tener un nombre, como `sum = function name(a, b)`, pero ese `name` solo es visible dentro de esa función.

3. Funciones de flecha:

    ```js
    // expression at the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```

- Las funciones pueden tener variables locales: aquellas declaradas dentro de su cuerpo. Estas variables solo son visibles dentro de la función.
- Los parámetros pueden tener valores predeterminados: `function sum(a = 1, b = 2) {...}`.
- Las funciones siempre devuelven algo. Si no hay `return`, entonces el resultado es `undefined`.


| Declaración de funciones | Expresión de funciones |
|----------------------|---------------------|
| visible en todo el bloque de código | creado cuando la ejecución lo alcanza |
|   - | puede tener un nombre, visible solo dentro de la función |

Más: ver <info:function-basics>, <info:function-expressions-arrows>.

## Más por venir

Esa fue una breve lista de características de JavaScript. Por ahora solo hemos estudiado lo básico. Más adelante en el tutorial encontrará más características especiales y avanzadas de JavaScript.
