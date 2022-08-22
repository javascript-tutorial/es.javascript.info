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

<<<<<<< HEAD
1. El motor (embebido si es un navegador) lee ("analiza") el script.
2. Entonces convierte ("compila") el script a lenguaje máquina.
3. y por último el código maquina se ejecuta muy rápido.
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

El motor aplica optimizaciones en cada paso del proceso. Incluso observa como el script compilado se ejecuta, analiza los datos que fluyen a través de él y aplica optimizaciones al código maquina basadas en ese conocimiento.
```

## ¿Qué puede hacer JavaScript en el navegador?

<<<<<<< HEAD
JavaScript moderno es un lenguaje de programación "seguro". No proporciona acceso de bajo nivel a la memoria o la CPU (UCP), ya que se creó inicialmente para los navegadores los cuales no lo requieren.
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Las capacidades de JavaScript dependen en gran medida en el entorno en que se ejecuta. Por ejemplo, [Node.JS](https://es.wikipedia.org/wiki/Node.js) soporta funciones que permiten a JavaScript leer y escribir archivos arbitrariamente, realizar solicitudes de red, etc.

En el navegador JavaScript puede realizar cualquier cosa relacionada con la manipulación de una página web, interacción con el usuario y el servidor web.

Por ejemplo, en el navegador JavaScript es capaz de:

- Agregar nuevo HTML a la página, cambiar el contenido existente y modificar estilos.
- Reaccionar a las acciones del usuario, ejecutarse con los clics del ratón, movimientos del puntero y al oprimir teclas.
- Enviar solicitudes de red a servidores remotos, descargar y cargar archivos (Tecnologías llamadas [AJAX](https://es.wikipedia.org/wiki/AJAX) y [COMET](https://es.wikipedia.org/wiki/Comet)).
- Obtener y configurar cookies, hacer preguntas al visitante y mostrar mensajes.
- Recordar datos en el lado del cliente con el almacenamiento local ("local storage").

## ¿Qué NO PUEDE hacer JavaScript en el navegador?

<<<<<<< HEAD
Las capacidades de JavaScript en el navegador están limitadas por el bien de la seguridad de usuario. El objetivo es prevenir que una página maliciosa acceda a información privada o dañe los datos de usuario.
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Ejemplos de tales restricciones incluyen:

- JavaScript en el navegador no puede leer y escribir arbitrariamente archivos en el disco duro, copiarlos o ejecutar programas. No tiene acceso directo a funciones del Sistema operativo (OS).

  Los navegadores más modernos le permiten trabajar con archivos, pero el acceso es limitado y solo permitido si el usuario realiza ciertas acciones, como "arrastrar" un archivo a la ventana del navegador o seleccionarlo por medio de una etiqueta `<input`>.

<<<<<<< HEAD
    Existen maneras de interactuar con la cámara, micrófono y otros dispositivos, pero eso requiere el permiso explícito del usuario. Por lo tanto, una página habilitada para JavaScript no puede habilitar una cámara web para observar el entorno y enviar la información a la [NSA](https://es.wikipedia.org/wiki/Agencia_de_Seguridad_Nacional).
- Diferentes pestañas y ventanas generalmente no se conocen entre sí. A veces sí lo hacen, por ejemplo, cuando una ventana usa JavaScript para abrir otra. Pero incluso en este caso, JavaScript no puede acceder a la otra si provienen de diferentes sitios (de diferente dominio, protocolo o puerto).

  Esta restricción es conocida como "política del mismo origen" ("Same Origin Policy"). Es posible la comunicación, pero ambas páginas deben acordar el intercambio de datos y contener el código especial de JavaScript que permite controlarlo. Cubriremos esto en el tutorial.

    Esta limitación es, de nuevo, para la seguridad del usuario. Una página de `http://anysite.com` la cual el usuario ha abierto no debe ser capaz de acceder a otra pestaña del navegador con la URL `http://gmail.com` y robar información de esta otra página.
- JavaScript puede fácilmente comunicarse a través de la red con el servidor de donde la página actual proviene. Pero su capacidad para recibir información de otros sitios y dominios esta bloqueada. Aunque sea posible, esto requiere un acuerdo explícito (expresado en los encabezados HTTP) desde el sitio remoto. Una vez más, esto es una limitación de seguridad.

![](limitations.svg)

Tales limitaciones no existen si JavaScript es usado fuera del navegador, por ejemplo, en un servidor. Los navegadores modernos también permiten complementos y extensiones que pueden solicitar permisos extendidos.
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## ¿Qué hace a JavaScript único?

Existen al menos _tres_ cosas geniales sobre JavaScript:

```compare
+ Completa integración con HTML y CSS.
+ Las cosas simples se hacen de manera simple.
+ Soportado por la mayoría de los navegadores y habilitado de forma predeterminada.
```
JavaScript es la única tecnología de los navegadores que combina estas tres cosas.

Eso es lo que hace a JavaScript único. Por esto es la herramienta mas extendida para crear interfaces de navegador.

<<<<<<< HEAD
Dicho esto, JavaScript también permite crear servidores, aplicaciones móviles, etc.
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## Lenguajes "por arriba de" JavaScript

La sintaxis de JavaScript no se adapta a las necesidades de todos. Personas diferentes querrán diferentes características.

Esto es algo obvio, porque los proyectos y requerimientos son diferentes para cada persona.

<<<<<<< HEAD
Así que recientemente ha aparecido una gran cantidad de nuevos lenguajes, los cuales son _Convertidos_/_Transpilados_ a JavaScript antes de ser ejecutados en el navegador.
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Las herramientas modernas hacen la conversión (Transpilación) muy rápida y transparente, permitiendo a los desarrolladores codificar en otros lenguajes y convertirlo automáticamente detrás de escena.

Ejemplos de tales lenguajes:

<<<<<<< HEAD
- [CoffeeScript](https://coffeescript.org/) Es una "sintaxis azucarada" para JavaScript. Introduce una sintaxis corta, permitiéndonos escribir un código mas claro y preciso. Usualmente desarrolladores de Ruby prefieren este lenguaje.
- [TypeScript](https://www.typescriptlang.org/) se concentra en agregar "tipado estricto" ("strict data typing") para simplificar el desarrollo y soporte de sistemas complejos. Es desarrollado por Microsoft.
- [FLow](https://flow.org/) también agrega la escritura de datos, pero de una manera diferente. Desarrollado por Facebook.
- [Dart](https://www.dartlang.org/) es un lenguaje independiente, tiene su propio motor que se ejecuta en entornos que no son de navegador (como aplicaciones móviles), pero que también se puede convertir/transpilar a JavaScript. Desarrollado por Google.
- [Brython](https://brython.info/) es un transpilador de Python a JavaScript que permite escribir aplicaciones en Python puro sin JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) es un lenguaje moderno, seguro y conciso que puede apuntar al navegador o a Node.

Hay más. Por supuesto, incluso si nosotros usamos alguno de estos lenguajes, deberíamos conocer también JavaScript para realmente entender qué estamos haciendo.
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## Resumen

- JavaScript fue inicialmente creado como un lenguaje solamente para el navegador, pero ahora es usado también en muchos otros entornos.
- Hoy en día, JavaScript tiene una posición única como el lenguaje más extendido y adoptado de navegador, con una integración completa con HTML y CSS.
- Existen muchos lenguajes que se convierten o transpilan a JavaScript y aportan ciertas características. Es recomendable echarles un vistazo, al menos brevemente, después de dominar JavaScript.
