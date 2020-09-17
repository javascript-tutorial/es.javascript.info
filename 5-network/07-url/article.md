
# Objetos URL

La clase [URL](https://url.spec.whatwg.org/#api) incorporada brinda una interfaz conveniente para crear y analizar URLs.

No hay métodos de networking que requieran exactamente un objeto `URL`, los strings son suficientemente buenos para eso. Así que técnicamente no tenemos que usar `URL`. Pero a veces puede ser realmente útil.

## Creando una URL

La sintaxis para crear un nuevo objeto `URL` es:

```js
new URL(url, [base])
```

- **`url`** -- La URL completa o ruta única (si se establece base, mira a continuación),
- **`base`** - una URL base opcional: si se establece y el argumento `url` solo tiene una ruta, entonces la URL se genera relativa a `base`.

Por ejemplo:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Estas dos URLs son las mismas:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Fácilmente podemos crear una nueva URL basada en la ruta relativa a una URL existente:

```js run
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

El objeto `URL` inmediatamente nos permite acceder a sus componentes, por lo que es una buena manera de analizar la url, por ej.:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Aquí está la hoja de trucos para los componentes URL:

![](url-object.svg)

- `href` es la url completa, igual que `url.toString()` 
- `protocol` acaba con el carácter dos puntos `:` 
- `search` - un string de parámetros, comienza con el signo de interrogación `?` 
- `hash` comienza con el carácter de hash `#`  
- También puede haber propiedades `user` y `password` si la autenticación HTTP esta presente: `http://login:password@site.com` (no mostrados arriba, raramente usados)


```smart header="Podemos pasar objetos `URL` a métodos de red (y la mayoría de los demás) en lugar de un string"
Podemos usar un objeto `URL` en `fetch` o `XMLHttpRequest`, casi en todas partes donde se espera un URL-string.

Generalmente, un objeto `URL` puede pasarse a cualquier método en lugar de un string, ya que la mayoría de métodos llevarán a cabo la conversión del string, eso convierte un objeto `URL` en un string con URL completa.
```

## Parámetros de búsqueda "?..."

Digamos que queremos crear una url con determinados parámetros de búsqueda, por ejemplo, `https://google.com/search?query=JavaScript`.

Podemos proporcionarlos en el string URL:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Pero los parámetros necesitan estar codificados si contienen espacios, letras no latinas, entre otros (Más sobre eso debajo).

Por lo que existe una propiedad URL para eso: `url.searchParams`, un objeto de tipo [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Esta proporciona métodos convenientes para los parámetros de búsqueda:

- **`append(name, value)`** -- añade el parámetro por `name`, 
- **`delete(name)`** -- elimina el parámetro por `name`, 
- **`get(name)`** -- obtiene el parámetro por `name`, 
- **`getAll(name)`** -- obtiene todos los parámetros con el mismo `name` (Eso es posible, por ej. `?user=John&user=Pete`), 
- **`has(name)`** -- comprueba la existencia del parámetro por `name`,  
- **`set(name, value)`** -- establece/reemplaza el parámetro,
- **`sort()`** -- ordena parámetros por `name`, raramente necesitado,
- ...y además es iterable, similar a `Map`. 

Un ejemplo con parámetros que contienen espacios y signos de puntuación:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // Parámetro añadido con un espacio y !

alert(url); // https://google.com/search?q=test+me%21

url.searchParams.set('tbs', 'qdr:y'); // Parámetro añadido con dos puntos :

// Los parámetros son automáticamente codificados
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// Iterar sobre los parametros de búsqueda (Decodificados)
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```


## Codificación

Existe un estándar [RFC3986](https://tools.ietf.org/html/rfc3986) que define cuales caracteres son permitidos en URLs y cuales no.

Esos que no son permitidos, deben ser codificados, por ejemplo letras no latinas y espacios - reemplazados con sus códigos UTF-8, con el prefijo `%`, tal como `%20` (un espacio puede ser codificado con `+`, por razones históricas, pero esa es una excepción).

La buena noticia es que los objetos `URL` manejan todo eso automáticamente. Nosotros sólo proporcionamos todos los parámetros sin codificar, y luego convertimos la `URL` a string:

```js run
// Usando algunos caracteres cirílicos para este ejemplo

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Como puedes ver, ambos `Тест` en la ruta url y `ъ` en el parámetro están codificados.

La URL se alarga, ya que cada letra cirílica es representada con dos bytes en UTF-8, por lo que hay dos entidades `%..`.

### Codificando strings

En los viejos tiempos, antes de que los objetos `URL` aparecieran, la gente usaba strings para las URL.

A partir de ahora, los objetos `URL` son frecuentemente más convenientes, pero también aún pueden usarse los strings. En muchos casos usando un string se acorta el código. 

Aunque si usamos un string, necesitamos codificar/decodificar caracteres especiales manualmente.

Existen funciones incorporadas para eso:

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) - Codifica la URL como un todo.
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) - La decodifica de vuelta.
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) - Codifica un componente URL, como un parametro de busqueda, un hash, o un pathname.
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) - La decodifica de vuelta.

Una pregunta natural es: "¿Cuál es la diferencia entre `encodeURIComponent` y `encodeURI`?¿Cuándo deberíamos usar una u otra?

Eso es fácil de entender si miramos a la URL, que está separada en componentes en la imagen de arriba:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Como podemos ver, caracteres tales como `:`, `?`, `=`, `&`, `#` son admitidos en URL.

...Por otra parte, si miramos a un único componente URL, como un parámetro de búsqueda, estos caracteres deben estar codificados, para no romper el formateo.

- `encodeURI` Codifica solo caracteres que están totalmente prohibidos en URL
- `encodeURIComponent` Codifica los mismos caracteres, y, en adición a ellos, los caracteres `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` y `@`.

Entonces, para una URL completa podemos usar `encodeURI`:

```js run
// Usando caracteres cirílicos en el path URL
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...Mientras que para parámetros URL deberíamos usar `encodeURIComponent` en su lugar:

```js run
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Compáralo con `encodeURI`:

```js run
let music = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Como podemos ver, `encodeURI` no codifica `&`, ya que este es un carácter legítimo en la URL como un todo.

Pero debemos codificar `&` dentro de un parámetro de búsqueda, de otra manera, obtendremos `q=Rock&Roll`- que es realmente `q=Rock` más algún parámetro `Roll` oscuro. No según lo previsto.

Así que debemos usar solo `encodeURIComponent`para cada parámetro de búsqueda, para insertarlo correctamente en el string URL. Lo más seguro es codificar tanto nombre como valor, a menos que estemos absolutamente seguros de que solo haya admitido caracteres

````smart header="Diferencia de codificación comparado con `URL`" 
Las clases [URL](https://url.spec.whatwg.org/#url-class) y [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) están basadas en la especificación URI mas reciente: [RFC3986](https://tools.ietf.org/html/rfc3986), mientras que las funciones `encode*` están basadas en la versión obsoleta [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

Existen algunas diferencias, por ej. las direcciones IPv6 se codifican de otra forma:

```js run
// Url válida con dirección IPv6
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Como podemos ver, `encodeURI` reemplazó los corchetes `[...]`, eso es incorrecto, la razón es: las urls IPv6 no existían en el tiempo de RFC2396 (August 1998).

Tales casos son raros, las funciones `encode*` mayormente funcionan bien.
````
