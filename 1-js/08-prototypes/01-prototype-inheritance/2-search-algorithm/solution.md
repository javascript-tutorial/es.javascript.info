
1. Agreguemos `__proto__`:

    ```js run
    let head = {
      glasses: 1
    };

    let table = {
      pen: 3,
      __proto__: head
    };

    let bed = {
      sheet: 1,
      pillow: 2,
      __proto__: table
    };

    let pockets = {
      money: 2000,
      __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1
    alert( table.money ); // undefined
    ```

2. En los motores modernos, en términos de rendimiento, no hay diferencia si tomamos una propiedad de un objeto o su prototipo. Recuerdan dónde se encontró la propiedad y la reutilizan en la siguiente solicitud.

    Por ejemplo, para `pockets.glasses` recuerdan dónde encontraron `glasses` (en `head`), y la próxima vez buscarán allí. También son lo suficientemente inteligentes como para actualizar cachés internos si algo cambia, de modo que la optimización sea segura.
