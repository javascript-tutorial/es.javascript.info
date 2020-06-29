# Consola de desarrollador

El código es propenso a errores. Es muy probable que cometas errores ... Oh, ¿de qué estoy hablando? *Definitivamente* vas a cometer errores, al menos si eres un humano, no un [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

Pero en el navegador, por defecto los usuarios no ven errores. Entonces, si algo sale mal en el script, no veremos lo que está roto y no podemos arreglarlo.

Para ver los errores y obtener mucha otra información útil sobre los scripts, se han incorporado "herramientas de desarrollo" en los navegadores.

La mayoría de los desarrolladores se inclinan por Chrome o Firefox para el desarrollo porque esos navegadores tienen las mejores herramientas para desarrolladores. Otros navegadores también proporcionan herramientas de desarrollo, a veces con características especiales, pero generalmente están jugando a ponerse al día con Chrome o Firefox. Por lo tanto, la mayoría de los desarrolladores tienen un navegador "favorito" y cambian a otros si un problema es específico del navegador.

Las herramientas de desarrollo son potentes; Tienen muchas características. Para comenzar, aprenderemos cómo abrirlas, observar errores y ejecutar comandos JavaScript.

## Google Chrome

Abre la página [bug.html](bug.html).

Hay un error en el código JavaScript dentro de la página. Está oculto a los ojos de un visitante regular, así que abramos las herramientas de desarrollador para verlo.

Presione la tecla `F12` o, si está en Mac, entonces la tecla`: Cmd + Opt + J`.

Las herramientas de desarrollador se abrirán en la pestaña Consola de forma predeterminada.

Se ve algo así:

![chrome](chrome.png)

El aspecto exacto de las herramientas de desarrollador depende de su versión de Chrome. Cambia de vez en cuando, pero debería ser similar.

- Aquí podemos ver el mensaje de error de color rojo. En este caso, el script contiene un comando desconocido "lalala".
- A la derecha, hay un enlace en el que se puede hacer clic en la fuente `bug.html:12` con el número de línea donde se produjo el error.

Debajo del mensaje de error, hay un símbolo azul `>`. Marca una "línea de comando" donde podemos escribir comandos JavaScript. Presione `key:Enter` para ejecutarlos (combine `key:Shift+Enter` para ingresar comandos de varias líneas).

Ahora podemos ver errores, y eso es suficiente para empezar. Volveremos a las herramientas de desarrollador más adelante y cubriremos la depuración más en profundidad en el capítulo <info:debugging-chrome>.


## Firefox, Edge, y otros

La mayoría de los otros navegadores usan `key:F12` para abrir herramientas de desarrollador.

La apariencia de ellos es bastante similar. Una vez que sepa cómo usar una de estas herramientas (puede comenzar con Chrome), puede cambiar fácilmente a otra.

## Safari

Safari (navegador Mac, no compatible con Windows/Linux) es un poco especial aquí. Necesitamos habilitar primero el "Menú de desarrollo".

Abra Preferencias y vaya al panel "Avanzado". Hay una casilla de verificación en la parte inferior:

![safari](safari.png)

Ahora la tecla: `Cmd + Opt + C` puede alternar la consola. Además, tenga en cuenta que ha aparecido el nuevo elemento del menú superior denominado "Desarrollar". Tiene muchos comandos y opciones.

## Entrada multilínea

Por lo general, cuando ponemos una línea de código en la consola y luego presionamos la tecla `Enter`, se ejecuta.

Para insertar varias líneas, presione la tecla: `Shift + Enter`.

## Resumen

- Las herramientas para desarrolladores nos permiten ver errores, ejecutar comandos, examinar variables y mucho más.
- Se pueden abrir con `tecla: F12` para la mayoría de los navegadores en Windows. Chrome para Mac necesita la tecla `Cmd + Opt + J`, Safari: tecla `Cmd + Opt + C` (primero debe habilitarse).

Ahora tenemos el entorno listo. En la siguiente sección, nos abocaremos a JavaScript.
