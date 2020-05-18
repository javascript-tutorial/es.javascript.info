importance: 5

---

# Añadir toString al diccionario

Hay un objeto `dictionary`, creado como `Object.create(null)`, para almacenar cualquier par `clave/valor`.

Agrega el método `dictionary.toString()`, que debería devolver una lista de claves delimitadas por comas. Tu `toString` no debe aparecer al iterar un `for..in` sobre el objeto.

Así es como debería funcionar:

```js
let dictionary = Object.create(null);

*!*
// tu código para agregar el método diccionario.toString 
*/!*

// agregar algunos datos
dictionary.apple = "Manzana";
dictionary.__proto__ = "prueba"; // __proto__ es una clave de propiedad regular aquí

// solo manzana y __proto__ están en el ciclo
for(let key in dictionary) {
  alert(key); // "manzana", despues "__proto__"
}  

// tu toString en accion
alert(dictionary); // "manzana,__proto__"
```
