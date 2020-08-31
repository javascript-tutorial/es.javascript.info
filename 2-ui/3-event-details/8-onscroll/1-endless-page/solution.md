El núcleo de la solución es una función que añade más fechas a la página (o carga más cosas en la vida real) mientras estamos en el final de la página.

Podemos llamarlo inmediatamente o agregarlo como un manejador de `window.onscroll`.

La pregunta más importante es: "¿Cómo detectamos que la página se desplaza hasta el fondo?"

Usaremos las coordenadas de la ventana.

El documento está representado (y contenido) dentro de la etiqueta `<html>`, que es `document.documentElement`.

<<<<<<< HEAD
Podemos obtener las coordenadas relativas a la ventana de todo el documento como  `document.documentElement.getBoundingClientRect()`, la propiedad `bottom` será la coordenada relativa a la ventana del fondo del documento.

Por ejemplo, si la altura de todo el documento es `2000px`, entonces:

```js
// cuando estamos en la parte superior de la página 
//  window-relative top = 0    (relativo a la ventana,  límite superior = 0 )
=======
We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
// window-relative top = 0
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
document.documentElement.getBoundingClientRect().top = 0

// window-relative bottom = 2000    (relativo a la ventana, límite inferior = 2000)
// el documento es largo, así que probablemente esté más allá del fondo de la ventana
document.documentElement.getBoundingClientRect().bottom = 2000
```

Si nos desplazamos `500px` abajo, entonces:

```js
// la parte superior del documento está 500px por encima de la ventana 
document.documentElement.getBoundingClientRect().top = -500
// la parte inferior del documento está 500px más cerca
document.documentElement.getBoundingClientRect().bottom = 1500
```

Cuando nos desplazamos hasta el final, asumiendo que la altura de la venta es `600px`:


```js
// La parte superior del documento está 1400px sobre la ventana
document.documentElement.getBoundingClientRect().top = -1400
// la parte inferior del documento está a 600px debajo de la ventana
document.documentElement.getBoundingClientRect().bottom = 600
```

<<<<<<< HEAD
Tened en cuenta que el fondo del documento `bottom` nunca puede ser `0`, porque nunca llega a la parte superior de la ventana. El límite más bajo de la coordenada `bottom` es la altura de la ventana (asumimos que es `600`), no podemos desplazarla más hacia arriba.

Podemos obtener la altura de la ventana con `document.documentElement.clientHeight`.

Para nuestra tarea, necesitamos saber cuando tenemos el final del documento a unos `100px` (esto es: `600-700px`, si la altura es de `600`).
=======
Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Así que aquí está la función:

```js
function populate() {
  while(true) {
    // final del documento
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

<<<<<<< HEAD
    // si el usuario se desplaza lo suficiente (<100px hasta el final)
    if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
      // vamos añadir más datos
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
    }
=======
    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
  }
}
```
