# Encuentra la etiqueta completa

Escriba una expresión regular para encontrar la etiqueta `<style...>`. Debe coincidir con la etiqueta completa: puede no tener atributos `<style>` o tener varios de ellos `<style type="..." id="...">`.

...¡Pero la expresión regular no debería coincidir con `<styler>`!

Por ejemplo:

```js
let regexp = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
