# La consola del desarrollador

El código es propenso a errores. Es muy probable que cometerás errores... Oh, 
¿de qué estoy hablando? Es *absolutamente* seguro que cometerás errores, por lo menos si eres humano, en vez de un [robot](https://es.wikipedia.org/wiki/Bender_(Futurama)).

Pero en el navegador, los usuarios no ven los errores de manera predeterminada. De modo que, si algo anda mal en el guión (script), no veremos qué está averiado ni podremos repararlo.

Para ver los errores y obtener una gran cantidad de información adicional útil acerca de los scripts, las "herramientas de desarrolador" han sido incluidas en los navegadores.

La mayoría de desarrolladores prefieren Chrome o Firefox para el desarrollo porque esos navegadores poseen las mejores herramientas. Otros navegadores tambien proveen herramientas de desarrollador, a veces con cualidades especiales, pero por lo general solo estan intentando "alcanzar" a Chrome o Firefox. Así que la mayoría de desarrolladores tienen un navegador "favorito" y utilizan otros navegadores solo en caso de que un problema sea específico para alguno de dichos navegadores.

Las herramientas de desarrollador son muy potentes; tienen muchas caracteristicas. Para comenzar, aprenderemos a abrirlas, ver los errores, y ejecutar comandos de JavaScript.

## Google Chrome

Abre la página [bug.html](bug.html).

Hay un error en el código de JavaScript de esa página. Esta oculto para los visitantes regulares, así que abriremos las herramientas de desarrollador para verlo.

Presiona `key:F12` o, si usas una Mac, `key:Cmd+Opt+J`.

Las herramientas de desarrollador se abrirán de manera predeterminada en la pestaña de Consola.

Se verá algo similar a esto:

![chrome](chrome.png)

La apariencia exacta de las herramientas de desarrollador dependerá de tu versión de Chrome. Esta puede cambiar de vez en cuando, pero debe ser similar.

- Aquí podemos ver el mensaje de error en rojo. En este caso, el script contiene un comando, "lalala" que es desconocido.
- A la derecha, hay un enlace clicable al código fuente `bug.html:12` con el numero de línea donde ha ocurrido el error.

Debajo del mensaje de error, aparece este símbolo `>` en azul. Este indica una "línea de comando" donde podemos digitar comandos de JavaScript. Presiona `key:Enter` para ejecutarlos (`key:Shift+Enter` para insertar comandos a través de líneas múltiples).

Ahora podemos ver los errores, y eso es suficiente para comenzar. Más adelante volveremos a las herramientas de desarrollador, donde trataremos la depuración de códigos con mayor profundidad en el capítulo <info:debugging-chrome>.


## Firefox, Edge, y otros

La mayoría de los otros navegadores utilizan la tecla `key:F12` para abrir las herramientas de desarrollador.

La apariencia y funcionalidad de estas es bastante similar. Una vez que hayas aprendido a usar una de estas herramientas (puedes comenzar con Chrome), tu podrás cambiar a otras con facilidad.

## Safari

Safari (Un navegador para Mac, no respaldado por Windows/Linux) es algo peculiar en este caso. Necesitamos habilitar el menu "Desarrollo" primero.

Abre las Preferencias y ve al panel "Avanzado". Haz click en la opción "Mostrar el menú Desarrollo en la barra de menús":

![safari](safari.png)

Ahora `key:Cmd+Opt+C` puede activar la consola. Además,podras notar que el nuevo ítem del menu superior llamado "Desarrollo" ha aparecido. Este tiene muchos comandos y opciones.

## Entrada a traves de lineas multiples

Por lo general, cuando introducimos una línea de código en la consola, y luego presionamos `key:Enter`, esta se ejecuta.

Para insertar líneas múltiples, presiona `key:Shift+Enter`.

## Resumen

- Las herramientas de desarrollador nos permiten ver errores, ejecutar comandos, examinar variables, y mucho más.
- Estas pueden ser abiertas presionando `key:F12` para la mayoría de navegadores en Windows. En Chrome para Mac presiona `key:Cmd+Opt+J`, en Safari: `key:Cmd+Opt+C` (deberás habilitarlo primero).

Ahora tenemos el ambiente preparado. En la siguiente sección, nos ocuparemos con JavaScript.
