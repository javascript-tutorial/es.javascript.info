# Comentarios

Como hemos aprendido en el cap�tulo <info:structure>, los comentarios pueden ser de una sola l�nea: comenzando con `//` y de m�ltiples l�neas: `/* ... */`.

Normalmente los usamos para describir c�mo y por qu� el c�digo funciona.

A primera vista, los comentarios pueden ser obvios, pero los principiantes en programaci�n generalmente los usan incorrectamente.

## Comentarios incorrectos

Principiantes tienden a utilizar los comentarios para explicar "lo que est� pasando en el c�digo". As�:

```js
// Este c�digo har� esto (...) y esto (...)
// ...y qui�n sabe qu� m�s...
c�digo;
muy;
complejo;
```

Pero en un buen c�digo, la cantidad de comentarios "explicativos" deber�a ser m�nima. En serio, el c�digo deber�a de ser f�cil de entender sin ellos.

Existe una fant�stica regla al respeto: "si el c�digo es tan poco claro que necesita un comentario, entonces tal vez deber�a reescribirse en su lugar".

### Receta: funciones externas

A veces es beneficioso reemplazar trozos de c�digo con funciones, como aqu�:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // comprobar si i es un n�mero primo
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

La mejor variante, con una funci�n externa `isPrime`:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Ahora podemos entender el c�digo f�cilmente. La propia funci�n se convierte en comentario. Este tipo de c�digo se le llama *auto descriptivo*.

### Receta: crear funciones

Y si tenemos una larga "hoja de c�digo" como esta:

```js
// aqu� a�adimos whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// aqu� a�adimos zumo
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Entonces, una versi�n mejor puede ser reescribirlo en funciones de esta manera:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

De nuevo, la propias funciones nos dicen que est� pasando. No hay nada que comentar. Y adem�s, la estructura del c�digo es mejor cuando esta dividida. Queda claro que hace cada funci�n, que necesita y que retorna.

En realidad, no podemos evitar totalmente los comentarios "explicativos". Existen algoritmos complejos. Y existen "trucos" ingeniosos con el prop�sito de optimizar. Pero generalmente, tenemos que intentar mantener el c�digo simple y auto descriptivo.

## Comentarios correctos

Entonces, los comentarios explicativos suelen ser incorrectos.�Qu� comentarios son correctos?

Describe la arquitectura
: Proporcionan una descripci�n general de alto nivel de los componentes, c�mo interact�an, cual es el flujo de control en diversas situaciones... En resumen -- la vista panor�mica del c�digo. Hay un lenguaje de diagramas especial [UML](https://es.wikipedia.org/wiki/Lenguaje_unificado_de_modelado) para diagramas de alto nivel. Definitivamente vale la pena estudiarlo.

Documenta la utilizaci�n de una funci�n
: Hay una sintaxis especial [JSDoc](https://en.wikipedia.org/wiki/JSDoc) para documentar una funci�n: utilizaci�n, par�metros, valor devuelto.

	Por ejemplo:
	```js
    /**
     * Devuelve x elevado a la potencia de n.
     *
     * @param {number} x El n�mero a elevar.
     * @param {number} n La potencia, debe ser un n�mero natural.
     * @return {number} x elevado a la potencia de n.
     */
    function pow(x, n) {
      ...
    }
    ```
	
	Estos tipos de comentarios nos permiten entender el prop�sito de la funci�n y como usarla de la manera correcta sin mirar su c�digo.
	
	Por cierto, muchos editores como [WebStorm](https://www.jetbrains.com/webstorm/) tambi�n pueden entenderlos y usarlos para proveer auto completado y alg�n tipo de verificaci�n autom�tica para el c�digo.
	
	Adem�s, existen herramientas como [JSDoc](https://github.com/jsdoc3/jsdoc) que pueden generar documentaci�n en formato HTML de los comentarios. Puedes leer m�s informaci�n sobre JSDoc aqu� <http://usejsdoc.org/>.
	
�Por qu� se resuelve de esa manera?
: Lo que est� escrito es importante. Pero lo que *no* est� escrito puede ser a�n m�s importante para entender que est� pasando. �Por qu� resuelven la tarea exactamente de esa manera? El c�digo no nos da ninguna respuesta.

	Si hay muchas maneras de resolver el problema, �por qu� esta? Especialmente cuando no es la m�s obvia.
	
	Sin dichos comentarios, las siguientes situaciones son posibles:
	1. Tu (o tu compa�ero) abres el c�digo escrito hace ya alg�n tiempo, y te das cuenta de que es "sub�ptimo".
	2. Piensas: "Que est�pido que era antes, y que inteligente que soy ahora", y lo reescribes utilizando la variante "m�s obvia y correcta".
	3. ...El impulso de reescribir era bueno. Pero en el proceso ves que la soluci�n "m�s obvia" en realidad falla. Incluso recuerdas vagamente el por qu�, por qu� ya lo intentaste hace mucho. Vuelves a la variante correcta pero has estado perdiendo el tiempo.
	
	Los comentarios que explican la soluci�n correcta son muy importantes. Nos ayudan a continuar el desarrollo de forma correcta.
	
�Alguna caracter�stica sutil del c�digo? �Donde se usan?
: Si el c�digo tiene algo sutil y contra intuitivo, definitivamente vale la pena comentarlo.

## Resumen

Una se�al importante de un buen desarrollador son los comentarios: su presencia e incluso su ausencia.

Los buenos comentarios nos permiten mantener bien el c�digo, volver despu�s de un retraso y usarlo de manera m�s efectiva.

**Comenta esto:**

- Arquitectura en general, vista de alto nivel.
- Utilizaci�n de funciones.
- Soluciones importantes, especialmente cuando no son inmediatamente obvias.

**Evita comentarios:**

- Que explican "como funciona el c�digo" y "que hace".
- Escribelos solo si es imposible escribir el c�digo de manera tan simple y auto descriptiva que no los necesite.

Los comentarios tambi�n son usados para herramientas de auto documentaci�n como JSDoc3: los leen y generan documentaci�n en HTML (o documentos en otros formatos).
