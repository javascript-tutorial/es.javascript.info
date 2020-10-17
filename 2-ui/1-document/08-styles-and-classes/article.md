# Estilos y clases

Before we get into JavaScript's ways of dealing with styles and classes -- here's an important rule. Hopefully it's obvious enough, but we still have to mention it.

Por lo general, hay dos formas de dar estilo a un elemento:

1. Crear una clase `css` y agregarsela: `<div class="...">`
2. Escribir las propiedades directamente en `style`: `<div style="...">`.

JavaScript puede modificar ambos, clases y las propiedades de `style`.

Nosotros deberíamos preferir las clases `css` en lugar de `style`. Este último solo debe usar si las clases "no pueden manejarlo".

Por ejemplo, `style` es aceptable si nosotros calculamos las coordenadas de un elemento dinámicamente y queremos establecer estas desde JavaScript, así:

```js
let top = /* cálculos complejos */;
let left = /* cálculos complejos */;

elem.style.left = left; // ej. '123px', calculado en tiempo de ejecución
elem.style.top = top; // ej. '456px'
```

Para otros casos, como convertir un texto en rojo, adding a background icon -- describe that in CSS and then add the class (JavaScript can do that). That's more flexible and easier to support.

## className y classList

Changing a class is one of the most often used actions in scripts.

In the ancient time, there was a limitation in JavaScript: a reserved word like `"class"` could not be an object property. That limitation does not exist now, but at that time it was impossible to have a `"class"` property, like `elem.class`.

So for classes the similar-looking property `"className"` was introduced: the `elem.className` corresponds to the `"class"` attribute.

Por ejemplo:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // pagina principal
  </script>
</body>
```

If we assign something to `elem.className`, it replaces the whole string of classes. Sometimes that's what we need, but often we want to add/remove a single class.

Hay otra propiedad para eso: `elem.classList`.

The `elem.classList` is a special object with methods to `add/remove/toggle` a single class.

Por ejemplo:

```html run
<body class="main page">
  <script>
*!*
    // agregar una clase
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // clase "article" de la pagina principal
  </script>
</body>
```

So we can operate both on the full class string using `className` or on individual classes using `classList`. What we choose depends on our needs.

Métodos de `classList`:

- `elem.classList.add/remove("class")` -- adds/removes the class.
- `elem.classList.toggle("class")` -- adds the class if it doesn't exist, otherwise removes it.
- `elem.classList.contains("class")` -- checks for the given class, returns `true/false`.

Besides, `classList` is iterable, so we can list all classes with `for..of`, like this:

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
```

## `style` de un elemento

The property `elem.style` is an object that corresponds to what's written in the `"style"` attribute. Setting `elem.style.width="100px"` works the same as if we had in the attribute `style` a string `width:100px`.

For multi-word property the camelCase is used:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Por ejemplo:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="Prefixed properties"
Browser-prefixed properties like `-moz-border-radius`, `-webkit-border-radius` also follow the same rule: a dash means upper case.

Por ejemplo:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Reseteando la propiedad `style`

Sometimes we want to assign a style property, and later remove it.

Por ejemplo, para ocultar un elemento, podemos establecer `elem.style.display = "none"`.

Then later we may want to remove the `style.display` as if it were not set. Instead of `delete elem.style.display` we should assign an empty string to it: `elem.style.display = ""`.

```js run
// si podemos ejecutar este código, el <body> papadeará
document.body.style.display = "none"; // ocultar

setTimeout(() => document.body.style.display = "", 1000); // volver a lo normal
```

Si establecemos `style.display` como una cadena vacia, entonces el navegador aplica clases y estilos CSS incorporados normalmente por el navegador, como si no existiera tal `style.display`.

````smart header="Reescribir todo usando `style.cssText`"
Normalmente, podemos usar `style.*` para asignar propiedades de estilo individuales. No podemos establecer todo el estilo como `div.style="color: red; width: 100px"`, porque `div.style` es un objeto y es solo de lectura.

Para establecer todo el estilo como una cadena, hay una propiedad especial: `style.cssText`:

```html run
<div id="div">Button</div>

<script>
  // podemos establecer estilos especiales con banderas como "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Esta propiedad es rara vez usada, porque tal asignación remueve todo los estilos: no agrega, pero si las reemplaza. Lo que ocasionalmente puede eliminar algo necesario. Pero podemos usarlo de manera segura para nuevos elementos, cuando sabemos que no vamos a eliminar un estilo existente.

Lo mismo se puede lograr estableciendo un atributo: `div.setAttribute('style', 'color: red...')`.
````

## Cuidado con las unidades CSS

No olvidar agregar las unidades CSS a los valores.

Por ejemplo, nosotros no debemos establecer `elem.style.top` a `10`, sino más bien a `10px`. De lo contrario no funcionaría:

```html run height=100
<body>
  <script>
  *!*
    // ¡no funciona!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (cadena vacía, la asignación es ignorada)
  */!*

    // ahora agregamos la unidad CSS (px) y esta sí funciona
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Tenga en cuenta: el navegador "desempaqueta" la propiedad `style.margin` en las últimas lineas e infiere `style.marginLeft` y `style.marginTop` de eso.

