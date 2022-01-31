# Teclado: keydown y keyup

Antes de llegar al teclado, por favor ten en cuenta que en los dispositivos modernos hay otras formas de "ingresar algo".  Por ejemplo, el uso de reconocimiento de voz (especialmente en dispositivos móviles) o copiar/pegar con el mouse.

Entonces, si queremos hacer el seguimiento de cualquier ingreso en un campo `<input>`, los eventos de teclado no son suficientes. Existe otro evento llamado `input` para detectar cambios en un campo `<input>` producidos por cualquier medio. Y puede ser una mejor opción para esa tarea. Lo estudiaremos más adelante, en el capítulo <info:events-change-input>.

Los eventos de teclado solo deberían ser usados cuando queremos manejar acciones de teclado (también cuentan los teclados virtuales). Por ejemplo, para reaccionar a las teclas de flecha `key:Up` y `key:Down` o a atajos de teclado "hotkeys" (incluyendo combinaciones de teclas).


## Teststand [#keyboard-test-stand]

```offline
Para entender mejor los eventos de teclado, puedes usar [teststand](sandbox:keyboard-dump).
```

```online
Para entender mejor los eventos de teclado, puedes usar "teststand" aquí abajo.

Prueba diferentes combinaciones de tecla en el campo de texto.

[codetabs src="keyboard-dump" height=480]
```


## Keydown y keyup

Los eventos `keydown` ocurren cuando se presiona una tecla, y `keyup` cuando se suelta.

### event.code y event.key

La propiedad `key` del objeto de evento permite obtener el carácter, mientras que la propiedad `code` del evento permite obtener el "código físico de la tecla".

Por ejemplo, la misma tecla `key:Z` puede ser presionada con o sin `key:Shift`. Esto nos da dos caracteres diferentes: `z` minúscula y `Z` mayúscula.

`event.key` es el carácter exacto, y será diferente. Pero `event.code` es el mismo:

| Tecla         | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (minúscula)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (mayúscula)          |`KeyZ`        |


Si un usuario trabaja con diferentes lenguajes, el cambio a otro lenguaje podría producir un carácter totalmente diferente a `"Z"`. Este se volverá el valor de `event.key`, mientras que `event.code` es siempre el mismo: `"KeyZ"`.

```smart header="\"KeyZ\" y otros códigos de tecla"
Cada tecla tiene el código que depende de su ubicación en el teclado. Los códigos de tecla están descritos en la especificación [UI Events code](https://www.w3.org/TR/uievents-code/).

Por ejemplo:
- Las letras tienen códigos como `"Key<letter>"`: `"KeyA"`, `"KeyB"` etc.
- Los dígitos tienen códigos como `"Digit<number>"`: `"Digit0"`, `"Digit1"` etc.
- Las teclas especiales están codificadas por sus nombres: `"Enter"`, `"Backspace"`, `"Tab"` etc.

Hay varias distribuciones de teclado esparcidos, y la especificación nos da los códigos de tecla para cada una de ellas.

Para más códigos, puedes leer la [sección alfanumérica de la especificación](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section), o simplemente presionar una tecla en el [teststand](#keyboard-test-stand) arriba.
```

```warn header="La mayúscula importa: es `\"KeyZ\"`, no `\"keyZ\"`"
Parece obvio, pero aún se cometen estos errores.

Por favor evita errores de tipeo: es `KeyZ`, no `keyZ`. Una verificación como `event.code=="keyZ"` no funcionará: la primera letra de `"Key"` debe estar en mayúscula.
```

¿Qué pasa si una tecla no da ningún carácter? Por ejemplo, `key:Shift` o `key:F1` u otras. Para estas teclas, `event.key` es aproximadamente lo mismo que `event.code`:

| Key          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` or `ShiftLeft`        |

Ten en cuenta que `event.code` especifica con exactitud la tecla que es presionada. Por ejemplo, la mayoría de los teclados tienen dos teclas `key:Shift`: una a la izquierda y otra a la derecha. `event.code` nos dice exactamente cuál fue presionada, en cambio `event.key` es responsable del "significado" de la tecla: lo que "es" (una "Mayúscula").

