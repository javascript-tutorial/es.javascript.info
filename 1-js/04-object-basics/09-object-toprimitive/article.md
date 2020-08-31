
<<<<<<< HEAD
# Conversión de objeto a valor primitivo

¿Qué sucede cuando los objetos se suman `obj1 + obj2`, se restan `obj1 - obj2` o se imprimen utilizando `alert(obj)`?

En ese caso, los objetos se convierten automáticamente en valores primitivos, y luego se lleva a cabo la operación.

En el capítulo <info:type-conversions>, hemos visto las reglas para las conversiones de valores primitivos numéricos, strings y booleanos. Pero dejamos un hueco en los objetos. Ahora, como sabemos sobre métodos y símbolos, es posible completarlo.

1. Todos los objetos son `true` en un contexto booleano. Solo hay conversiones numéricas y de strings.
2. La conversión numérica ocurre cuando restamos objetos o aplicamos funciones matemáticas. Por ejemplo, los objetos de tipo `Date` (que se cubrirán en el capítulo <info:date>) se pueden restar, y el resultado de `date1 - date2` es la diferencia horaria entre dos fechas.
3. En cuanto a la conversión de strings : generalmente ocurre cuando imprimimos un objeto como en `alert(obj)` y en contextos similares.

## ToPrimitive

Podemos ajustar la conversión de tipo string y numérica, utilizando métodos especiales del objeto.

Hay tres variantes de conversión de tipos, denominadas "sugerencias", que se describen en la [especificación](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: Para una conversión de objeto a string, cuando hacemos una operación que espera un string en un objeto, como `alert`:

    ```js
    // salida
    alert(obj);

    // utilizando un objeto como clave
=======
# Object to primitive conversion

What happens when objects are added `obj1 + obj2`, subtracted `obj1 - obj2` or printed using `alert(obj)`?

In that case, objects are auto-converted to primitives, and then the operation is carried out.

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives. But we left a gap for objects. Now, as we know about methods and symbols it becomes possible to fill it.

1. All objects are `true` in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, `Date` objects (to be covered in the chapter <info:date>) can be subtracted, and the result of `date1 - date2` is the time difference between two dates.
3. As for the string conversion -- it usually happens when we output an object like `alert(obj)` and in similar contexts.

## ToPrimitive

We can fine-tune string and numeric conversion, using special object methods.

There are three variants of type conversion, so-called "hints", described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive):

`"string"`
: For an object-to-string conversion, when we're doing an operation on an object that expects a string, like `alert`:

    ```js
    // output
    alert(obj);

    // using object as a property key
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
    anotherObj[obj] = 123;
    ```

`"number"`
<<<<<<< HEAD
: Para una conversión de objeto a número, como cuando hacemos operaciones matemáticas:

    ```js
    // conversión explícita
    let num = Number(obj);

    // matemáticas (excepto + binario)
    let n = +obj; // + unario
    let delta = date1 - date2;

    // comparación menor que / mayor que
=======
: For an object-to-number conversion, like when we're doing maths:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
    let greater = user1 > user2;
    ```

`"default"`
<<<<<<< HEAD
: Ocurre en casos raros cuando el operador "no está seguro" de qué tipo esperar.

    Por ejemplo, el operador binario `+` puede funcionar con strings (los concatena) y números (los suma), por lo que tanto los strings como los números servirían. Entonces, si el + binario obtiene un objeto como argumento, utiliza la sugerencia `"default"` para convertirlo.

    También, si un objeto es comparado utilizando `==` con un string, un número o un símbolo, tampoco está claro qué conversión se debe realizar, por lo que se utiliza la sugerencia `"default"`.

    ```js
    // + binario utiliza la sugerencia "default"
    let total = obj1 + obj2;

    // obj == número utiliza la sugerencia "default"
    if (user == 1) { ... };
    ```

    Los operadores de comparación mayor que y menor que, como `<` `>`, también pueden funcionar con strings y números. Aún así, utilizan la sugerencia `"number"`, y no `"default"`. Eso es por razones históricas.

    Sin embargo, en la práctica, no necesitamos recordar estos detalles peculiares, porque todos los objetos incorporados excepto un caso (el objeto `Date`, lo aprenderemos más adelante) implementan la conversión `"default"` de la misma manera que `"number"`. Y podemos hacer lo mismo.

```smart header="No hay sugerencia `\"boolean\"`"
Tenga en cuenta : Solo hay tres sugerencias. Es así de simple.

No hay ninguna sugerencia "boolean" (todos los objetos son `true` en el contexto booleano) ni nada más. Y si tratamos `"default"` y `"number"` de la misma manera, como lo hacen la mayoría de las funciones incorporadas, entonces solo hay dos conversiones.
```

**Para realizar la conversión, JavaScript intenta buscar y llamar a tres métodos del objeto:**

1. Llamar a `obj[Symbol.toPrimitive](hint)` : el método con la clave simbólica `Symbol.toPrimitive` (símbolo del sistema), si tal método existe,
2. En caso contrario, si la sugerencia es `"string"`
    - intentar `obj.toString()` y `obj.valueOf()`, lo que exista.
3. En caso contrario, si la sugerencia es `"number"` o `"default"`
    - intentar `obj.valueOf()` y `obj.toString()`, lo que exista.

## Symbol.toPrimitive

Empecemos por el primer método. Hay un símbolo incorporado llamado `Symbol.toPrimitive` que debe utilizarse para nombrar el método de conversión, así:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // debe regresar un valor primitivo
  // hint = uno de "string", "number", "default"
};
```

Por ejemplo, aquí el objeto `user` lo implementa:
=======
: Occurs in rare cases when the operator is "not sure" what type to expect.

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them), so both strings and numbers would do. So if a binary plus gets an object as an argument, it uses the `"default"` hint to convert it.

    Also, if an object is compared using `==` with a string, number or a symbol, it's also unclear which conversion should be done, so the `"default"` hint is used.

    ```js
    // binary plus uses the "default" hint
    let total = obj1 + obj2;

    // obj == number uses the "default" hint
    if (user == 1) { ... };
    ```

    The greater and less comparison operators, such as `<` `>`, can work with both strings and numbers too. Still, they use the `"number"` hint, not `"default"`. That's for historical reasons.

    In practice though, we don't need to remember these peculiar details, because all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And we can do the same.

