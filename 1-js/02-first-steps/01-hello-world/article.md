# ¡Hola, mundo!

<<<<<<< HEAD
El tutorial que estás leyendo trata sobre el núcleo JavaScript, que es independiente de la plataforma. Más adelante, aprenderás sobre Node.JS y otras plataformas que lo utilizan.

Pero necesitamos un entorno de trabajo para ejecutar nuestros scripts y, dado que este libro está en línea, el navegador es una buena opción. Mantendremos la cantidad de comandos específicos del navegador (como `alert`) a un mínimo para que no dediques tiempo a ellos si planeas concentrarte en otro entorno (como Node.JS). Nos centraremos en JavaScript en el navegador en la [siguiente parte](/ui) del tutorial.

Entonces, primero, veamos cómo adjuntamos un script a una página web. Para entornos del lado del servidor (como Node.JS), puedes ejecutar el script con un comando como `"node my.js"`.
=======
This part of the tutorial is about core JavaScript, the language itself.

But we need a working environment to run our scripts and, since this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum so that you don't spend time on them if you plan to concentrate on another environment (like Node.js). We'll focus on JavaScript in the browser in the [next part](/ui) of the tutorial.

So first, let's see how we attach a script to a webpage. For server-side environments (like Node.js), you can execute the script with a command like `"node my.js"`.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0


## La etiqueta "script"

Los programas de JavaScript se pueden insertar en cualquier parte de un documento HTML con la ayuda de la etiqueta `<script>`.

Por ejemplo:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Antes del script...</p>

*!*
  <script>
    alert( '¡Hola, mundo!' );
  </script>
*/!*

  <p>...Después del script.</p>

</body>

</html>
```

```online
Puedes ejecutar el ejemplo haciendo clic en el botón "Play" en la esquina superior derecha del cuadro de arriba.
```

La etiqueta `<script>` contiene código JavaScript que se ejecuta automáticamente cuando el navegador procesa la etiqueta.


## Marcado moderno

La etiqueta `<script>` tiene algunos atributos que rara vez se usan en la actualidad, pero aún se pueden encontrar en código antiguo:

<<<<<<< HEAD
El atributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: El antiguo estándar HTML, HTML4, requería que un script tuviera un `type`. Por lo general, era `type="text/javascript"`. Ya no es necesario. Además, el estándar HTML moderno, HTML5, cambió totalmente el significado de este atributo. Ahora, se puede utilizar para módulos de JavaScript. Pero eso es un tema avanzado, hablaremos sobre módulos en otra parte del tutorial.
=======
The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>
: The old HTML standard, HTML4, required a script to have a `type`. Usually it was `type="text/javascript"`. It's not required anymore. Also, the modern HTML standard totally changed the meaning of this attribute. Now, it can be used for JavaScript modules. But that's an advanced topic; we'll talk about modules in another part of the tutorial.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

El atributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Este atributo estaba destinado a mostrar el lenguaje del script. Este atributo ya no tiene sentido porque JavaScript es el lenguaje predeterminado. No hay necesidad de usarlo.

Comentarios antes y después de los scripts.
: En libros y guías realmente antiguos, puede encontrar comentarios dentro de las etiquetas `<script>`, como el siguiente:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

<<<<<<< HEAD
Este truco no se utiliza en JavaScript moderno. Estos comentarios ocultaban el código JavaScript de los navegadores antiguos que no sabían cómo procesar la etiqueta `<script>`. Dado que los navegadores lanzados en los últimos 15 años no tienen este problema, este tipo de comentario puede ayudarte a identificar códigos realmente antiguos.
=======
    This trick isn't used in modern JavaScript. These comments hide JavaScript code from old browsers that didn't know how to process the `<script>` tag. Since browsers released in the last 15 years don't have this issue, this kind of comment can help you identify really old code.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0


## Scripts externos

Si tenemos un montón de código JavaScript, podemos ponerlo en un archivo separado.

Los archivos de script se adjuntan a HTML con el atributo `src`:

```html
<script src="/path/to/script.js"></script>
```

<<<<<<< HEAD
Aquí, `/path/to/script.js` es una ruta absoluta al archivo de script (desde la raíz del sitio).

También puede proporcionar una ruta relativa desde la página actual. Por ejemplo, `src="script.js"` significaría un archivo `"script.js"` en la carpeta actual.
=======
Here, `/path/to/script.js` is an absolute path to the script from the site root. One can also provide a relative path from the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

También podemos dar una URL completa. Por ejemplo:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Para adjuntar varios scripts, usa varias etiquetas:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart header="Ten en cuenta:"
Como regla general, solo los scripts más simples se colocan en el HTML. Los más complejos residen en archivos separados.

La ventaja de un archivo separado es que el navegador lo descargará y lo almacenará en [caché](https://es.wikipedia.org/wiki/Cach%C3%A9_(informática)).

Otras páginas que hacen referencia al mismo script lo tomarán del caché en lugar de descargarlo, por lo que el archivo solo se descarga una vez.

Eso reduce el tráfico y hace que las páginas sean más rápidas.
```

````warn header="Si se establece `src`, el contenido del script se ignora."
Una sola etiqueta `<script>` no puede tener el atributo `src` y código dentro.

Esto no funcionará:

```html
<script *!*src*/!*="file.js">
  alert(1); // el contenido se ignora, porque src se establece
</script>
```

Debemos elegir un `<script src="…">` externo o un `<script>` normal con código.

El ejemplo anterior se puede dividir en dos scripts para que funcione:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Resumen

- Podemos usar una etiqueta `<script>` para agregar código JavaScript a una página.
- Los atributos `type` y `language` no son necesarios.
- Un script en un archivo externo se puede insertar con `<script src="path/to/script.js"> </script>`.


Hay mucho más que aprender sobre los scripts del navegador y su interacción con la página web. Pero tengamos en cuenta que esta parte del tutorial está dedicada al lenguaje JavaScript, por lo que no debemos distraernos con implementaciones específicas del navegador. Usaremos el navegador como una forma de ejecutar JavaScript, lo cual es muy conveniente para la lectura en línea, pero es solo una de muchas.

