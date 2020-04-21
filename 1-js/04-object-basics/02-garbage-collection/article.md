# Garbage Collection

La gestión de la memoria en JavaScript se realiza de forma automática e invisible para nosotros. Creamos datos primitivos, objetos, funciones... Todo lo que requiere memoria.

¿Qué sucede cuando algo no se necesita más? ¿Cómo hace el motor de JavaScript para encontrarlo y limpiarlo?

## Alcance

El concepto principal del manejo de memoria en JavaScript es *alcance*.

Simple, los valores "alcanzables" son aquellos que son accesibles o se pueden utilizar de alguna manera. Se garantiza que se guardarán en la memoria.

1. Hay un conjunto base de valores inherentemente accesibles, que no se pueden eliminar por razones obvias.
 
    Por ejemplo:
    - Variables locales y parámetros de la función actual.
    - Variables y parámetros para otras funciones en la cadena actual de llamadas anidadas.
    - Variables Globales
    - (Hay algunos otros internos también)

    Estos valores se llaman *roots*.

2. Cualquier otro valor se considera accesible si es accesible desde una raíz(root) por una referencia o por una cadena de referencias.

Por ejemplo, si hay un objeto en una variable local, y ese objeto tiene una propiedad que hace referencia a otro objeto, ese objeto se considera accesible. Y aquellos a los que hace referencia también son accesibles. Ejemplos detallados a seguir.

