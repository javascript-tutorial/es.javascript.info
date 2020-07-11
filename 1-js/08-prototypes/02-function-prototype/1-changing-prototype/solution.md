
Respuestas:

1. `verdadero`. 

    La asignación a `Rabbit.prototype` configura `[[Prototype]]` para objetos nuevos, pero no afecta a los existentes. 

2. `falso`. 

    Los objetos se asignan por referencia. El objeto de `Rabbit.prototype` no está duplicado, sigue siendo un solo objeto referenciado tanto por `Rabbit.prototype` como por el `[[Prototype]]` de `rabbit`. 

    Entonces, cuando cambiamos su contenido a través de una referencia, es visible a través de la otra.

3. `verdadero`.

    Todas las operaciones `delete` se aplican directamente al objeto. Aquí `delete rabbit.eats` intenta eliminar la propiedad `eats` de `rabbit`, pero no la tiene. Entonces la operación no tendrá ningún efecto.

4. `undefined`.

    La propiedad `eats` se elimina del prototipo, ya no existe.
