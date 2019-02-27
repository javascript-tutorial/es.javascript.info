# Hello, world!

El tutorial que estás leyendo trata sobre el nucleo de JavaScript, que es independiente de la plataforma. Más adelante, aprenderás sobre Node.JS y otras plataformas que lo utilizan.

Necesitamos un entorno de trabajo para ejecutar nuestros scripts y, dado que este libro está en línea, el navegador es una buena opción. Mantendremos la cantidad de comandos específicos del navegador (como `alert`) a un mínimo para que no dedique tiempo a ellos si planea concentrarse en otro entorno (como Node.JS). Nos centraremos en JavaScript en el navegador en la [siguiente parte](/ui) del tutorial.

A continuacion, veremos cómo adjuntar un script a una página web. Para entornos del lado del servidor (como Node.JS), puede ejecutar el script con el comando `"node my.js"`.

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
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...Después del script.</p>

</body>

</html>
```

```online
Puede ejecutar el ejemplo haciendo clic en el botón "Play" en la esquina superior derecha del cuadro de arriba.
```

Puede ejecutar el ejemplo haciendo clic en el botón "Play" en la esquina superior derecha del cuadro de arriba.

La etiqueta `<script>` contiene código JavaScript que se ejecuta automáticamente cuando el navegador procesa la etiqueta.

## Marcado moderno

La etiqueta `<script>` tiene algunos atributos que rara vez se usan en la actualidad, pero aún se pueden encontrar en código antiguo:

El atributo `type`: <code>&lt;script <u>type</u>=...&gt;</code>
: El antiguo estándar HTML, HTML4, requería que un script tuviera un atributo `type`. Por lo general, era `type="text/javascript"`. En la actualidad ya no es obligatorio. Además, el estándar HTML moderno, HTML5, cambió totalmente el significado de este atributo. Ahora, se puede utilizar para módulos de JavaScript. Pero ese es un tema avanzado; hablaremos sobre módulos en otra parte del tutorial.

El atributo `language`: <code>&lt;script <u>language</u>=...&gt;</code>
: Este atributo estaba destinado a especificar el lenguaje del script. Este atributo ya no tiene sentido porque JavaScript es el lenguaje predeterminado. No hay necesidad de usarlo.

Comentarios antes y después de los scripts.
: En libros y guías realmente antiguos, puede encontrar comentarios dentro de las etiquetas `<script>`, como lo siguiente:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    Este truco ya no se utiliza en JavaScript moderno. Estos comentarios ocultaron el código JavaScript de los navegadores antiguos que no sabían cómo procesar la etiqueta `<script>`. Dado que los navegadores lanzados en los últimos 15 años no tienen este problema, este tipo de comentario puede ayudarlo a identificar códigos realmente antiguos.


## Scripts externos

Si tenemos mucho código JavaScript, podemos ponerlo en un archivo separado.

Los archivos de script se adjuntan a HTML con el atributo `src`:

```html
<script src="/path/to/script.js"></script>
```
Aquí, `/path/to/script.js` es una ruta absoluta al archivo de script (desde la raíz del sitio).

También puede proporcionar una ruta relativa desde la página actual. Por ejemplo, `src="script.js"` significaría un archivo `"script.js"` en la carpeta actual.

También podemos dar una URL completa. Por ejemplo:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

Para adjuntar varios scripts, use varias etiquetas:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart header="Nota:"
Como regla general, solo los scripts más simples se colocan en el HTML. Los más complejos residen en archivos separados.

La ventaja de un archivo separado es que el navegador lo descargará y lo almacenará en [caché](https://es.wikipedia.org/wiki/Caché_(informática)).

Otras páginas que hacen referencia al mismo script lo tomarán del caché en lugar de descargarlo, por lo que el archivo se descarga solo una vez.

Eso reduce el tráfico y hace que las páginas sean más rápidas.
```

````warn header="Si se incluye el atributo `src`, el contenido del script será ignorado."
Una sola etiqueta `<script>` no puede tener al mismo tiempo el atributo `src` y código.

Esto no funcionará:

```html
<script *!*src*/!*="file.js">
  alert(1); // el contenido se ignora, porque se incluye el atributo src
</script>
```

Debemos elegir entre un `<script src = "...">` externo o un `<script>` regular con código.

El ejemplo anterior se puede dividir en dos scripts:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Resumen

- Podemos usar una etiqueta `<script>` para agregar código JavaScript a una página.
- Los atributos `type` y `language` no son obligatorios.
- Un script en un archivo externo se puede insertar con `<script src="path/to/script.js"></script>`.

Hay mucho más que aprender sobre los scripts del navegador y su interacción con la página web. Pero tengamos en cuenta que esta parte del tutorial está dedicada al lenguaje JavaScript, por lo que no debemos distraernos con implementaciones específicas del navegador. Usaremos el navegador como una forma de ejecutar JavaScript, ya que es conveniente en una lectura en línea, pero ten en cuenta que solo es una de muchas formas.
