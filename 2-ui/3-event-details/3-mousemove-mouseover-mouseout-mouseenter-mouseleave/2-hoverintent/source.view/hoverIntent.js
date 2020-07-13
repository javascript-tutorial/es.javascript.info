'use strict';

// Aquí hay un breve sketch con la clase
// de cosas que vas a ocupar de cualquier forma
class HoverIntent {

  constructor({
    sensitivity = 0.1, // Velocidad menor a 0.1px/ms supone un "posicionamiento sobre el elemento"
    interval = 100, // Medida de la velocidad del mouse una vez por cada 100ms: cualcula la distancia entre el punto anterior y el actual
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // // Segurándonos de que "this" es el objeto en los controladores de eventos
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // Asignando los controladores
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // Continua trabajando desde este punto

  }

  onMouseOver(event) {
    /* ... */
  }

  onMouseOut(event) {
    /* ... */
  }

  onMouseMove(event) {
    /* ... */
  }


  destroy() {
    /* Tu código para "deshabilitar" la funcionalidad, remueve los controladores */
    /* Es necesario para que las pruebas funcionen*/
  }

}
