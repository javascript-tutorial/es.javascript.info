let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // on drag start (inicio del arrastre):  
  //   recordar el desplazamiento inicial
  //   hacer el elemento position:fixed, hijo directo de body y moverlo
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // cambiar a coordenadas absolutas al final, para fijar el elemento en el documento
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // new window-relative coordinates
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // verifica si las nuevas coordenadas están debajo del borde inferior de la ventana
    let newBottom = newY + dragElement.offsetHeight; // nueva base

    // ¿debajo de la ventana?, desplacemos la página
    if (newBottom > document.documentElement.clientHeight) {
      // coordenadas relativas a la ventana del fin de documento
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // desplazar hacia abajo el documento en 10px tiene un problema
      // puede desplazarse más allá del fin del documento
      // Math.min(cuánto faltapara el final, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // los cálculos son imprecisos, puede haber errores de redondeo que hagan un desplazamiento hacia arriba
      // eso no debe ser posible, corrijámoslo aquí
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // un movimiento rápido del mouse puede poner el cursor después del final del documento
      // si ocurre,
      // limitar el nuevo "Y" al máximo posible (justo en la base del documento)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // verificar si las nuevas coordenadas están arriba del borde superior de la ventana (lógica similar a la previa)
    if (newY < 0) {
      // desplazamiento hacia arriba
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // corrige errores de precisión

      window.scrollBy(0, -scrollY);
      // un movimiento rápido del mouse puede poner el cursor más allá del principio del documento
      newY = Math.max(newY, 0); // newY no puede ser menor a 0
    }


    // limita el nuevo "X" dentro de los límites de la ventana
    // aquí no hay desplazamiento, entonces es simple
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