```smart header="No `\"boolean\"` hint"
Please note -- there are only three hints. It's that simple.

There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.
```

**To do the conversion, JavaScript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` - the method with the symbolic key `Symbol.toPrimitive` (system symbol), if such method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Let's start from the first method. There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // must return a primitive value
  // hint = one of "string", "number", "default"
};
```

For instance, here `user` object implements it:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
<<<<<<< HEAD
    alert(`sugerencia: ${hint}`);
=======
    alert(`hint: ${hint}`);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

<<<<<<< HEAD
// demostración de conversiones:
alert(user); // sugerencia: string -> {name: "John"}
alert(+user); // sugerencia: number -> 1000
alert(user + 500); // sugerencia: default -> 1500
```

Como podemos ver en el código, `user` se convierte en un string autodescriptivo o en una cantidad de dinero dependiendo de la conversión. Un único método `user[Symbol.toPrimitive]` maneja todos los casos de conversión.
=======
// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

As we can see from the code, `user` becomes a self-descriptive string or a money amount depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a


## toString/valueOf

<<<<<<< HEAD
Los métodos `toString` y `valueOf` provienen de la antigüedad. No son símbolos (los símbolos no existían en aquel tiempo), sino métodos "regulares" nombrados con strings. Proporcionan una forma alternativa "al viejo estilo" de implementar la conversión.

Si no hay `Symbol.toPrimitive`, JavaScript intenta encontrar las sugerencias e intenta en este orden:

