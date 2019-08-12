# Una introducción a JavaScript

Veamos que tiene de especial JavaScript, que podemos lograr con este lenguaje y que otras tecnologías se integran bien con él.

## ¿Qué es JavaScript?

_JavaScript_ Fue creado para _"dar vida a la páginas web"_.

<<<<<<< HEAD
Los programas en este lenguaje son llamados _scripts_. Se pueden escribir directamente en el HTML de una página web y ejecutarse automáticamente a medida que se carga la página.
=======
The programs in this language are called *scripts*. They can be written right in a web page's HTML and run automatically as the page loads.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

Los scripts se proporcionan y ejecutan como texto plano. No necesitan preparación especial o compilación para correr.

En este aspecto, JavaScript es muy diferente de otro lenguaje llamado [Java](<https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)>).

```smart header="¿Por qué <u>Java</u>Script?"
Cuando JavaScript fue creado, inicialmente tenía otro nombre: "LiveScript". Pero Java era muy popular en ese momento, así que se decidió que el posicionamiento de un nuevo lenguaje como un "Hermano menor" de Java ayudaría.

Pero a medida que evolucionaba, JavaScript se convirtió en un lenguaje completamente independiente con su propia especificación llamada [ECMAScript] (https://es.wikipedia.org/wiki/ECMAScript), y ahora no tiene para nada relación con Java.
```