Digamos que queremos manejar un atajo de teclado: `key:Ctrl+Z` (o `key:Cmd+Z` en Mac). La mayoría de los editores de texto "cuelgan" la acción "Undo" en él. Podemos configurar un "listener" para escuchar el evento `keydown` y verificar qué tecla es presionada.

Hay un dilema aquí: en ese "listener", ¿debemos verificar el valor de `event.key` o el de `event.code`?

Por un lado, el valor de `event.key` es un carácter que cambia dependiendo del lenguaje. Si el visitante tiene varios lenguajes en el sistema operativo y los cambia, la misma tecla dará diferentes caracteres. Entonces tiene sentido chequear `event.code` que es siempre el mismo.

Como aquí:

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

Por otro lado, hay un problema con `event.code`. Para diferentes distribuciones de teclado, la misma tecla puede tener diferentes caracteres.

Por ejemplo, aquí abajo mostramos la distribución de EE.UU. "QWERTY" y la alemana "QWERTZ" (de Wikipedia):

![](us-layout.svg)

![](german-layout.svg)

Para la misma tecla, la distribución norteamericana tiene "Z", mientras que la alemana tiene "Y" (las letras son intercambiadas).

Efectivamente, `event.code` será igual a `KeyZ` para las personas con distribución de teclas alemana cuando presionen `key:Y`.

Si chequeamos `event.code == 'KeyZ'` en nuestro código, las personas con distribución alemana pasarán el test cuando presionen `key:Y`.

Esto suena realmente extraño, y lo es. La [especificación](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) explícitamente menciona este comportamiento.

