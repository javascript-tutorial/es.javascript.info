# TextDecoder y TextEncoder

¿Qué pasa si los datos binarios son en realidad un string? Por ejemplo, recibimos un archivo con datos textuales.

El objeto incorporado [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) nos permite leer el valor y convertirlo en un string de JavaScript, dados el búfer y la codificación.

Primero necesitamos crearlo:
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- la codificación, `utf-8` por defecto, pero `big5`, `windows-1251` y muchos otros también son soportados.
- **`options`** -- objeto opcional:
  - **`fatal`** -- booleano, si es `true` arroja una excepción por caracteres inválidos (no-decodificable), de otra manera (por defecto) son reemplazados con el carácter `\uFFFD`.
  - **`ignoreBOM`** -- booleano, si es `true` entonces ignora BOM (una marca Unicode de orden de bytes opcional), raramente es necesario.

...Y luego decodificar:

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- `BufferSource` para decodificar.
- **`options`** -- objeto opcional:
  - **`stream`** -- true para decodificación de secuencias, cuando el `decoder` es usado repetidamente para fragmentos de datos entrantes. En ese caso, un carácter de varios bytes puede ocasionalmente dividirse entre fragmentos. Esta opción le dice al `TextDecoder` que memorice caracteres "incompletos" y que los decodifique cuando venga el siguiente fragmento.

Por ejemplo:

```js run
let uint8Array = new Uint8Array([72, 111, 108, 97]);

alert( new TextDecoder().decode(uint8Array) ); // Hola
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

Podemos decodificar una parte del búfer al crear una vista de sub arreglo para ello:


```js run
let uint8Array = new Uint8Array([0, 72, 111, 108, 97, 0]);

// El string esta en medio
// crear una nueva vista sobre el string, sin copiar nada
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hola
```

## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) hace lo contrario: convierte un string en bytes.

La sintaxis es:

```js
let encoder = new TextEncoder();
```

La única codificación que soporta es "utf-8".

Tiene dos métodos:
- **`encode(str)`** -- regresa un dato de tipo `Uint8Array` de un string.
- **`encodeInto(str, destination)`** -- codifica un `str` en `destination`, este último debe ser de tipo `Uint8Array`.

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hola");
alert(uint8Array); // 72,111,108,97
```