## Estilos calculados: getComputedStyle

Entonces, modificar un estilo es fácil. Pero cómo *leerlo*?

Por ejemplo, queremos saber el tamaño, los margenes, el color de un elemento. ¿Cómo hacerlo?

**La propiedad `style` solo opera en el valor del atributo `"style"`, sin ninguna cascada de `css`.**

Entonces no podemos leer ninguna clase CSS usando `elem.style`.

Por ejemplo, aquí `style` no ve el margen:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  El texto en rojo
  <script>
*!*
    alert(document.body.style.color); // vacío
    alert(document.body.style.marginTop); // vacío
*/!*
  </script>
</body>
```

...pero si necesitamos incrementar el margen a  `20px`? vamos el querer el valor de la misma.

Hay otro método para eso: `getComputedStyle`.

La síntaxis es:

```js
getComputedStyle(element, [pseudo])
```

element
: Elemento del cual se va a leer el valor.

pseudo
: Un pseudo-elemento es requerido, por ejemplo `::before`. Una cadena vacía o sin argumento significa el elemento mismo.

El resultado es un objeto con estilos, como `elem.style`, pero ahora con respecto a todas las clases CSS.

Por ejemplo:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // ahora podemos leer los margenes y el color de ahí

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Computed and resolved values"
Hay dos conceptos en [CSS](https://drafts.csswg.org/cssom/#resolved-values):

1. Un estilo *calculado* es el valor final de aplicar todas las reglas y herencias CSS, como resultado de la cascada CSS. Puede parecer `height:1em` o `font-size:125%`.
2. Un estilo *resuelto* es la que finalmente se aplica al elemento. Valores como `1em` o `125%` son relativos. El navegador toma el valor calculado y hace que todas las unidades sean fijas y absolutas, por ejemplo: `height:20px` o `font-size:16px`. Para las propiedades de geometría los valores resueltos pueden tener un punto flotante, como `width:50.5px`.

Hace mucho tiempo `getComputedStyle` fue creado para obtener los valores calculados, pero los valores resueltos son muchos mas convenientes, y el estándar cambio.

Así que hoy en día `getComputedStyle` en realidad devuelve el valor resuelto de la propiedad, usualmente en `px` para geometría.
```

````warn header="`getComputedStyle` requires the full property name"
Siempre deberíamos preguntar por la propiedad exacta que queremos, como `paddingLeft` o `marginTop` o `borderTopWidth`. De lo contrario, no se garantiza el resultado correcto.

Por ejemplo, si hay propiedades `paddingLeft/paddingTop`, entonces que deberíamos obtener de `getComputedStyle(elem).padding`? nada, o tal vez un valor "generado" de los paddings? No hay una regla estándar aquí.

Hay otras inconsistencias. Por ejemplo, algunos navegadores (Chrome) muestran `10px` en el documento a continuación, y alguno de ellos (Firefox) no:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // cadena vacía en Firefox
</script>
```
````

```smart header="Estilos aplicados a los enlacess `:visited` estan ocultos!"
Los enlaces visitados deberían estar coloreados la pseudo-clase `:visited` de CSS.

Pero `getComputedStyle` no da acceso a ese color, porque de lo contrario una página cualquiera podría averiguar si el usuario visitó un enlace creandoló en la página y verificar los estilos.

JavaScript puede que no vea los estilos aplicados por `:visited`. Y también, 
hay una limitación en CSS que prohíbe la aplicación de estilos de cambio de geometría en `:visited`. Eso es para garantizar que no haya forma para que una página maligna pruebe si un enlance fue visitado y rompa la privacidad.
```

## Resumen

Para manejar clases, hay dos propiedades del DOM:

- `className` -- el valor de la cadena, perfecto para manejar todo el conjunto de clases.
- `classList` -- el objeto con métodos `add/remove/toggle/contains`, perfecto para clases invidivuales.

Para cambiar los estilos:

- La propiedad `style` es un objecto con los estilos en `camelcase`. 
Leer y escribir tiene el mismo significado que modificar propiedades individuales en el atributo `"style"`. Para ver como aplicar `important` y otras cosas raras, hay una lista de métodos en [MDN](mdn:api/CSSStyleDeclaration).

- La propiedad `style.cssText` corresponde a todo el atributo `"style"`, la cadena completa de estilos.

Para leer los estilos resueltos (con respecto a todas las clases, después de que se aplica todo el `css` se calculan los valores finales):

- El método `getComputedStyle(elem, [pseudo])` retorna el objeto de estilo con ellos (solo lectura).