Entonces, `event.code` puede coincidir con un carácter equivocado en una distribución inesperada. Las mismas letras en diferentes distribuciones pueden mapear a diferentes teclas físicas, llevando a diferentes códigos. Afortunadamente, ello solo ocurre en algunos códigos, por ejemplo `keyA`, `keyQ`, `keyZ` (que ya hemos visto), y no ocurre con teclas especiales como `Shift`. Puedes encontrar la lista en la [especificación](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

Para un seguimiento confiable de caracteres que dependen de la distribución, `event.key` puede ser una mejor opción.

Por otro lado, `event.code` tiene el beneficio de quedar siempre igual, ligado a la ubicación física de la tecla. Así los atajos de teclado que dependen de él funcionan bien aunque cambie el lenguaje.

¿Queremos manejar teclas que dependen de la distribución? Entonces `event.key` es lo adecuado.

¿O queremos que un atajo funcione en el mismo lugar incluso si cambia el lenguaje? Entonces `event.code` puede ser mejor.

## Autorepetición

Si una tecla es presionada durante suficiente tiempo, comienza a "autorepetirse": `keydown` se dispara una y otra vez, y  cuando es soltada finalmente se obtiene `keyup`. Por ello es normal tener muchos `keydown` y un solo `keyup`.

Para eventos disparados por autorepetición, el objeto de evento tiene la propiedad `event.repeat` establecida a `true`.


## Acciones predeterminadas

Las acciones predeterminadas varían, al haber muchas cosas posibles que pueden ser iniciadas por el teclado.

Por ejemplo:

- Un carácter aparece en la pantalla (el resultado más obvio).
- Un carácter es borrado (tecla `key:Delete`).
- Un avance de página (tecla `key:PageDown`).
- El navegador abre el diálogo "guardar página" (`key:Ctrl+S`)
-  ...y otras.

Evitar la acción predeterminada en `keydown` puede cancelar la mayoría de ellos, con la excepción de las teclas especiales basadas en el sistema operativo. Por ejemplo, en Windows la tecla `key:Alt+F4` cierra la ventana actual del navegador. Y no hay forma de detenerla por medio de "evitar la acción predeterminada" de JavaScript.

Por ejemplo, el `<input>` debajo espera un número telefónico, entonces no acepta teclas excepto dígitos, `+`, `()` or `-`:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || ['+','(',')','-'].includes(key);
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Teléfono, por favor" type="tel">
```

Aquí el manejador `onkeydown` usa `checkPhoneKey` para chequear la tecla presionada. Si es válida (de `0..9` o uno de `+-()`), entonces devuelve `true`, de otro modo, `false`.

Como ya sabemos, el valor `false` devuelto por el manejador de eventos, asignado usando una propiedad DOM o un atributo tal como lo hicimos arriba, evita la acción predeterminada; entonces nada aparece en `<input>` para las teclas que no pasan el test. (El valor `true` no afecta en nada, solo importa el valor `false`)

Ten en cuenta que las teclas especiales como `key:Backspace`, `key:Left`, `key:Right`, no funcionan en el input. Este es un efecto secundario del filtro estricto que hace `checkPhoneKey`. Estas teclas hacen que devuelva `false`.

Aliviemos un poco el filtro permitiendo las tecla de flecha `key:Left`, `key:Right`, y `key:Delete`, `key:Backspace`:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') ||
    ['+','(',')','-',*!*'ArrowLeft','ArrowRight','Delete','Backspace'*/!*].includes(key);
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Teléfono, por favor" type="tel">
```

Ahora las flechas y el borrado funcionan bien.

Aunque tenemos el filtro de teclas, aún se puede ingresar cualquier cosa usando un mouse y "botón secundario + pegar". Dispositivos móviles brindan otros medios para ingresar valores. Así que el filtro no es 100% confiable.

Un enfoque alternativo sería vigilar el evento `oninput`, este se dispara *después* de cualquier modificación. Allí podemos chequear el nuevo `input.value` y modificar o resaltar `<input>` cuando es inválido. O podemos usar ambos manejadores de eventos juntos.

## Código heredado

En el pasado existía un evento `keypress`, y también las propiedades del objeto evento `keyCode`, `charCode`, `which`.

Al trabajar con ellos había tantas incompatibilidades entre los navegadores que los desarrolladores de la especificación no tuvieron otra alternativa que declararlos obsoletos y crear nuevos y modernos eventos (los descritos arriba en este capítulo). El viejo código todavía funciona porque los navegadores aún lo soportan, pero no hay necesidad de usarlos más, en absoluto.

## Teclados en dispositivos móviles

Cuando se usan teclados virtuales o los de dispositivos móviles, formalmente conocidos como IME (Input-Method Editor), el estándar W3C establece que la propiedad de KeyboardEvent [`e.keyCode` debe ser `229`](https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode) y [`e.key` debe ser `"Unidentified"`](https://www.w3.org/TR/uievents-key/#key-attr-values).

Mientras algunos de estos teclados pueden aún usar los valores correctos para `e.key`, `e.code`, `e.keyCode`..., cuando se presionan ciertas teclas tales como flechas o retroceso no hay garantía, entonces nuestra lógica de teclado podría no siempre funcionar bien en dispositivos móviles.

## Resumen

Presionar una tecla siempre genera un evento de teclado, sean teclas de símbolos o teclas especiales como `key:Shift` o `key:Ctrl` y demás. La única excepción es la tecla `key:Fn` que a veces está presente en teclados de laptops. No hay un evento de teclado para ella porque suele estar implementado en un nivel más bajo que el del sistema operativo.

Eventos de teclado:

- `keydown` -- al presionar la tecla (comienza a autorepetir si la tecla queda presionada por un tiempo),
- `keyup` -- al soltar la tecla.

Principales propiedades de evento de teclado:

- `code` -- el código de tecla "key code" (`"KeyA"`, `"ArrowLeft"` y demás), especifica la ubicación física de la tecla en el teclado.
- `key` -- el carácter (`"A"`, `"a"` y demás). Para las teclas que no son de caracteres como `key:Esc`, suele tener el mismo valor que `code`.

En el pasado, los eventos de teclado eran usados para detectar cambios en los campos de formulario. Esto no es confiable, porque el ingreso puede venir desde varias fuentes. Para manejar cualquier ingreso tenemos los eventos `input` y `change` (tratados en el capítulo <info:events-change-input>). Ellos se disparan después de cualquier clase de ingreso, incluyendo copiar/pegar y el reconocimiento de voz.

Deberíamos usar eventos de teclado solamente cuando realmente queremos el teclado. Por ejemplo, para reaccionar a atajos o a teclas especiales.