Hay un proceso en segundo plano en el motor de JavaScript que se llama [recolector de basura] (https://es.wikipedia.org/wiki/Recolector_de_basura). Monitorea todos los objetos y elimina aquellos que se han vuelto inalcanzables.

## Un ejemplo sencillo

Aquí va el ejemplo más simple:

```js
// El usuario tiene una referencia al objeto
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Aquí la flecha representa una referencia de objeto. La variable global `"user"` hace referencia al objeto `{name: "John"}` (le llamaremos John por brevedad). La propiedad `"name"`' de John almacena un dato primitivo, por lo que está pintada dentro del objeto.

Si se sobrescribe el valor de `user`, se pierde la referencia:

```js
user = null;
```

![](memory-user-john-lost.svg)

Ahora John se vuelve inalcanzable. No hay forma de acceder a él, no hay referencias a él. El recolector de basura desechará los datos y liberará la memoria.

## Dos referencias

Ahora imaginemos que copiamos la referencia de `user` a `admin`:

```js
// `user` tiene una referencia al objeto
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Ahora si hacemos lo mismo
```js
user = null;
```

...Entonces el objeto todavía es accesible a través de la variable global `admin`, por lo que está en la memoria. Si también sobrescribimos `admin`, entonces se puede eliminar.

## Objetos entrelazados

Ahora un ejemplo más complejo. La familia:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```
La función `marry` "casa" dos objetos dándoles referencias entre sí y devuelve un nuevo objeto que los contiene a ambos.
La estructura de memoria resultante:

![](family.svg)

A partir de ahora, todos los objetos son accesibles.

Ahora borremos estas dos referencias:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

No es suficiente eliminar solo una de estas dos referencias, porque todos los objetos aún serían accesibles.

Pero si eliminamos a ambos, entonces podemos ver que John ya no tiene referencias entrantes:

![](family-no-father.svg)

Las referencias salientes no importan. Solo los entrantes pueden hacer que un objeto sea accesible. Entonces, John ahora es inalcanzable y será eliminado de la memoria con todos sus datos que también se volvieron inaccesibles.

Después de la recolección de basura:

![](family-no-father-2.svg)

## Isla inalcanzable

Es posible que toda la isla de objetos interconectados se vuelva inalcanzable y se elimine de la memoria.

El objeto fuente es el mismo que el anterior. Entonces:

```js
family = null;
```

La imagen en memoria se convierte en:

![](family-no-family.svg)

Este ejemplo demuestra cuán importante es el concepto de alcance.

Es obvio que John y Ann todavía están vinculados, ambos tienen referencias entrantes. Pero eso no es suficiente.

El antiguo objeto `"family"` se ha desvinculado de la raíz(root), ya no se hace referencia a él, por lo que toda la isla se vuelve inalcanzable y se eliminará.

## Algoritmos internos

El algoritmo básico de recolección de basura se llama "marcar y barrer"(mark-and-sweep).

Los siguientes pasos de "recolección de basura" se realizan regularmente:

- El recolector de basura toma raíces y las "marca" (recuerda).
- Luego visita y "marca" todas las referencias de ellos.
- Luego visita los objetos marcados y marca *sus* referencias. Todos los objetos visitados son recordados, para no visitar el mismo objeto dos veces en el futuro.
- ... Y así sucesivamente hasta que haya referencias no visitadas (accesibles desde las raíces).
- Todos los objetos, excepto los marcados, se eliminan.

Por ejemplo, deja que nuestra estructura de objeto se vea así:

![](garbage-collection-1.svg)

Podemos ver claramente una "isla inalcanzable" al lado derecho. Ahora veamos cómo maneja el recolector de basura "marcar y barrer"(mark-and-sweep).

El primer paso marca las raíces:

![](garbage-collection-2.svg)

Luego se marcan sus referencias:

![](garbage-collection-3.svg)

... Y sus referencias, mientras sea posible:

![](garbage-collection-4.svg)

Ahora los objetos que no se pudieron visitar en el proceso se consideran inalcanzables y se eliminarán:

![](garbage-collection-5.svg)

Ese es el concepto de cómo funciona la recolección de basura.

Los motores de JavaScript aplican muchas optimizaciones para que se ejecute más rápido y no afecte la ejecución.

Algunas de las optimizaciones

- **Colección generacional** -- 
los objetos se dividen en dos conjuntos: "nuevos" y "antiguos". Aparecen muchos objetos, hacen su trabajo y mueren rápido, se pueden limpiar agresivamente. Aquellos que sobreviven el tiempo suficiente, se vuelven "viejos" y son examinados con menos frecuencia.
- **Colección incremental** -- Si hay muchos objetos y tratamos de caminar y marcar todo el conjunto de objetos a la vez, puede llevar algún tiempo e introducir retrasos visibles en la ejecución. Entonces el motor intenta dividir la recolección de basura en pedazos. Luego las piezas se ejecutan una por una, por separado. Eso requiere una contabilidad adicional entre ellos para rastrear los cambios, pero tenemos muchos pequeños retrasos en lugar de uno grande.
- **Recolección de tiempo inactivo** -- el recolector de basura trata de ejecutarse solo mientras la CPU está inactiva, para reducir el posible efecto en la ejecución.

Hay otras optimizaciones y tipos de algoritmos de recolección de basura. Por mucho que me gustaría describirlos aquí, tengo que esperar, porque diferentes motores implementan diferentes ajustes y técnicas. Y, lo que es aún más importante, las cosas cambian a medida que se desarrollan los motores, por lo que probablemente no vale la pena profundizar "por adelantado", sin una necesidad real. A menos que, por supuesto, sea una cuestión de puro interés, a continuación habrá algunos enlaces para tí.

## Resumen

Los principales puntos a saber:

- El Recolector de Basura es ejecutado automáticamente. No lo podemos forzar o prevenir.
- Los objetos se retienen en la memoria mientras son accesibles.
- Ser referenciado no es lo mismo que ser accesible (desde una raíz): un conjunto de objetos interconectados pueden volverse inalcanzables como un todo.

Los motores modernos implementan algoritmos avanzados de recolección de basura.

Un libro general "The Garbage Collection Handbook: The Art of Automatic Memory Management" (R. Jones et al) cubre algunos de ellos.

Si estás familiarizado con la programación de bajo nivel, la información más detallada sobre el recolector de basura V8 se encuentra en el artículo [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection).

[V8 blog](http://v8project.blogspot.com/) también publica artículos sobre cambios en la administración de memoria de vez en cuando. Naturalmente, para aprender la recolección de basura, es mejor que se prepare aprendiendo sobre los componentes internos de V8 en general y lea el blog de [Vyacheslav Egorov](http://mrale.ph) que trabajó como uno de los ingenieros de V8. Estoy diciendo: "V8", porque se cubre mejor con artículos en Internet. Para otros motores, muchos enfoques son similares, pero la recolección de basura difiere en muchos aspectos.
El conocimiento profundo de los motores es bueno cuando necesita optimizaciones de bajo nivel. Sería prudente planificar eso como el siguiente paso después de que esté familiarizado con el idioma.
