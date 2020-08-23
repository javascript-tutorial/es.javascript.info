// Envío de mensajes, un simple POST
function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// Recibir mensajes con sondeo largo
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // El tiempo de conexión expiró
      // sucede cuando la conexión estuvo pendiente durante demasiado tiempo
      // vamos a reconectarnos
      await subscribe();
    } else if (response.status != 200) {
      // Mostrar Error
      showMessage(response.statusText);
      // Volver a conectar en un segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Tengo un mensaje
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
