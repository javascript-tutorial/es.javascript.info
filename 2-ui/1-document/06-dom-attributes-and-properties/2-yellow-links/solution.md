
Primero, necesitamos encontrar todos los enlaces externos.

Hay dos.

El primero es encontrar todos los enlaces usando `document.querySelectorAll('a')` y luego filtrar lo que necesitamos:

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // no atributo

  if (!href.includes('://')) continue; // no protocolo

  if (href.startsWith('http://internal.com')) continue; // interno

  link.style.color = 'orange';
}
```

Tenga en cuenta: nosotros usamos `link.getAttribute('href')`. No `link.href`, porque necesitamos el valor del HTML.

...Otra forma más simple sería agregar las comprobaciones al selector CSS:

```js
// busque todos los enlaces que tengan: // en href
//pero href no comienza con http://internal.com
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
