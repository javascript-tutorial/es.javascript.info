# Una introducción a JavaScript

Veamos qué tiene de especial JavaScript, qué podemos lograr con este lenguaje y qué otras tecnologías se integran bien con él.

## ¿Qué es JavaScript?

_JavaScript_ fue creado para _"dar vida a las páginas web"_.

Los programas en este lenguaje se llaman _scripts_. Se pueden escribir directamente en el HTML de una página web y ejecutarse automáticamente a medida que se carga la página.

Los scripts se proporcionan y ejecutan como texto plano. No necesitan preparación especial o compilación para correr.

En este aspecto, JavaScript es muy diferente a otro lenguaje llamado [Java](<https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)>).

```smart header="¿Por qué se llama <u>Java</u>Script?"
Cuando JavaScript fue creado, inicialmente tenía otro nombre: "LiveScript". Pero Java era muy popular en ese momento, así que se decidió que el posicionamiento de un nuevo lenguaje como un "Hermano menor" de Java ayudaría.

Pero a medida que evolucionaba, JavaScript se convirtió en un lenguaje completamente independiente con su propia especificación llamada [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript), y ahora no tiene ninguna relación con Java.
```

Hoy, JavaScript puede ejecutarse no solo en los navegadores, sino también en servidores o incluso en cualquier dispositivo que cuente con un programa especial llamado [El motor o intérprete de JavaScript](https://es.wikipedia.org/wiki/Int%C3%A9rprete_de_JavaScript).

El navegador tiene un motor embebido a veces llamado una "Máquina virtual de JavaScript".

Diferentes motores tienen diferentes "nombres en clave". Por ejemplo:

- [V8](https://es.wikipedia.org/wiki/Chrome_V8) -- en Chrome, Opera y Edge.
- [SpiderMonkey](https://es.wikipedia.org/wiki/SpiderMonkey) -- en Firefox.
- ...Existen otros nombres en clave como "Chakra" para IE , "JavaScriptCore", "Nitro" y "SquirrelFish" para Safari, etc.

Es bueno recordar estos términos porque son usados en artículos para desarrolladores en internet. También los usaremos. Por ejemplo, si "la característica X es soportada por V8", entonces probablemente funciona en Chrome, Opera y Edge.

```smart header="¿Como trabajan los motores?"

Los motores son complicados, pero los fundamentos son fáciles.

1. El motor (embebido si es un navegador) lee ("analiza") el script.
2. Entonces convierte ("compila") el script a lenguaje máquina.
3. y por último el código maquina se ejecuta muy rápido.

El motor aplica optimizaciones en cada paso del proceso. Incluso observa como el script compilado se ejecuta, analiza los datos que fluyen a través de él y aplica optimizaciones al código maquina basadas en ese conocimiento.
```

## ¿Qué puede hacer JavaScript en el navegador?

JavaScript moderno es un lenguaje de programación "seguro". No proporciona acceso de bajo nivel a la memoria o la CPU (UCP), ya que se creó inicialmente para los navegadores los cuales no lo requieren.

Las capacidades de JavaScript dependen en gran medida en el entorno en que se ejecuta. Por ejemplo, [Node.JS](https://es.wikipedia.org/wiki/Node.js) Soporta funciones que permiten a JavaScript leer y escribir archivos arbitrariamente, realizar solicitudes de red, etc.

En el navegador JavaScript puede realizar cualquier cosa relacionada con la manipulación de una página web, interacción con el usuario y el servidor web.

Por ejemplo, en el navegador JavaScript es capaz de:

- Agregar nuevo HTML a la página, cambiar el contenido existente y modificar estilos.
- Reaccionar a las acciones del usuario, ejecutarse con los clics del ratón, movimientos del puntero y al oprimir teclas.
- Enviar solicitudes de red a servidores remotos, descargar y cargar archivos (Tecnologías llamadas [AJAX](https://es.wikipedia.org/wiki/AJAX) y [COMET](https://es.wikipedia.org/wiki/Comet)).
- Obtener y configurar cookies, hacer preguntas al visitante y mostrar mensajes.
- Recordar datos en el lado del cliente con el almacenamiento local ("local storage").

## ¿Qué NO PUEDE hacer JavaScript en el navegador?

Las capacidades de JavaScript en el navegador están limitadas por el bien de la seguridad de usuario. El objetivo es prevenir que una página maliciosa acceda a información privada o dañe los datos de usuario.

Ejemplos de tales restricciones incluyen:

- JavaScript en el navegador no puede leer y escribir arbitrariamente archivos en el disco duro, copiarlos o ejecutar programas. No tiene acceso directo a funciones del Sistema operativo (OS).

  Los navegadores más modernos le permiten trabajar con archivos, pero el acceso es limitado y solo permitido si el usuario realiza ciertas acciones, como "arrastrar" un archivo a la ventana del navegador o seleccionarlo por medio de una etiqueta `<input`>.

    Existen maneras de interactuar con la cámara, micrófono y otros dispositivos, pero eso requiere el permiso explícito del usuario. Por lo tanto, una página habilitada para JavaScript no puede habilitar una cámara web para observar el entorno y enviar la información a la [NSA](https://es.wikipedia.org/wiki/Agencia_de_Seguridad_Nacional).
- Diferentes pestañas y ventanas generalmente no se conocen entre sí. A veces sí lo hacen, por ejemplo, cuando una ventana usa JavaScript para abrir otra. Pero incluso en este caso, JavaScript no puede acceder a la otra si provienen de diferentes sitios (de diferente dominio, protocolo o puerto).

  Esta restricción es conocida como "política del mismo origen" ("Same Origin Policy"). Es posible la comunicación, pero ambas páginas deben acordar el intercambio de datos y contener el código especial de JavaScript que permite controlarlo. Cubriremos esto en el tutorial.

    Esta limitación es, de nuevo, para la seguridad del usuario. Una página de `http://anysite.com` la cual el usuario ha abierto no debe ser capaz de acceder a otra pestaña del navegador con la URL `http://gmail.com` y robar información de esta otra página.
- JavaScript puede fácilmente comunicarse a través de la red con el servidor de donde la página actual proviene. Pero su capacidad para recibir información de otros sitios y dominios esta bloqueada. Aunque sea posible, esto requiere un acuerdo explícito (expresado en los encabezados HTTP) desde el sitio remoto. Una vez más, esto es una limitación de seguridad.

![](limitations.svg)

Tales limitaciones no existen si JavaScript es usado fuera del navegador, por ejemplo, en un servidor. Los navegadores modernos también permiten complementos y extensiones que pueden solicitar permisos extendidos.

## ¿Qué hace a JavaScript único?

Existen al menos _tres_ cosas geniales sobre JavaScript:

```compare
+ Completa integración con HTML y CSS.
+ Las cosas simples se hacen de manera simple.
+ Soportado por la mayoría de los navegadores y habilitado de forma predeterminada.
```
JavaScript es la única tecnología de los navegadores que combina estas tres cosas.

Eso es lo que hace a JavaScript único. Por esto es la herramienta mas extendida para crear interfaces de navegador.

Dicho esto, JavaScript también permite crear servidores, aplicaciones móviles, etc.

## Lenguajes "por arriba de" JavaScript

La sintaxis de JavaScript no se adapta a las necesidades de todos. Personas diferentes querrán diferentes características.

Esto es algo obvio, porque los proyectos y requerimientos son diferentes para cada persona.

Así que recientemente ha aparecido una gran cantidad de nuevos lenguajes, los cuales son _Convertidos_/_Transpilados_ a JavaScript antes de ser ejecutados en el navegador.

Las herramientas modernas hacen la conversión (Transpilación) muy rápida y transparente, permitiendo a los desarrolladores codificar en otros lenguajes y convertirlo automáticamente detrás de escena.

Ejemplos de tales lenguajes:

- [CoffeeScript](http://coffeescript.org/) Es una "sintaxis azucarada" para JavaScript. Introduce una sintaxis corta, permitiéndonos escribir un código mas claro y preciso. Usualmente desarrolladores de Ruby prefieren este lenguaje.
- [TypeScript](http://www.typescriptlang.org/) se concentra en agregar "tipado estricto" ("strict data typing") para simplificar el desarrollo y soporte de sistemas complejos. Es desarrollado por Microsoft.
- [FLow](https://flow.org/) también agrega la escritura de datos, pero de una manera diferente. Desarrollado por Facebook.
- [Dart](https://www.dartlang.org/) es un lenguaje independiente que tiene su propio motor que se ejecuta en entornos que no son de navegador (como aplicaciones móviles), pero que también se puede convertir/transpilar a JavaScript. Desarrollado por Google.
- [Brython](https://brython.info/) es un transpilador de Python a JavaScript que permite escribir aplicaciones en Python puro sin JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) es un lenguaje moderno, seguro y conciso que puede apuntar al navegador o a Node.

Hay más. Por supuesto, incluso si nosotros usamos alguno de estos lenguajes, deberíamos conocer también JavaScript para realmente entender qué estamos haciendo.

## Resumen

- JavaScript fue inicialmente creado como un lenguaje solo para el navegador, pero ahora es usado también en muchos otros entornos.
- Hoy en día, JavaScript tiene una posición única como el lenguaje más extendido y adoptado de navegador, con una integración completa con HTML y CSS.
- Existen muchos lenguajes que se convierten o transpilan a JavaScript y aportan ciertas características. Es recomendable echarles un vistazo, al menos brevemente, después de dominar JavaScript.
