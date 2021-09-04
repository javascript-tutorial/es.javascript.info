# Enfocado: enfoque/desenfoque

Un elemento se enfoca cuando el usuario hace click sobre él o al pulsar `key:Tab` en el teclado. Existen también un atributo `autofocus` de HTML que enfoca un elemento por defecto cuando una página carga, y otros medios de conseguir el enfoque.

Enfocarse sobre un elemento generalmente significa: "prepárate para aceptar estos datos", por lo que es el momento en el cual podemos correr el código para inicializar la funcionalidad requerida.

El momento de desenfoque ("blur") puede ser incluso más importante. Ocurre cuando un usuario clica en otro punto o presiona `key:Tab` para ir al siguiente campo de un formulario. También hay otras maneras.

Perder el foco o desenfocarse generalmente significa: "los datos ya han sido introducidos", entonces podemos correr el código para comprobarlo, o para guardarlo en el servidor, etc.

Existen importantes peculiaridades al trabajar con eventos de enfoque. Haremos lo posible para abarcarlas a continuación. 

## Eventos focus/blur

El evento `focus` es llamado al enfocar, y el `blur` cuando el elemento pierde el foco.

Utilicémoslos para la validación de un campo de entrada. 

En el ejemplo a continuación:

- El manejador `blur` comprueba si se ha introducido un correo, y en caso contrario muestra un error.
- El manejador `focus` esconde el mensaje de error (en `blur` se volverá a comprobar):

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Su correo por favor: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Por favor introduzca un correo válido.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // quitar la  indicación "error", porque el usuario quiere reintroducir algo
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

El HTML actual nos permite efectuar diversas validaciones utilizando atributos de entrada: `required`, `pattern`, etc. Y muchas veces son todo lo que necesitamos. JavaScript puede ser utilizado cuando queremos más flexibilidad. También podríamos enviar automáticamente el valor modificado al servidor si es correcto. 


## Métodos focus/blur

Los métodos `elem.focus()` y `elem.blur()` ponen/quitan el foco sobre el elemento.

Por ejemplo, impidamos al visitante que deje la entrada si el valor es inválido: 

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Su correo por favor: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="hacer que el correo sea inválido y tratar de enfocar aquí">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // no es un correo
      // mostrar error
      this.classList.add("error");
*!*
      // ...y volver a enfocar
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Funciona en todos los navegadores excepto Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Si introducimos algo en la entrada y luego intentamos pulsar `key:Tab` o hacer click fuera del `<input>`, entonces `onblur` lo vuelve a enfocar.

Por favor tened en cuenta que no podemos "prevenir perder el foco" llamando a `event.preventDefault()` en `onblur`, porque `onblur` funciona *después* de que el elemento perdió el foco.

```warn header="Pérdida de foco iniciada por JavaScript"
Una pérdida de foco puede ocurrir por diversas razones. 

Una de ellas ocurre cuando el visitante clica en algún otro lado. Pero el propio JavaScript podría causarlo, por ejemplo:

- Un `alert` traslada el foco hacia sí mismo, lo que causa la pérdida de foco sobre el elemento (evento `blur`). Y cuando el `alert` es cerrado, el foco vuelve (evento `focus`).
- Si un elemento es eliminado del DOM, también causa pérdida de foco. Si es reinsertado el foco no vuelve.

Estas situaciones a veces causan que los manejadores `focus/blur` no funcionen adecuadamente y se activen cuando no son necesarios.

Es recomendable tener cuidado al utilizar estos eventos. Si queremos monitorear pérdidas de foco iniciadas por el usuario deberíamos evitar causarlas nosotros mismos.
```
## Permitir enfocado sobre cualquier elemento: tabindex

Por defecto, muchos elementos no permiten enfoque.

La lista varía un poco entre navegadores, pero una cosa es siempre cierta: `focus/blur` está garantizado para elementos con los que el visitante puede interactuar: `<button>`, `<input>`, `<select>`, `<a>`, etc.