Hoy, JavaScript puede ejecutarse no solo en los navegadores, sino también en servidores o incluso en cualquier dispositivo que cuente con un programa especial llamado [El motor o intérprete de JavaScript](https://es.wikipedia.org/wiki/Int%C3%A9rprete_de_JavaScript).

El navegador tiene un motor embebido a veces llamado una "Máquina virtual de JavaScript".

Diferentes motores tienen diferentes "nombres en clave". Por ejemplo:

- [V8](https://es.wikipedia.org/wiki/Chrome_V8) -- en Chrome y Opera.
- [SpiderMonkey](https://es.wikipedia.org/wiki/SpiderMonkey) -- en Firefox.
- ...Existen otros nombres en clave como "Trident" and "Chakra" para diferentes versiones de IE (Internet Explorer), "ChakraCore" para Microsoft Edge, "Nitro" y "SquirrelFish" para Safari, etc.

Los términos anteriores es bueno recordarlos porque son usados en artículos para desarrolladores en internet. También los usaremos. Por ejemplo, si "la característica X es soportada por V8", entonces probablemente funciona en Chrome y Opera.

```smart header="¿Como trabajan los motores?"

Los motores son complicados, pero los fundamentos son fáciles.

1.- El motor (embebido si es un navegador) lee ("analiza") el script.
2.- Entonces convierte ("compila") el script a lenguaje máquina.
3.- y por último el código maquina se ejecuta muy rápido.

El motor aplica optimizaciones en cada paso del proceso. Incluso observa como el script compilado se ejecuta, analiza los datos que fluyen a través de él y aplica optimizaciones al código maquina basadas en ese conocimiento. Cuando está terminado, los scripts se ejecutan bastante rápido.
```

## ¿Qué puede hacer JavaScript en el navegador?

JavaScript moderno es un lenguaje de programación "seguro". No proporciona acceso de bajo nivel a la memoria o la CPU (UCP), ya que se creó inicialmente para los navegadores los cuales no lo requieren.

<<<<<<< HEAD
Las capacidades de JavaScript dependen en gran medida en el entorno en que se ejecuta. Por ejemplo, [Node.JS (https://es.wikipedia.org/wiki/Node.js) Soporta funciones que permiten a JavaScript leer y escribir archivos arbitrariamente, realizar solicitudes de red, etc.
=======
JavaScript's capabilities greatly depend on the environment it's running in. For instance, [Node.js](https://wikipedia.org/wiki/Node.js) supports functions that allow JavaScript to read/write arbitrary files, perform network requests, etc.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

En el navegador JavaScript puede realizar cualquier cosa relacionada con la manipulación de una página web, interacción con el usuario y el servidor web.

Por ejemplo, en el navegador JavaScript es capaz de:

- Agregar nuevo HTML a la página, cambiar el contenido existente y modificar estilos.
- Reaccionar a las acciones del usuario, ejecutarse con los clics del ratón, movimientos del puntero y al oprimir teclas.
- Enviar solicitudes de red a servidores remotos, descargar y cargar archivos (Tecnologías llamadas [AJAX](https://es.wikipedia.org/wiki/AJAX) y [COMET](https://es.wikipedia.org/wiki/Comet)).
- Obtener y configurar cookies, hacer preguntar al visitante y mostrar mensajes.
- Recordar datos en el lado del cliente con el almacenamiento local ("local storage").

## ¿Qué no puede hacer JavaScript en el navegador?

Las habilidades de JavaScript en el navegador están limitadas por el bien de la seguridad de usuario. El objetivo es prevenir el acceso de información privada o dañar los datos de usuario por parte de una página maliciosa.

Ejemplos de tales restricciones incluyen:

- JavaScript en el navegador no puede leer y escribir arbitrariamente archivos en el disco duro, copiarlos o ejecutar programas. No tiene acceso directo a funciones del Sistema operativo (OS).

  Los navegadores mas modernos le permiten trabajar con archivos, pero el acceso es limitado y solo permitido si el usuario realiza ciertas acciones, como "arrastrar" un archivo a la ventana del navegador o seleccionarlo por medio de una etiqueta `<input`>.

  Existen maneras de interactuar con la cámara, micrófono y otros dispositivos, pero eso requiere el permiso explicito del usuario. Por lo tanto, una página habilitada para JavaScript no puede habilitar una cámara web para observar el entorno y enviar la información a la [NSA](https://es.wikipedia.org/wiki/Agencia_de_Seguridad_Nacional).

<<<<<<< HEAD
- Diferentes pestañas y ventanas generalmente no se conocen entre sí. A veces si lo hacen, por ejemplo, cuando una ventana usa JavaScript para abrir otra. Pero incluso en este caso, JavaScript no puede acceder a la otra si provienen de diferentes sitios. (De diferente dominio, protocolo o puerto).
=======
    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and contain a special JavaScript code that handles it. We'll cover that in the tutorial.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

  Esto es conocido como "política del mismo origen" ("Same Origin Policy"). Para evitar eso, ambas páginas deben contener código especial de JavaScript que permita manejar el intercambio de datos.

<<<<<<< HEAD
  Esta limitación es, de nuevo, para la seguridad del usuario. Una página de `http://anysite.com` la cual el usuario ha abierto no debe ser capaz de acceder a otra pestaña del navegador con la URL `http://gmail.com` y robar información de esta otra página.
=======
![](limitations.svg)
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

- JavaScript puede fácilmente comunicarse a través de la red con el servidor de donde esta página proviene. Pero su capacidad para recibir información de otros sitios y dominios esta bloqueada. Aunque sea posible, esto requiere un acuerdo explícito (expresado en los encabezados HTTP) desde el sitio remoto. Una vez más, esto es una limitación de seguridad.

![](limitations.svg)

Tales limitaciones no existen si JavaScript es usado fuera del navegador, por ejemplo, en un servidor. Los navegadores modernos también permiten complementos y extensiones que pueden preguntar por permisos extendidos.

## ¿Qué hace a JavaScript único?

Existen al menos _tres_ geniales cosas acerca de JavaScript:

```compare
+ Completa integración con HTML y CSS..
+ Las cosas simples se hacen simplemente.
+ Soportado por la mayoría de los navegadores y habilitado por defecto.
```
<<<<<<< HEAD
=======
JavaScript is the only browser technology that combines these three things.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

JavaScript es la única tecnología de los navegadores que combina estas tres cosas.

<<<<<<< HEAD
Eso es lo que hace a JavaScript único. Eso es el porqué es la herramienta mas extendida para crear interfaces de navegador.

Al planificar aprender una nueva tecnología, es beneficioso revisar sus perspectivas. Así que vamos a movernos a las tendencias modernas que lo afectan, incluyendo nuevos lenguajes y capacidades del navegador.
=======
That said, JavaScript also allows to create servers, mobile applications, etc.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Lenguajes "por arriba de" JavaScript

La sintaxis de JavaScript no se ajusta para las necesidades de todos. Personas diferentes quieren diferentes características.

Eso es de esperarse, porque los proyectos y requerimientos son diferentes para cada persona.

Así que recientemente a aparecido una abundancia de nuevos lenguajes, los cuales son _Convertidos_ / _Transpilados_ (transpiled) a JavaScript antes de ser ejecutados en el navegador.

Las herramientas modernas hacen la conversión (Transpilation) muy rápido y transparente, permitiendo a los desarrolladores codificar en otros lenguajes y convertirlo automáticamente detrás de escena.

Ejemplos de tales lenguajes:

<<<<<<< HEAD
- [CoffeeScript](http://coffeescript.org/) Es una "sintaxis azucarada" [syntactic sugar](https://es.wikipedia.org/wiki/Az%C3%BAcar_sint%C3%A1ctico) para JavaScript. Introduce una sintaxis corta, permitiéndonos escribir un código mas claro y preciso. Usualmente desarrolladores de Ruby prefieren este lenguaje.
- [TypeScript](http://www.typescriptlang.org/) se concentra en agregar "tipado estricto" ("strict data typing") para simplificar el desarrollo y soporte de sistemas complejos. Es desarrollado por Microsoft.
- [Dart](https://www.dartlang.org/) es un lenguaje independiente que tiene su propio motor que corre en entornos que no son los navegadores (como aplicaciones móviles). Fue inicialmente ofrecido por Google como un remplazo para JavaScript, pero a partir de ahora, los navegadores requieren que este sea convertido (transpiled) a JavaScript igual que los anteriores.

Hay mas. Por supuesto, incluso si nosotros usamos alguno de estos lenguajes, deberíamos conocer también JavaScript para realmente entender que está pasando.
=======
- [CoffeeScript](http://coffeescript.org/) is a "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](http://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](http://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.

There are more. Of course, even if we use one of transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

## Resumen

- JavaScript fue inicialmente creado como un lenguaje solo para el navegador, pero ahora es usado también en muchos otros entornos.
- Hoy en día, JavaScript tiene una posición única como el lenguaje más extendido y adoptado de navegador, con una integración completa con HTML y CSS.
- Existen muchos lenguajes que se convierten "transpiled" a JavaScript y aportan ciertas características. Es recomendable echarles un vistazo, al menos brevemente, después de dominar JavaScript.
