# Límite de palabra: \b

Un límite de palabra `pattern:\b` es una prueba, al igual que `pattern:^` y `pattern:$`.

Cuando el motor regex (módulo de programa que implementa la búsqueda de expresiones regulares) se encuentra con `pattern:\b`, comprueba que la posición en la cadena es un límite de palabra.

Hay tres posiciones diferentes que califican como límites de palabras:

- Al comienzo de la cadena, si el primer carácter de cadena es un carácter de palabra `pattern:\w`.
- Entre dos caracteres en la cadena, donde uno es un carácter de palabra `pattern:\w` y el otro no.
- Al final de la cadena, si el último carácter de la cadena es un carácter de palabra `pattern:\w`.

Por ejemplo, la expresión regular `pattern:\bJava\b` se encontrará en `subject:Hello, Java!`, donde `subject:Java` es una palabra independiente, pero no en `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

En la cadena `subject:Hello, Java!` las flechas que se muestran corresponden a `pattern:\b`, ver imagen:

![](hello-java-boundaries.svg)

Entonces, coincide con el patrón `pattern:\bHello\b`, porque:

1. Al comienzo de la cadena coincide con la primera prueba: `pattern:\b`.
2. Luego coincide con la palabra `pattern:Hello`.
3. Luego, la prueba `pattern:\b` vuelve a coincidir, ya que estamos entre `subject:o` y una coma.

El patrón `pattern:\bHello\b` también coincidiría. Pero no `pattern:\bHel\b` (porque no hay límite de palabras después de `l`) y tampoco `Java!\b` (porque el signo de exclamación no es un carácter común `pattern:\w`, entonces no hay límite de palabras después de eso).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (sin coincidencia)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (sin coincidencia)
```

Podemos usar `pattern:\b` no solo con palabras, sino también con dígitos.

Por ejemplo, el patrón `pattern:\b\d\d\b` busca números independientes de 2 dígitos. En otras palabras, busca números de 2 dígitos que están rodeados por caracteres diferentes de `pattern:\w`, como espacios o signos de puntuación (o texto de inicio/fin).

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="El límite de palabra `pattern:\b` no funciona para alfabetos no latinos"
La prueba de límite de palabra `pattern:\b` verifica que debe haber un `pattern:\w` en un lado de la posición y "no `pattern:\w`"- en el otro lado.

Pero `pattern:\w` significa una letra latina `a-z` (o un dígito o un guión bajo), por lo que la prueba no funciona para otros caracteres, p.ej.: letras cirílicas o jeroglíficos.
```
