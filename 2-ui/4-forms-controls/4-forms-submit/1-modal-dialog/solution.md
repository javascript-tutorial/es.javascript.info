Una ventana modal puede ser implementada utilizando un `<div id="cover-div">` semi-transparente que cubra completamente la ventana, como a continuación:

```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Debido a que el `<div>` cubre toda la ventana, recibe todos los clicks, en vez de la página tras él.

También podemos evitar el scroll en la página utilizando `body.style.overflowY='hidden'`.

El formulario no debe estar en el `<div>` sino junto a él, porque no queremos que tenga `opacity`.
