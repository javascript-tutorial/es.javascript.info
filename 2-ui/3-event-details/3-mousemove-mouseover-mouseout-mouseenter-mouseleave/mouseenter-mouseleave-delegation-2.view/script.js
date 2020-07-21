// Los elementos <td> bajo el maouse justo ahora(si es que hay)
let currentElem = null;

table.onmouseover = function(event) {
  // antes de ingresar un uevo elemento, el mouse siempre abandonará al anterior
  // si currentElem está establecido, no abandonamos el <td> anterior,
  // hay un mouseover dentro de él, ignoramos el evento
  if (currentElem) return;

  let target = event.target.closest('td');

  // si no hay movimientos dentro de un <td> - lo ignoramos
  if (!target) return;

  //si hay movimientos dentro de un <td>, pero afuera de una tabla(posiblemente en caso de tablas anidadas)
  // lo ignoramos
  if (!table.contains(target)) return;

  // ¡Genial! ingresamos a un nuevo <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // si estamos afuera de algún <td> ahora, entonces ignoramos el evento
  // pueden haber movimientos dentro de una tabla pero fuera de <td>,
  // por ejemplo: de un <tr> a otro <tr>
  if (!currentElem) return;

  // abandonamos el elemento – ¿pero hacia dónde? ¿podría ser hacia un descendiente?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // vamos a la cadena de padres y verificamos – si aún estamos dentro de currentElem
    // entonces hay una transición interna – la ignoramos
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // abandonamos el <td>.
  onLeave(currentElem);
  currentElem = null;
};

// algunas funciones para manejar entradas/salidas de un elemento
function onEnter(elem) {
  elem.style.background = 'pink';

  // lo mostramos en el área de texto
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // lo mostramos en el area de texto
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