En cambio, elementos que existen para formatear algo, tales como `<div>`, `<span>`, `<table>`, por defecto no son posibles de enfocar. El método `elem.focus()` no funciona en ellos, y los eventos `focus/blur` no son desencadenados.

Esto puede ser modificado usando el atributo HTML `tabindex`.

Cualquier elemento se vuelve enfocable si contiene `tabindex`. El valor del atributo es el número de orden del elemento cuando `key:Tab` (o algo similar) es utilizado para cambiar entre ellos.  

Es decir: si tenemos dos elementos donde el primero contiene `tabindex="1"` y el segundo contiene `tabindex="2"`, al presionar `key:Tab` estando situado sobre el primer elemento se traslada el foco al segundo.

El orden de cambio es el siguiente: los elementos con `tabindex` de valor "1" y mayores tienen prioridad (en el orden `tabindex`) y después los elementos sin `tabindex` (por ejemplo un <input> estándar). 

Elementos sin el `tabindex` correspondiente van cambiando en el orden del código fuente del documento (el orden por defecto).

Existen dos valores especiales: 

- `tabindex="0"` incluye al elemento entre los que carecen de `tabindex`. Esto es, cuando cambiamos entre elementos, elementos con `tabindex="0"` van después de elementos con `tabindex ≥ "1"`.

Habitualmente se utiliza para hacer que un elemento sea enfocable y a la vez mantener intacto el orden de cambio por defecto. Para hacer que un elemento sea parte del formulario a la par con <input>.

- `tabindex="-1"` permite enfocar un elemento solamente a través de código. `key:Tab` ignora estos elementos, pero el método `elem.focus()` funciona.

Por ejemplo, he aquí una lista. Clique sobre el primer ítem y pulse `key:Tab`:

```html autorun no-beautify
Clique sobre el primer ítem y pulse `key:Tab`. Fíjese en el orden. Note que subsiguientes `key:Tab` pueden desplazar el foco fuera del iframe en el ejemplo.
<ul>
  <li tabindex="1">Uno</li>
  <li tabindex="0">Cero</li>
  <li tabindex="2">Dos</li>
  <li tabindex="-1">Menos uno</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

El orden es el siguiente: `1 - 2 - 0`. Normalmente, `<li>` no admite enfocado pero `tabindex` lo habilita, junto con eventos y estilado con `:focus`. 

```smart header="La propiedad `elem.tabIndex` también funciona"
Podemos añadir `tabindex` desde JavaScript utilizando la propiedad `elem.tabIndex`. Se consigue el mismo resultado.
```

## Delegación: focusin/focusout

Los eventos `focus` y `blur` no se propagan.

Por ejemplo, no podemos añadir `onfocus` en <form> para resaltarlo, así:

```html autorun height=80
<!-- enfocando en el formulario -- añadir la clase -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

El ejemplo anterior no funciona porque cuando el usuario enfoca sobre un <input> el evento ´focus´ se dispara solamente sobre esa entrada y no se propaga, por lo que `form.onfocus` nunca se dispara.

Existen dos soluciones.

Primera: hay una peculiar característica histórica: `focus/blur` no se propagan hacia arriba, pero lo hacen hacia abajo en la fase de captura.

Esto funcionará:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // pon el manejador en fase de captura (último argumento "verdadero")
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

Segunda: existen los eventos `focusin` y `focusout`, exactamente iguales a `focus/blur`, pero se propagan.

Hay que tener en cuenta que han de asignarse utilizando `elem.addEventListener`, no `on<event>`.

La otra opción que funciona:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## Resumen

Los eventos `focus` y `blur` hacen que un elemento se enfoque/pierda el foco.

Se caracterizan por lo siguiente:
- No se propagan. En su lugar se puede capturar el estado o usar `focusin/focusout`.
- La mayoría de los elementos no permiten enfoque por defecto. Utiliza `tabindex` para hacer cualquier elemento enfocable.

El elemento que en el momento tiene el foco está disponible como `document.activeElement`.