- `toString -> valueOf` para la sugerencia "string".
- `valueOf -> toString` en caso contrario.

Estos métodos deben devolver un valor primitivo. Si `toString` o `valueOf` devuelve un objeto, entonces se ignora (lo mismo que si no hubiera un método).

De forma predeterminada, un objeto simple tiene los siguientes métodos `toString` y `valueOf`:

- El método `toString` devuelve un string `"[object Object]"`.
- El método `valueOf` devuelve el objeto en sí.

Aquí está la demostración:
=======
Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

If there's no `Symbol.toPrimitive` then JavaScript tries to find them and try in the order:

- `toString -> valueOf` for "string" hint.
- `valueOf -> toString` otherwise.

These methods must return a primitive value. If `toString` or `valueOf` returns an object, then it's ignored (same as if there were no method).

By default, a plain object has following `toString` and `valueOf` methods:

- The `toString` method returns a string `"[object Object]"`.
- The `valueOf` method returns the object itself.

Here's the demo:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {name: "John"};

alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

<<<<<<< HEAD
Por lo tanto, si intentamos utilizar un objeto como un string, como en un `alert` o algo así, entonces por defecto vemos `[object Object]`.

Y el `valueOf` predeterminado se menciona aquí solo en favor de la integridad, para evitar confusiones. Como puede ver, devuelve el objeto en sí, por lo que se ignora. No me pregunte por qué, es por razones históricas. Entonces podemos asumir que no existe.

Implementemos estos métodos.

Por ejemplo, aquí `user` hace lo mismo que el ejemplo anterior utilizando una combinación de `toString` y `valueOf` en lugar de `Symbol.toPrimitive`:
=======
So if we try to use an object as a string, like in an `alert` or so, then by default we see `[object Object]`.

And the default `valueOf` is mentioned here only for the sake of completeness, to avoid any confusion. As you can see, it returns the object itself, and so is ignored. Don't ask me why, that's for historical reasons. So we can assume it doesn't exist.

Let's implement these methods.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf` instead of `Symbol.toPrimitive`:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {
  name: "John",
  money: 1000,

<<<<<<< HEAD
  // para sugerencia="string"
=======
  // for hint="string"
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
  toString() {
    return `{name: "${this.name}"}`;
  },

<<<<<<< HEAD
  // para sugerencia="number" o "default"
=======
  // for hint="number" or "default"
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

<<<<<<< HEAD
Como podemos ver, el comportamiento es el mismo que en el ejemplo anterior con `Symbol.toPrimitive`.

A menudo queremos un único lugar "general" para manejar todas las conversiones primitivas. En este caso, podemos implementar solo `toString`, así:
=======
As we can see, the behavior is the same as the previous example with `Symbol.toPrimitive`.

Often we want a single "catch-all" place to handle all primitive conversions. In this case, we can implement `toString` only, like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

<<<<<<< HEAD
En ausencia de `Symbol.toPrimitive` y `valueOf`, `toString` manejará todas las conversiones primitivas.

## Tipos de devolución

Lo importante que debe saber acerca de todos los métodos de conversión primitiva es que no necesariamente devuelven la primitiva "sugerida".

No hay control sobre si `toString` devuelve exactamente un string, o si el método `Symbol.toPrimitive` devuelve un número para una sugerencia `"number"`.

Lo único obligatorio: estos métodos deben devolver un valor primitivo, no un objeto.

```smart header="Notas históricas"
Por razones históricas, si `toString` o `valueOf` devuelve un objeto, no hay ningún error, pero dicho valor se ignora (como si el método no existiera). Esto se debe a que en la antigüedad no existía un buen concepto de "error" en JavaScript.

Por el contrario, `Symbol.toPrimitive` *debe* devolver un valor primitivo, en caso contrario habrá un error.
```

## Más conversiones

Como ya sabemos, muchos operadores y funciones realizan conversiones de tipo, por ejemplo la multiplicación `*` convierte operandos en números.

