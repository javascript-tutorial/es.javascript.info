# Polyfills

El lenguaje JavaScript evoluciona constantemente. Nuevas propuestas al lenguaje aparecen regularmente, son analizadas y, si se consideran valiosas, se agregan a la lista en <https://tc39.github.io/ecma262/> y luego avanzan hasta [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Equipos detr�s de int�rpretes (engines) de JavaScript tienen sus propias ideas sobre que implementar primero. Pueden decidir implementar propuestas que est�n en borrador y posponer cosas que ya est�n en la especificaci�n, por qu� son menos interesantes o simplemente m�s dif�ciles de hacer.

Por lo tanto, es bastante com�n para un int�rprete implementar solo la parte del est�ndar.

Una buena p�gina para ver el estado actual de soporte para caracter�sticas del lenguaje es <https://kangax.github.io/compat-table/es6/> (es grande, todav�a tenemos mucho que aprender).

## Babel

Cuando usamos caracter�sticas modernas del lenguaje, puede que algunos int�rpretes no soporten dicho c�digo. Como hemos dicho, no todas las caracter�sticas est�n implementadas en todas partes.

Aqu� Babel viene al rescate.

[Babel](https://babeljs.io) es un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). Reescribe c�digo JavaScript moderno en el est�ndar anterior.

En realidad, hay dos partes en Babel:

1. Primero, el programa transpiler, que reescribe c�digo. El desarrollador lo ejecuta en su propio ordenador. Reescribe el c�digo al viejo est�ndar. Y entonces el c�digo es entregado al navegador para los usuarios. Proyectos modernos para construcci�n de sistemas como [webpack](http://webpack.github.io/) o [brunch](http://brunch.io/), proporcionan medios para ejecutar el transpiler autom�ticamente en cada cambio al c�digo, de modo que no implique ninguna perdida de tiempo de nuestra parte.

2. Segundo, el polyfill.

    El transpiler reescribe el c�digo, por lo que se cubren las caracter�sticas de la sintaxis. Pero para funciones nuevas tenemos que escribir un script especial que las implemente. JavaScript es un lenguaje muy din�mico, puede que los scripts no solo agreguen nuevas funciones, pero que tambi�n modifiquen las funciones incorporadas, para que act�en de forma correspondiente al est�ndar moderno.

    Existe el t�rmino "polyfill" para scripts que "llenan"(fill in) el vac�o y agregan las implementaciones que faltan.

    Dos polyfills interesantes son:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) que soporta mucho, pero es muy grande.
    - [polyfill.io](http://polyfill.io) servicio que nos permite cargar/construir polyfills bajo demanda, dependiendo de las caracter�sticas que necesitemos.

As� que, si queremos usar caracter�sticas modernas del lenguaje, el transpiler y polyfill son necesarios.

## Ejemplos en el tutorial


````online
La mayor�a de ejemplos se pueden ejecutar en el sitio, as�:

```js run
alert('Presione el bot�n "Play" en la esquina superior derecha para ejecutar');
```

Ejemplos que usan JS moderno solo funcionar�n si tu navegador lo soporta.
````

```offline
Como est�s leyendo la veri�n offline, en PDF los ejemplos no se pueden ejecutar. En EPUB algunos pueden ejecutarse.
```

Generalmente, Google Chrome est� actualizado con las �ltimas caracter�sticas del lenguaje, funciona bien para ejecutar demos con tecnolog�a puntera sin ning�n transpiler, pero otros navegadores modernos tambi�n funcionan bien.
