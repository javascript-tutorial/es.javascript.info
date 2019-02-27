# Una introducción a JavaScript

Veamos qué tiene de especial JavaScript, qué podemos lograr con él y qué otras tecnologías juegan bien con él.

## ¿Qué es JavaScript?

*JavaScript* fue creado inicialmente para *"dar vida a las paginas web"*.

Los programas en este lenguaje se llaman *scripts*. Se pueden escribir directamente en el HTML de una página web y ejecutarse automáticamente a medida que se carga la página.

Los scripts se proveen y ejecutan como texto plano. No necesitan una preparación especial o compilación para su ejecución.

En este aspecto, JavaScript es muy diferente de otro lenguaje llamado [Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programación)).

```smart header="¿Por qué <u>Java</u>Script?"
Cuando se creó JavaScript, inicialmente tenía otro nombre: "LiveScript". Pero Java era muy popular en ese momento, por lo que se decidió que posicionar un nuevo lenguaje como un "hermano menor" de Java ayudaría.

Pero a medida que evolucionaba, JavaScript se convirtió en un lenguaje totalmente independiente con su propia especificación llamada [ECMAScript](http://es.wikipedia.org/wiki/ECMAScript), y ahora no tiene ninguna relación con Java.
```

Hoy en día, JavaScript puede ejecutarse no solo en el navegador, sino también en el servidor, o en cualquier dispositivo que tenga un programa especial denominado [motor de JavaScript](https://es.wikipedia.org/wiki/Intérprete_de_JavaScript).

El navegador tiene un motor incorporado llamado "máquina virtual de JavaScript".

Diferentes motores tienen diferentes "nombres". Por ejemplo:

- [V8](https://es.wikipedia.org/wiki/Chrome_V8) -- en Chrome y Opera.
- [SpiderMonkey](https://es.wikipedia.org/wiki/SpiderMonkey) -- en Firefox.
- ... Hay otros nombres como "Trident" y "Chakra" para diferentes versiones de IE, "ChakraCore" para Microsoft Edge, "Nitro" y "SquirrelFish" para Safari, etc.

Es bueno recordar los nombres anteriores porque se usan en artículos de programación. Los usaremos también. Por ejemplo, si "una característica X es compatible con V8", entonces probablemente funcione en Chrome y Opera.

```smart header="¿Cómo funcionan los motores?"

Los motores son complicados. Pero los fundamentos son fáciles.

1. El motor (incrustado si es un navegador) lee ("analiza") el script.
2. Luego convierte ("compila") el script al lenguaje máquina.
3. Y luego ejecuta el código máquina, bastante rápido.

El motor aplica optimizaciones en cada paso del proceso. Incluso observa el script compilado a medida que se ejecuta, analiza los datos que fluyen a través de él y aplica optimizaciones al código de la máquina basándose en ese conocimiento. Los scripts se ejecutan bastante rápido.
```

## ¿Qué puede hacer JavaScript en el navegador?

El JavaScript moderno es un lenguaje de programación "seguro". No proporciona acceso de bajo nivel a la memoria o al CPU, ya que se creó inicialmente para los navegadores que no lo requieren.

Las capacidades de Javascript dependen en gran medida del entorno en el que se ejecuta. Por ejemplo, [Node.JS](https://es.wikipedia.org/wiki/Node.js) admite funciones que permiten a JavaScript leer/escribir archivos arbitrarios, realizar solicitudes de red, etc.

En el navegador JavaScript puede hacer todo lo relacionado con la manipulación de la página web, la interacción con el usuario y el servidor web.

Por ejemplo, JavaScript en el navegador es capaz de:

- Agregar un nuevo HTML a la página, cambiar el contenido existente, modificar los estilos.
- Reaccionar a las acciones del usuario, como clics del ratón, movimientos del puntero, presión de teclas.
- Envíar solicitudes a través de la red a servidores remotos, descargar y cargar archivos (las llamadas tecnologías [AJAX](https://es.wikipedia.org/wiki/AJAX) y [COMET](https://es.wikipedia.org/wiki/Comet)).
- Obtener y configurar cookies, hacer preguntas al visitante, mostrar mensajes.
- Recordar datos del lado del cliente ("local storage").

## ¿Qué NO PUEDE hacer JavaScript en el navegador?

Las capacidades de JavaScript en el navegador están limitadas para la seguridad del usuario. El objetivo es evitar que una página web maliciosa acceda a información privada o dañe los datos del usuario.

Ejemplos de tales restricciones incluyen:

- JavaScript en una página web no puede leer/escribir archivos arbitrarios en el disco duro, copiarlos o ejecutar programas. No tiene acceso directo a las funciones del sistema operativo.

    Los navegadores modernos le permiten trabajar con archivos, pero el acceso es limitado y solo es posible si el usuario realiza ciertas acciones, como "soltar" un archivo en una ventana del navegador o seleccionarlo mediante una etiqueta `<input>`.

    Hay formas de interactuar con la cámara/micrófono y otros dispositivos, pero requieren el permiso explícito de un usuario. Por lo tanto, una página habilitada para JavaScript no puede acceder a una cámara, observar el entorno y enviar la información a la [NSA](https://es.wikipedia.org/wiki/NASA).
- Diferentes pestañas/ventanas generalmente no se conocen entre sí. A veces lo hacen, por ejemplo, cuando una ventana usa JavaScript para abrir otra. Pero incluso en este caso, el JavaScript de una página no puede acceder a la otra si provienen de sitios diferentes (de un dominio, protocolo o puerto diferente).

    Esto se llama "Política del mismo origen". Para evitar eso, *ambas páginas* deben contener un código JavaScript especial que maneje el intercambio de datos.

    Esta limitación es, nuevamente, para la seguridad del usuario. Una página de http://algunsitio.com que un usuario ha abierto no debe poder acceder a otra pestaña del navegador con la URL http://gmail.com y robar información desde allí.
- JavaScript puede comunicarse con facilidad, por medio de la red, al servidor de donde proviene la página actual. Pero su capacidad para recibir datos de otros sitios/dominios está restringido. Aunque es posible, requiere un acuerdo explícito (expresado en encabezados HTTP) desde el lado remoto. Una vez más, eso es una limitación de seguridad.

![](limitations.png)

Tales límites no existen cuando JavaScript se usa fuera del navegador, por ejemplo, en un servidor. Los navegadores modernos también permiten complementos/extensiones que pueden solicitar permisos extendidos.

## ¿Qué hace que JavaScript sea único?

Hay al menos *tres* grandes cosas sobre JavaScript:

```compare
+ Integración completa con HTML/CSS.
+ Las cosas simples se hacen de manera simple.
+ Soporte por todos los principales navegadores y está habilitado por defecto.
```
Javascript es la única tecnología del navegador que combina estas tres cosas.

Eso es lo que hace que JavaScript sea único. Por eso es la herramienta más extendida para crear interfaces de navegador.

Al planear aprender una nueva tecnología, es beneficioso revisar sus perspectivas. Así que vamos a pasar a las tendencias modernas que lo afectan, incluyendo nuevos lenguajes y capacidades del navegador.


## Lenguajes "sobre" JavaScript

La sintaxis de JavaScript no se adapta a todas las necesidades. Diferentes personas quieren características diferentes.

Eso es de esperarse, porque los proyectos y los requisitos son diferentes para cada persona.

Hace poco apareció una gran cantidad de nuevos lenguajes, que se *transpilan* (convierten) a JavaScript antes de ejecutarse en el navegador.

Las herramientas modernas hacen que la transpilación sea muy rápida y transparente, lo que permite a los desarrolladores codificar en otro lenguaje y convertirlo automáticamente "bajo el capó".

Ejemplos de tales lenguajes:

- [CoffeeScript](http://coffeescript.org/) es un "azúcar sintáctico" para JavaScript. Introduce una sintaxis más corta, lo que nos permite escribir códigos más claros y precisos. Por lo general, a los desarrolladores de Ruby les agrada.
- [TypeScript](http://www.typescriptlang.org/) se concentra en agregar "tipos de datos estrictos" para simplificar el desarrollo y el soporte de sistemas complejos. Está desarrollado por Microsoft.
- [Dart](https://www.dartlang.org/) es un lenguaje independiente que tiene su propio motor que se ejecuta en entornos sin navegador (como las aplicaciones móviles). Inicialmente, fue ofrecido por Google como un reemplazo de JavaScript, pero a partir de ahora, los navegadores requieren que sea transpilado a JavaScript como los anteriores.

Hay más. Por supuesto, incluso si usamos uno de estos lenguajes, también deberíamos conocer JavaScript para entender realmente lo que estamos haciendo.

## Resumen

- JavaScript se creó inicialmente como un lenguaje solo para el navegador, pero ahora también se usa en muchos otros entornos.
- Hoy en día, JavaScript tiene una posición única como el lenguaje de navegador más ampliamente adoptado con integración completa con HTML/CSS.
- Hay muchos lenguajes que se "transpilan" a JavaScript y proporcionan ciertas funcionalidades. Se recomienda echarles un vistazo, al menos brevemente, después de dominar JavaScript.
