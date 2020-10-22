El núcleo de la solución es una función que añade más fechas a la página (o carga más cosas en la vida real) mientras estamos en el final de la página.

Podemos llamarlo inmediatamente o agregarlo como un manejador de `window.onscroll`.

La pregunta más importante es: "¿Cómo detectamos que la página se desplaza hasta el fondo?"

Usaremos las coordenadas de la ventana.

El documento está representado (y contenido) dentro de la etiqueta `<html>`, que es `document.documentElement`.

Podemos obtener las coordenadas relativas a la ventana de todo el documento como  `document.documentElement.getBoundingClientRect()`, la propiedad `bottom` será la coordenada relativa a la ventana del fondo del documento.

Por ejemplo, si la altura de todo el documento es `2000px`, entonces:

```js
// cuando estamos en la parte superior de la página 
//  window-relative top = 0    (relativo a la ventana,  límite superior = 0 )
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

Tened en cuenta que el fondo del documento `bottom` nunca puede ser `0`, porque nunca llega a la parte superior de la ventana. El límite más bajo de la coordenada `bottom` es la altura de la ventana (asumimos que es `600`), no podemos desplazarla más hacia arriba.

Podemos obtener la altura de la ventana con `document.documentElement.clientHeight`.

Para nuestra tarea, necesitamos saber cuando tenemos el final del documento a unos `100px` (esto es: `600-700px`, si la altura es de `600`).

Así que aquí está la función:

```js
function populate() {
  while(true)
  {
    // final del documento
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // si el usuario no se ha desplazado lo suficiente (> 100px hasta el final)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
      // vamos añadir más datos
      document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
