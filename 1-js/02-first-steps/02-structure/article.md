# Estructura del código

Lo primero que estudiaremos son los bloques de construcción del código.

## Sentencias

Las sentencias son construcciones sintácticas y comandos que realizan acciones.

Ya hemos visto una sentencia, `alert('¡Hola mundo!')`, que muestra el mensaje "¡Hola mundo!".

Podemos tener tantas sentencias en nuestro código como queramos, las cuales se pueden separar con un punto y coma.

Por ejemplo, aquí separamos "Hello World" en dos alerts:

```js run no-beautify
alert('Hola'); alert('Mundo');
```

Generalmente, las sentencias se escriben en líneas separadas para hacer que el código sea más legible:

```js run no-beautify
alert('Hola');
alert('Mundo');
```

## Punto y coma [#semicolon]

Se puede omitir un punto y coma en la mayoría de los casos cuando existe un salto de línea.

Esto también funcionaría:

```js run no-beautify
alert('Hola')
alert('Mundo')
```

Aquí, JavaScript interpreta el salto de línea como un punto y coma "implícito". Esto se denomina [inserción automática de punto y coma](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**En la mayoría de los casos, una nueva línea implica un punto y coma. Pero "en la mayoría de los casos" no significa "siempre"!**

Hay casos en que una nueva línea no significa un punto y coma. Por ejemplo:

```js run no-beautify
alert(3 +
1
+ 2);
```

El código da como resultado `6` porque JavaScript no inserta punto y coma aquí. Es intuitivamente obvio que si la línea termina con un signo más `"+"`, es una "expresión incompleta", por lo que no se requiere el punto y coma. Y en este caso eso funciona según lo previsto.

**Pero hay situaciones en las que JavaScript "falla" al asumir un punto y coma donde realmente se necesita.**

Los errores que ocurren en tales casos son bastante difíciles de encontrar y corregir.

````smart header="Un ejemplo de error"
Si tienes curiosidad por ver un ejemplo concreto de tal error, mira este código:

```js run
[1, 2].forEach(alert)
```

No es necesario pensar en el significado de los corchetes `[]` y `forEach` todavía, los estudiaremos más adelante. Por ahora, solo recuerda el resultado del código: muestra `1` luego `2`.

Ahora, agreguemos un 'alert' antes del código y *no* terminemos con un punto y coma:

```js run no-beautify
alert("Habrá un error")

[1, 2].forEach(alert)
```

Ahora, si ejecutamos el código, ¡solo se muestra el primer `alert` y luego tenemos un error!

Pero todo está bien nuevamente si agregamos un punto y coma después de `alert`:
```js run
alert("Todo bien ahora");

[1, 2].forEach(alert)
```

Ahora tenemos el mensaje "Todo bien ahora" seguido de `1` y `2`.


El error en la variante sin punto y coma se produce porque JavaScript no asume un punto y coma antes de los corchetes `[...]`.

Entonces, como el punto y coma no se inserta automáticamente, el código del primer ejemplo se trata como una sola sentencia. Así es como lo ve el motor:

```js run no-beautify
alert("Habrá un error")[1, 2].forEach(alert)
```

Pero deberían ser dos sentencias separadas, no una. Tal unión en este caso es simplemente incorrecta, de ahí el error. Esto puede suceder en otras situaciones también.
````

Recomendamos colocar puntos y coma entre las sentencias, incluso si están separadas por saltos de línea. Esta regla está ampliamente adoptada por la comunidad. Notemos una vez más que es posible omitir los puntos y coma la mayoría del tiempo. Pero es más seguro, especialmente para un principiante, usarlos.

## Comentarios

<<<<<<< HEAD
A medida que pasa el tiempo, los programas se vuelven cada vez más complejos. Se hace necesario agregar *comentarios* que describan lo que hace el código y por qué.
=======
## Comments [#code-comments]
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

Los comentarios se pueden poner en cualquier lugar de un script. No afectan su ejecución porque el motor simplemente los ignora.


**Los comentarios de una línea comienzan con dos caracteres de barra diagonal `//`.**

El resto de la línea es un comentario. Puede ocupar una línea completa propia o seguir una sentencia.

Como aqui:
```js run
// Este comentario ocupa una línea propia.
alert('Hello');

alert('World'); // Este comentario sigue a la sentencia.
```

**Los comentarios de varias líneas comienzan con una barra inclinada y un asterisco <code>/&#42;</code> y terminan con un asterisco y una barra inclinada <code>&#42;/</code>.**

Como aquí:

```js run
/* Un ejemplo con dos mensajes.
Este es un comentario multilínea.
*/
alert('Hola');
alert('Mundo');
```

El contenido de los comentarios se ignora, por lo que si colocamos el código dentro de <code>/&#42; ... &#42;/</code>, no se ejecutará.

A veces puede ser útil deshabilitar temporalmente una parte del código:

```js run
/* Comentando el código
alert('Hola');
*/
alert('Mundo');
```

```smart header="¡Usa accesos rápidos del teclado!"
En la mayoría de los editores, se puede comentar una línea de código presionando `key:Ctrl+/` para un comentario de una sola línea y algo como `key:Ctrl+Shift+/` - para comentarios de varias líneas (selecciona una parte del código y pulsa la tecla de acceso rápido). Para Mac, intenta `key: Cmd` en lugar de `key: Ctrl`.
```

````warn header="¡Los comentarios anidados no son compatibles!"
No puede haber `/*...*/` dentro de otro `/*...*/`.

Dicho código terminará con un error:

```js run no-beautify
/*
  /* comentario anidado ?!? */
*/
alert( 'Mundo' );
```
````

Por favor, no dudes en comentar tu código.

Los comentarios aumentan el tamaño general del código, pero eso no es un problema en absoluto. Hay muchas herramientas que minimizan el código antes de publicarlo en un servidor de producción. Eliminan los comentarios, por lo que no aparecen en los scripts de trabajo. Por lo tanto, los comentarios no tienen ningún efecto negativo en la producción.

Más adelante, en el tutorial, habrá un capítulo <info:coding-style> que también explica cómo escribir mejores comentarios.