Si pasamos un objeto como argumento, entonces hay dos etapas:
1. El objeto se convierte en un valor primitivo (utilizando las reglas descritas anteriormente).
2. Si el valor primitivo resultante no es del tipo correcto, se convierte.

Por ejemplo:

```js run
let obj = {
  // toString maneja todas las conversiones en ausencia de otros métodos
=======
In the absence of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.

## Return types

The important thing to know about all primitive-conversion methods is that they do not necessarily return the "hinted" primitive.

There is no control whether `toString` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint `"number"`.

The only mandatory thing: these methods must return a primitive, not an object.

```smart header="Historical notes"
For historical reasons, if `toString` or `valueOf` returns an object, there's no error, but such value is ignored (like if the method didn't exist). That's because in ancient times there was no good "error" concept in JavaScript.

In contrast, `Symbol.toPrimitive` *must* return a primitive, otherwise there will be an error.
```

## Further conversions

As we know already, many operators and functions perform type conversions, e.g. multiplication `*` converts operands to numbers.

If we pass an object as an argument, then there are two stages:
1. The object is converted to a primitive (using the rules described above).
2. If the resulting primitive isn't of the right type, it's converted.

For instance:

```js run
let obj = {
  // toString handles all conversions in the absence of other methods
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj * 2); // 4, objeto convertido a valor primitivo "2", luego la multiplicación lo convirtió en un número
```

1. La multiplicación `obj * 2` primero convierte el objeto en valor primitivo (que es un string `"2"`).
2. Luego `"2" * 2` se convierte en `2 * 2` (el string se convierte en número).

El `+` binario concatenará los strings en la misma situación, ya que acepta con gusto un string:
=======
alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
```

1. The multiplication `obj * 2` first converts the object to primitive (that's a string `"2"`).
2. Then `"2" * 2` becomes `2 * 2` (the string is converted to number).

Binary plus will concatenate strings in the same situation, as it gladly accepts a string:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let obj = {
  toString() {
    return "2";
  }
};

<<<<<<< HEAD
alert(obj + 2); // 22 ("2" + 2), la conversión a valor primitivo devolvió un string => concatenación
```

## Resumen

La conversión de objeto a valor primitivo es llamada automáticamente por muchas funciones y operadores incorporados que esperan un valor primitivo.

Hay 3 tipos (sugerencias) de esto:
- `"string"` (para `alert` y otras operaciones que necesitan un string)
- `"number"` (para matemáticas)
- `"default"` (pocos operadores)

La especificación describe explícitamente qué operador utiliza qué sugerencia. Hay muy pocos operadores que "no saben qué esperar" y utilizan la sugerencia `"default"`. Por lo general, para los objetos incorporados, la sugerencia `"default"` se maneja de la misma manera que `"number"`, por lo que en la práctica los dos últimos a menudo se combinan.

El algoritmo de conversión es:

1. Llamar a `obj[Symbol.toPrimitive](hint)` si el método existe,
2. En caso contrario, si la sugerencia es `"string"`
    - intentar `obj.toString()` y `obj.valueOf()`, lo que exista.
3. En caso contrario, si la sugerencia es `"number"` o `"default"`
    - intentar `obj.valueOf()` y `obj.toString()`, lo que exista.

En la práctica, a menudo es suficiente implementar solo `obj.toString()` como un método "general" para todas las conversiones que devuelven una representación "legible por humanos" de un objeto, con fines de registro o depuración.
=======
alert(obj + 2); // 22 ("2" + 2), conversion to primitive returned a string => concatenation
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"` (for `alert` and other operations that need a string)
- `"number"` (for maths)
- `"default"` (few operators)

The specification describes explicitly which operator uses which hint. There are very few operators that "don't know what to expect" and use the `"default"` hint. Usually for built-in objects `"default"` hint is handled the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for all conversions that return a "human-readable" representation of an object, for logging or debugging purposes.  
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
