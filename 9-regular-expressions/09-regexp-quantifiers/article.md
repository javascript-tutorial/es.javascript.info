# Cuantificadores +, *, ? y {n}

Digamos que tenemos una cadena como `+7 (903) -123-45-67` y queremos encontrar todos los números en ella. Pero contrastando el ejemplo anterior, no estamos interesados en un solo dígito, sino en números completos: `7, 903, 123, 45, 67`.

Un número es una secuencia de 1 o más dígitos `pattern:\d`. Para marcar cuántos necesitamos, podemos agregar un *cuantificador*.

## Cantidad {n}

El cuantificador más simple es un número entre llaves: `pattern:{n}`.

Se agrega un cuantificador a un carácter (o a una clase de caracteres, o a un conjunto `[...]`, etc) y especifica cuántos necesitamos.

Tiene algunas formas avanzadas, veamos los ejemplos:

El recuento exacto: `pattern:{5}`
: `pattern:\d{5}` Denota exactamente 5 dígitos, igual que `pattern:\d\d\d\d\d`.

    El siguiente ejemplo busca un número de 5 dígitos:

    ```js run
    alert( "Tengo 12345 años de edad".match(/\d{5}/) ); //  "12345"
    ```

    Podemos agregar `\b` para excluir números largos: `pattern:\b\d{5}\b`.

El rango: `pattern:{3,5}`, coincide 3-5 veces
: Para encontrar números de 3 a 5 dígitos, podemos poner los límites en llaves: `pattern:\d{3,5}`

    ```js run
    alert( "No tengo 12, sino 1234 años de edad".match(/\d{3,5}/) ); // "1234"
    ```

    Podemos omitir el límite superior

    Luego, una regexp `pattern:\d{3,}` busca secuencias de dígitos de longitud `3` o más:

    ```js run
    alert( "No tengo 12, sino, 345678 años de edad".match(/\d{3,}/) ); // "345678"
    ```

Volvamos a la cadena `+7(903)-123-45-67`.

Un número es una secuencia de uno o más dígitos continuos. Entonces la expresión regular es `pattern:\d{1,}`:

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## Abreviaciones

Hay abreviaciones para los cuantificadores más usados:

`pattern:+`
: Significa "uno o más", igual que `pattern:{1,}`.

    Por ejemplo, `pattern:\d+` busca números:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
: Significa "cero o uno", igual que `pattern:{0,1}`. En otras palabras, hace que el símbolo sea opcional.

    Por ejemplo, el patrón `pattern:ou?r` busca `match:o` seguido de cero o uno `match:u`, y luego `match:r`.

    Entonces, `pattern:colou?r` encuentra ambos `match:color` y `match:colour`:

    ```js run
    let str = "¿Debo escribir color o colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
: Significa "cero o más", igual que `pattern:{0,}`. Es decir, el carácter puede repetirse muchas veces o estar ausente.

    Por ejemplo, `pattern:\d0*` busca un dígito seguido de cualquier número de ceros (puede ser muchos o ninguno):

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    Compáralo con `pattern:+` (uno o más):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 no coincide, ya que 0+ requiere al menos un cero
    ```

## Más ejemplos

Los cuantificadores se usan con mucha frecuencia. Sirven como el "bloque de construcción" principal de expresiones regulares complejas, así que veamos más ejemplos.

**Regexp para fracciones decimales (un número con coma flotante): `pattern:\d+\.\d+`**

En acción:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regexp para una "etiqueta HTML de apertura sin atributos", tales como `<span>` o `<p>`.**

1. La más simple: `pattern:/<[a-z]+>/i`

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    La regexp busca el carácter `pattern:'<'` seguido de una o más letras latinas, y el carácter `pattern:'>'`.

2. Mejorada: `pattern:/<[a-z][a-z0-9]*>/i`

    De acuerdo al estándar, el nombre de una etiqueta HTML puede tener un dígito en cualquier posición excepto al inicio, tal como `<h1>`.

    ```js run
    alert( "<h1>Hola!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

**Regexp para "etiquetas HTML de apertura o cierre sin atributos": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

Agregamos una barra opcional `pattern:/?` cerca del comienzo del patrón. Se tiene que escapar con una barra diagonal inversa, de lo contrario, JavaScript pensaría que es el final del patrón.

```js run
alert( "<h1>Hola!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="Para hacer más precisa una regexp, a menudo necesitamos hacerla más compleja"
Podemos ver una regla común en estos ejemplos: cuanto más precisa es la expresión regular, es más larga y compleja.

Por ejemplo, para las etiquetas HTML debemos usar una regexp más simple: `pattern:<\w+>`. Pero como HTML tiene normas estrictas para los nombres de etiqueta, `pattern:<[a-z][a-z0-9]*>` es más confiable.

¿Podemos usar `pattern:<\w+>` o necesitamos `pattern:<[a-z][a-z0-9]*>`?

En la vida real, ambas variantes son aceptables. Depende de cuán tolerantes podamos ser a las coincidencias "adicionales" y si es difícil o no eliminarlas del resultado por otros medios.
```
