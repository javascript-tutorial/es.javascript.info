Podemos usar dicho enfoque si estamos seguros de que la propiedad `"constructor"` tiene el valor correcto.

Por ejemplo, si no tocamos el `"prototype"` predeterminado, con seguridad el código funciona:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (funcionó!)
```

Funcionó, porque `User.prototype.constructor == User`.

..Pero si alguien, por así decirlo, sobrescribe `User.prototype` y olvida recrear `constructor` para hacer referencia a `User`, entonces fallaría.

Por ejemplo:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

¿Por qué `user2.name` es `undefined`?

Así es como funciona `new user.constructor('Pete')`:

1. Primero, busca a `constructor` en `user`. Nada.
2. Sigue la cadena con el prototipo. El prototipo de `user` es `User.prototype`, y tampoco tiene `constructor` (¡porque "olvidamos" configurarlo correctamente!).
3. Avanzando más en la cadena, `User.prototype` es un objeto simple, su prototipo es el `Object.prototype` incorporado. 
4. Finalmente, para el `Object.prototype` hay un `Object.prototype.constructor == Object`. Entonces es el que usa.

Como resultado, tenemos `let user2 = new Object('Pete')`. 

Probablemente no es lo que queremos. Buscábamos crear `new User`, no `new Object`. Este resultado se debe a la falta de  `constructor`.

(Solo por si eres curioso: la llamada `new Object(...)` convierte su argumento a un objeto. Esto en teoría, en la práctica nadie llama `new Object` con un valor, y generalmente no queremos usar `new Object` para crear objetos en absoluto).
