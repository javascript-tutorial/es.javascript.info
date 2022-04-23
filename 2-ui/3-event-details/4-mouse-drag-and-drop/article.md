# Arrastrar y Soltar con eventos del ratón

Arrastrar y Soltar es una excelente solución de interfaz. Tomar algo, arrastrar y soltarlo es una forma clara y simple de hacer muchas cosas, desde copiar y mover documentos (como en los manejadores de archivos) hasta ordenar (arrastrando ítems al carrito).

En el estándar moderno de HTML hay una [sección sobre Arrastrar y Soltar](https://html.spec.whatwg.org/multipage/interaction.html#dnd) con eventos especiales tales como `dragstart`, `dragend`, y así por el estilo.

Estos eventos nos permiten soportar tipos especiales de Arrastrar y Soltar, como manejar el arrastrado de archivos desde el manejador de archivos del Sistema Operativo y soltarlo en la ventana del navegador. Así JavaScript puede acceder al contenido de dichos archivos.

Pero los eventos nativos de arrastrar tienen limitaciones. Por ejemplo, no nos deja evitar el arrastre desde cierta área. Tampoco podemos hacer que el arrastre sea solamente "horizontal" o "vertical". Y hay muchas otras tareas de "Arrastrar y Soltar" que no pueden hacerse utilizándolos. Además, el soporte para dichos eventos es muy pobre en dispositivos móviles.

Así que aquí veremos cómo implementar "Arrastrar y Soltar" usando eventos del ratón.

## Algoritmo de "Arrastrar y Soltar"

El algoritmo básico de Arrastrar y Soltar se ve así:

1. En `mousedown` - preparar el elemento para moverlo, si es necesario (quizá creando un clon de este, añadiéndole una clase, o lo que sea).
2. En `mousemove` - moverlo cambiando `left/top` con `position:absolute`.
3. En `mouseup` - realizar todas las acciones relacionadas con finalizar el Arrastrar y Soltar.

Esto es lo básico. Luego veremos como añadir características, como resaltar los elementos subyacentes mientras arrastramos sobre ellos.

Aquí esta la implementación de arrastrar una pelota:

```js
ball.onmousedown = function(event) { 
  // (1) preparar para mover: hacerlo absoluto y ponerlo sobre todo con el z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // quitar cualquier padre actual y moverlo directamente a body
  // para posicionarlo relativo al body
  document.body.append(ball);  

  // centrar la pelota en las coordenadas (pageX, pageY)
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // mover nuestra pelota posicionada absolutamente bajo el puntero
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) mover la pelota con mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) soltar la pelota, quitar cualquier manejador de eventos innecesario
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

Si ejecutamos el código, nos enteramos de algo extraño. Al inicio de arrastrar y soltar, la pelota se duplica: empezamos a arrastrar su "clon".

```online
Aquí hay un ejemplo en acción:

[iframe src="ball" height=230]

Trata de arrastrar con el ratón y verás dicho comportamiento.
```

Esto es porque el navegador tiene su propio soporte para arrastrar y soltar para imágenes y otros elementos. Se ejecuta automáticamente y entra en conflicto con el nuestro.

Para deshabilitarlo:

```js
ball.ondragstart = function() {
  return false;
};
```

Ahora todo estará bien.

```online
En acción:

[iframe src="ball2" height=230]
```

Otro aspecto importante: seguimos `mousemove` en `document`, no en `ball`. Desde el primer momento debe verse que el ratón está siempre sobre la pelota, y podemos poner `mousemove` en ella.

Pero como recordamos, `mousemove` se dispara a menudo, pero no por cada pixel. Así que después de un movimiento rápido el puntero puede saltar de la pelota a algún lugar en el medio del documento (o incluso fuera de la ventana).

Así que tenemos que escuchar en `document` para captarlo.

## Posicionamiento correcto

En los ejemplos de arriba la pelota siempre se mueve, de manera que su centro queda debajo del puntero:

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

Nada mal, pero hay un efecto secundario. Para iniciar el arrastrar y soltar, podemos hacer `mousedown` en cualquier lugar de la pelota. Pero si la "tomamos" por el borde, entonces la pelota "salta" de repente para centrarse bajo el puntero del ratón.

Sería mejor si mantenemos la posición inicial del elemento, relativo al puntero.

Por ejemplo, si empezamos a arrastrar por el borde de la pelota, entonce el puntero debería quedarse sobre el borde mientras se arrastra.

![](ball_shift.svg)

Vamos a actualizar nuestro algoritmo:

1. Cuando un visitante presiona el botón (`mousedown`) - recordar la distancia del puntero a la esquina superior izquierda de la pelota in variables `shiftX/shiftY`. Mantendremos esa distancia mientras arrastramos.

    Para obtener esas posiciones podemos restar las coordenadas:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

2. Entonces mientras arrastra posicionamos la pelota en la misma posición relativa al puntero, de esta forma:

    ```js
    // onmousemove
    // la pelota tiene position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

El código final con mejor posicionamiento:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // mueve la pelota a las coordenadas (pageX, pageY)
  // tomando la posición inicial en cuenta
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // mueve la pelota con mousemove
  document.addEventListener('mousemove', onMouseMove);

  // suelta la pelota, elimina el manejador innecesario
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
En acción (dentro de un `<iframe>`):

[iframe src="ball3" height=230]
```

La diferencia es notable especialmente si arrastramos la pelota por su esquina inferior derecha. En el ejemplo anterior la pelota "salta" bajo el puntero. Ahora sigue el puntero fluidamente desde su posición actual.

## Objetivos receptores potenciales (droppables)

En los ejemplos anteriores la pelota debe ser soltada simplemente "en cualquier lugar" para quedarse. En la vida real normalmente tomamos un elemento para soltarlo en otro. Por ejemplo, un "archivo" en una "carpeta" o algo más.

Hablando abstracto, tomamos un elemento "arrastrable" y lo soltamos sobre un elemento "receptor".

Necesitamos saber:
- dónde el elemento fue soltado al final del Arrastrar y Soltar -- para hacer la acción correspondiente,
- y, preferiblemente, saber el receptor sobre el que estamos arrastrando, para resaltarlo.

La solución es algo interesante y un poco complicado, así que vamos a cubrirlo aquí.

¿Cuál puede ser la primera idea? ¿Probablemente configurar `mouseover/mouseup` en receptores potenciales?

Pero eso no funciona.

El problema es que, mientras estamos arrastrando, el elemento arrastrable siempre está encima de los demás elementos. Y los eventos del ratón solo suceden en el elemento superior, no en los que están debajo.

Por ejemplo, debajo hay dos elementos `<div>`, el rojo sobre el azul (totalmente cubierto). No hay forma de captar un evento en el azul, porque el rojo está encima:

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('nunca funciona')"></div>
<div style="background:red" onmouseover="alert('sobre el rojo!')"></div>
```

Lo mismo con un elemento arrastrable. La pelota está siempre sobre los demás elementos, así que los eventos pasan en él. Cualquier manejador que pongamos en los elementos de abajo, no funcionará.

Por eso la idea inicial de poner manejadores en receptores potenciales no funciona en práctica. No se activarán.

Entonces, ¿Qué hacer?

Existe un método llamado `document.elementFromPoint(clientX, clientY)`. Este devuelve el elemento más anidado en las coordenadas relativas a la ventana proporcionada (o `null` si las coordenadas están fuera de la ventana). Si hay muchos elementos superpuestos en las mismas coordenadas, se devuelve el que está en el tope.

Podemos utilizarlo en cualquiera de nuestros manejadores para detectar los receptores potenciales bajo el puntero, de esta forma:

```js
// en un manejador de evento del ratón
ball.hidden = true; // (*) ocultar el elemento que arrastramos

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow es el elemento debajo de la pelota, puede ser receptor

ball.hidden = false;
```

Favor notar: necesitamos ocultar la pelota antes de llamar `(*)`. De otra forma usualmente tendremos una pelota con esas coordenadas, ya que es el elemento superior bajo el puntero: `elemBelow=ball`. Así que lo ocultamos e inmediatamente lo mostramos de nuevo.

Podemos usar este código para verificar el elemento sobre el que estamos "flotando" en todo momento. Y manejar la caída cuando sucede.

Un código extendido de `onMouseMove` para hallar elementos "receptores":

```js
// elemento potencialmente arrastrable sobre el que flotamos ahora mismo
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // los eventos mousemove se pueden activar fuera de la ventana (cuando la pelota se arrastra fuera de la ventana)
  // si clientX/clientY están fuera de la ventana, entonces elementFromPoint devuelve null
  if (!elemBelow) return;

  // receptores potenciales se etiquetan con la clase "droppable" (puede tener otra lógica)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // estamos flotando dentro o afuera
    // nota: ambos valores pueden ser null
    //   currentDroppable=null si no estábamos sobre un receptor antes de este evento (ej. sobre un espacio en blanco)
    //   droppableBelow=null si no estamos sobre un receptor ahora, durante este evento

    if (currentDroppable) {
      // la lógica para procesar "flying out" del receptor (elimina el resaltado)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // la lógica para procesar "flying in" del receptor
      enterDroppable(currentDroppable);
    }
  }
}
```

En el siguiente ejemplo cuando la pelota se arrastra sobre la portería, esta se resalta.

[codetabs height=250 src="ball4"]

Ahora tenemos el "destino" actual, sobre el que estamos flotando, en la variable `currentDroppable` durante el proceso completo y podemos usarlo para resaltar o cualquier otra cosa.

## Resumen

Consideramos un algoritmo básico de Arrastrar y Soltar.

Los componentes clave:

1. Flujo de eventos: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (no olvides cancelar el `ondragstart` nativo).
2. El inicio del arrastrado -- recuerda la posición inicial del puntero relativo al elemento: `shiftX/shiftY` y lo mantiene durante el arrastrado.
3. Detectar elementos arrastrables bajo el puntero usando `document.elementFromPoint`.

Podemos poner mucho sobre esta base.

- Con `mouseup` podemos intelectualmente finalizar el arrastre: cambiar datos, mover elementos alrededor.
- Podemos resaltar los elementos sobre los que estamos volando.
- Podemos limitar el arrastrado a cierta área o dirección.
- Podemos usar delegación de eventos para `mousedown/up`. Un manejador de eventos para un área grande que compruebe `event.target` puede manejar Arrastrar y Soltar para cientos de elementos.
- Y así por el estilo.

Hay frameworks que construyen una arquitectura sobre esto: `DragZone`, `Droppable`, `Draggable` y otras clases. La mayoría de ellos hacen cosas similares a lo que hemos descrito, así que debería ser fácil entenderlos ahora. O crea el tuyo propio: como puedes ver es fácil de hacer, a veces es más fácil que adaptarse a una solución de terceros.
