let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');

let fileServer = new static.Server('.');

let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on('close', function() {
    delete subscribers[id];
  });

}

function publish(message) {

  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message);
  }

  subscribers = Object.create(null);
}

function accept(req, res) {
  let urlParsed = url.parse(req.url, true);

<<<<<<< HEAD
  // El nuevo cliente quiere mensajes
=======
  // new client wants messages
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  }

<<<<<<< HEAD
  // enviando un mensaje
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // aceptar POST
=======
  // sending a message
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // accept POST
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
    req.setEncoding('utf8');
    let message = '';
    req.on('data', function(chunk) {
      message += chunk;
    }).on('end', function() {
<<<<<<< HEAD
      publish(message); // publicarlo para todos
=======
      publish(message); // publish it to everyone
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
      res.end("ok");
    });

    return;
  }

<<<<<<< HEAD
  // el resto es estático
=======
  // the rest is static
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
  fileServer.serve(req, res);

}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
<<<<<<< HEAD
  console.log('Servidor que se ejecuta en el puerto 8080');
=======
  console.log('Server running on port 8080');
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
} else {
  exports.accept = accept;

  if (process.send) { 
     process.on('message', (msg) => {
       if (msg === 'shutdown') {
         close();
       }
     });
  }

  process.on('SIGINT', close);
}
