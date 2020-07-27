// Los elementos <td> bajo el maouse justo ahora(si es que hay)
let currentElem = null;

table.onmouseover = function(event) {
<<<<<<< HEAD
  // antes de ingresar un uevo elemento, el mouse siempre abandonará al anterior
  // si currentElem está establecido, no abandonamos el <td> anterior,
  // hay un mouseover dentro de él, ignoramos el evento
=======
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
  if (currentElem) return;

  let target = event.target.closest('td');

<<<<<<< HEAD
  // si no hay movimientos dentro de un <td> - lo ignoramos
  if (!target) return;

  //si hay movimientos dentro de un <td>, pero afuera de una tabla(posiblemente en caso de tablas anidadas)
  // lo ignoramos
  if (!table.contains(target)) return;

  // ¡Genial! ingresamos a un nuevo <td>
=======
  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
<<<<<<< HEAD
  // si estamos afuera de algún <td> ahora, entonces ignoramos el evento
  // pueden haber movimientos dentro de una tabla pero fuera de <td>,
  // por ejemplo: de un <tr> a otro <tr>
  if (!currentElem) return;

  // abandonamos el elemento – ¿pero hacia dónde? ¿podría ser hacia un descendiente?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // vamos a la cadena de padres y verificamos – si aún estamos dentro de currentElem
    // entonces hay una transición interna – la ignoramos
=======
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

<<<<<<< HEAD
  // abandonamos el <td>.
=======
  // we left the <td>. really.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
  onLeave(currentElem);
  currentElem = null;
};

<<<<<<< HEAD
// algunas funciones para manejar entradas/salidas de un elemento
function onEnter(elem) {
  elem.style.background = 'pink';

  // lo mostramos en el área de texto
=======
// any functions to handle entering/leaving an element
function onEnter(elem) {
  elem.style.background = 'pink';

  // show that in textarea
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

<<<<<<< HEAD
  // lo mostramos en el area de texto
=======
  // show that in textarea
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
