<<<<<<< HEAD
// Envío de mensajes, un simple POST
=======
// Sending messages, a simple POST
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
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

<<<<<<< HEAD
// Recibir mensajes con sondeo largo
=======
// Receiving messages with long polling
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
<<<<<<< HEAD
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
=======
      // Connection timeout
      // happens when the connection was pending for too long
      // let's reconnect
      await subscribe();
    } else if (response.status != 200) {
      // Show Error
      showMessage(response.statusText);
      // Reconnect in one second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // Got message
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
