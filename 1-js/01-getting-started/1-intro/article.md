# Una Introducción a Javascript

Veamos qué tiene de especial JavaScript, qué podemos conseguir con él y qué otras tecnologías funcionan bien con él.

## Qué es JavaScript?

*JavaScript* fue creado inicialmente para *"dar vida a la páginas web"*.

Los programas en este lenguaje se llaman *scripts*. Pueden ser escritos directamente en el HTML de una página web y ejecutados automáticamente a medida que la página se carga.

Los scripts se presentan y ejecutan como texto plano. No necesitan preparación o compilación especial para ejecutarse.

En este aspecto, JavaScript es muy diferente a otro lenguaje llamado [Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programación))).

```smart header="¿Por qué <u>Java</u>Script?"
Cuando se creó JavaScript, inicialmente tenía otro nombre: "LiveScript". Pero Java era muy popular en esa época, así que se decidió que posicionar un nuevo lenguaje como el "hermano menor" de Java ayudaría.

Pero a medida que evolucionó, JavaScript se convirtió en un lenguaje totalmente independiente con su propia especificación denominada [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript), y ahora no tiene ninguna relación con Java en absoluto.
```

Hoy en día, JavaScript puede ejecutarse no sólo en el navegador, sino también en el servidor, o en cualquier dispositivo que tenga un programa especial llamado [el motor de JavaScript] (https://es.wikipedia.org/wiki/Int%C3%A9rprete_de_JavaScript).

El navegador tiene un motor embebido a veces llamado "máquina virtual de JavaScript".

Diferentes motores tienen diferentes "nombres en clave". Por ejemplo:

- [V8](https://es.wikipedia.org/wiki/Chrome_V8) -- en Chrome y Opera.
- [SpiderMonkey](https://es.wikipedia.org/wiki/SpiderMonkey) -- en Firefox.

- ...Existen otros nombres en clave como "Trident" y "Chakra" para diferentes versiones de IE, "ChakraCore" para Microsoft Edge, "Nitro" y "SquirrelFish" para Safari, etc.

Los términos anteriores, es bueno recordarlos porque se utilizan en artículos para desarrolladores en Internet. Nosotros los usaremos también. Por ejemplo, si "una característica X es soportada por V8", entonces probablemente funcione en Chrome y Opera.

```smart header="¿Cómo funcionan los motores?"

Los motores son complicados. Pero los fundamentos son sencillos.

1. El motor (embebido si es un navegador) lee ("analiza") el script.
2. Luego convierte ("compila") el script al lenguaje máquina.
3. Y entonces el código máquina se ejecuta, bastante rápido.

El motor aplica optimizaciones en cada paso del proceso. Incluso observa el script compilado mientras se ejecuta, analiza los datos que fluyen a través de él y aplica optimizaciones al código máquina basadas en ese conocimiento. Cuando está hecho, los scripts se ejecutan bastante rápido.
```

## ¿Qué puede hacer JavaScript dentro del navegador?

El JavaScript moderno es un lenguaje de programación "seguro". No proporciona acceso de bajo nivel a la memoria o a la CPU, ya que fue creado inicialmente para navegadores que no lo requieren.

Las capacidades de Javascript dependen en gran medida del entorno en el que se ejecuta. Por ejemplo, [Node.JS](https://es.wikipedia.org/wiki/Node.js) soporta funciones que le permiten a JavaScript leer/escribir archivos arbitrarios, realizar peticiones de red, etc.

JavaScript en el navegador puede hacer todo lo relacionado con manipulación de páginas web, la interacción con el usuario y el servidor web.

Por ejemplo, JavaScript en el navegador es capaz de:

- Agregar nuevo HTML a la página, cambiar el contenido existente, modificar estilos.
- Reaccionar a las acciones del usuario, ejecutarse ante clics del ratón, movimientos del puntero, pulsaciones de teclas.
- Enviar solicitudes a través de la red a servidores remotos, descargar y cargar archivos (las llamadas tecnologías [AJAX](https://es.wikipedia.org/wiki/AJAX) y [COMET](https://es.wikipedia.org/wiki/Comet)).
- Obtener y establecer cookies, hacer preguntas al visitante, mostrar mensajes.
- Recordar datos en el lado del cliente con el almacenamiento local ("local storage").

## ¿Qué NO puede hacer JavaScript en el navegador?

Las capacidades de JavaScript en el navegador están limitadas por el bien de la seguridad del usuario. El objetivo es evitar que una página web malintencionada acceda a información privada o perjudique los datos del usuario.

Ejemplos de tales restricciones incluyen:

- JavaScript en una página web no puede leer/escribir arbitrariamente archivos en el disco duro, copiarlos o ejecutar programas. No tiene acceso directo a las funciones del sistema operativo.

    Los navegadores modernos le permiten trabajar con archivos, pero el acceso es limitado y sólo se proporciona si el usuario realiza ciertas acciones, como "soltar" un archivo en una ventana del navegador o seleccionarlo mediante una etiqueta `<input>`.

    Hay formas de interactuar con la cámara/micrófono y otros dispositivos, pero requieren el permiso explícito del usuario. Por lo tanto, no es posible que una página con JavaScript habilite sigilosamente una cámara web, observe el entorno y envíe la información a la [NSA] (https://es.wikipedia.org/wiki/Agencia_de_Seguridad_Nacional).
- Las diferentes pestañas/ventanas generalmente no se conocen entre sí. A veces lo hacen, por ejemplo cuando una ventana utiliza JavaScript para abrir la otra. Pero incluso en este caso, no es posible que JavaScript de una página pueda acceder a la otra si provienen de sitios diferentes (de un dominio, protocolo o puerto diferente).

    Esto se denomina "Política de Mismo Origen". Para evitarlo, *ambas páginas* deben contener un código JavaScript especial que se encargue del intercambio de datos.

    Esta limitación es, una vez más, para la seguridad del usuario. Una página de `http://cualquiersitio.com` que un usuario haya abierto no debe poder acceder a otra pestaña del navegador con la URL ``http://gmail.com` y robar información de allí.
- JavaScript puede comunicarse fácilmente a través de la red con el servidor de donde proviene la página actual. Pero su capacidad para recibir datos de otros sitios/dominios está paralizada. Aunque es posible, requiere un acuerdo explícito (expresado en cabeceras HTTP) desde el lado remoto. Una vez más, es una limitación de seguridad.

![](limitaciones.png)

Tales limitaciones no existen si JavaScript se utiliza fuera del navegador, por ejemplo, en un servidor. Los navegadores modernos también permiten complementos/extensiones que pueden solicitar permisos extendidos.

## ¿Qué hace que JavaScript sea único?

Hay por lo menos *tres* grandes cosas de JavaScript:

```compare
+ Integración completa con HTML/CSS.
+ Las cosas simples se hacen de manera sencilla.
+ Soportado por la mayoría de los navegadores y habilitado por defecto.
```
Javascript es la única tecnología de navegador que combina estas tres cosas.

Eso es lo que hace único a JavaScript. Por eso es la herramienta más extendida para crear interfaces de navegador.

Al planificar aprender una nueva tecnología, es beneficioso revisar sus perspectivas. Así que vamos a movernos a las tendencias modernas que lo afectan, incluyendo nuevos lenguajes y capacidades del navegador.

## Lenguajes "por arriba de" JavaScript

La sintaxis de JavaScript no se ajusta a las necesidades de todos. Diferentes personas quieren diferentes características.

Eso es de esperar, porque los proyectos y los requisitos son diferentes para cada uno.

Así que recientemente ha aparecido una plétora de nuevos lenguajes, los cuales son *transpilados* (convertidos) a JavaScript antes de ser ejecutados en el navegador.

Las herramientas modernas hacen que la transpilación sea muy rápida y transparente, permitiendo a los desarrolladores programar en otro lenguaje y convertirlo automáticamente detrás de escena.

Ejemplos de estos lenguajes:

- [CoffeeScript](http://coffeescript.org/) una "sintaxis azucarada" [syntactic sugar] para JavaScript. Introduce una sintaxis más corta, lo que nos permite escribir un código más claro y preciso. Normalmente, a los programadores de Ruby les gusta.
- [TypeScript](http://www.typescriptlang.org/) se concentra en añadir "escritura de datos estricta" para simplificar el desarrollo y el soporte de sistemas complejos. Es desarrollado por Microsoft.
- [Dart](https://www.dartlang.org/) es un lenguaje independiente que tiene su propio motor que funciona en entornos que no son navegadores (como las aplicaciones móviles). Inicialmente fue ofrecido por Google como un reemplazo de JavaScript, pero a partir de ahora, los navegadores requieren que sea transpilado a JavaScript como los de arriba.

Hay más. Por supuesto, incluso si usamos uno de estos lenguajes, también deberíamos conocer JavaScript para entender realmente lo que estamos haciendo.

## Resumen

- JavaScript fue creado inicialmente como un lenguaje sólo para navegadores, pero ahora también es utilizado en muchos otros entornos.
- Hoy en día, JavaScript tiene una posición única como el lenguaje para navegadores más ampliamente utilizado con plena integración con HTML/CSS.
- Existen muchos lenguajes que se "transpilan" a JavaScript y proporcionan ciertas características. Se recomienda echarles un vistazo, al menos brevemente, después de dominar JavaScript.
