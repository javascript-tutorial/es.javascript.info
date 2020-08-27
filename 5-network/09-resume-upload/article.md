# Carga de archivos reanudable

Con el metodo `fetch` es bastante facil cargar un archivo.

¿Como reanudar la carga de un archivo despues de perder la conección? No hay una opcion incorporada para eso, pero tenemos las piezas para implementarlo.

Las cargas reanudables deberian venir con indicacion de progreso, ya que esperamos archivos grandes (Si necesitamos reanudar). Entonces, ya que `fetch` no permite rastrear el progreso de carga, usaremos [XMLHttpRequest](info:xmlhttprequest).

## Evento de progreso poco util

Para reanudar la carga, necesitamos saber cuanto fue cargado hasta la perdida de la coneccion.

Disponemos de `xhr.upload.onprogress` para rastrear el progreso de carga.

Desafortunadamente, esto no nos ayudara a reanudar la descarga, Ya que se origina cuando los datos son *enviados*, ¿pero fue recivida por el servidor? el navegador no lo sabe.

Tal vez fue almacenada por un proxy de la red local, o quizá el proceso del servidor remoto solo murio y no pudo procesarla, o solo fue perdida en el medio y no alcanzo al receptor.

Es por eso que este evento solo es útil para mostrar una barra de progreso bonita.

Para resumir una carga, necesitamos saber *exactamente* el numero de bytes recibidos por el servidor. Y eso solo lo sabe el servidor, por lo tanto haremos una solicitud adicional.

## Algoritmos

1. Primero, crear un archivo id, para unicamente identificar el archivo que vamos a subir:
    ```js
    let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
    ```
    Eso es necesario para reanudar la carga, para decirle al servidor lo que estamos reanudando.

    Si el nombre o tamaño de la ultima fecha de modificacion cambia, entonces habrá otro `fileId`.

2. Envia una solicitud al servidor, preguntando cuantos bytes tiene, asi:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // El servidor tiene tanta cantidad de bytes
    let startByte = +await response.text();
    ```

    Esto asume que el servidor rastrea archivos cargados por el encabezado `X-File-Id`. Debe ser implementado en server-side.

    Si el archivo no existe aun en el servidor, entonces su respuesta debe ser `0`.

3. Then, we can use `Blob` method `slice` to send the file from `startByte`:
    ```js
    xhr.open("POST", "upload", true);

    // File id, so that the server knows which file we upload
    xhr.setRequestHeader('X-File-Id', fileId);

    // The byte we're resuming from, so the server knows we're resuming
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // file can be from input.files[0] or another source
    xhr.send(file.slice(startByte));
    ```

    Here we send the server both file id as `X-File-Id`, so it knows which file we're uploading, and the starting byte as `X-Start-Byte`, so it knows we're not uploading it initially, but resuming.

    The server should check its records, and if there was an upload of that file, and the current uploaded size is exactly `X-Start-Byte`, then append the data to it.


Here's the demo with both client and server code, written on Node.js.

It works only partially on this site, as Node.js is behind another server named Nginx, that buffers uploads, passing them to Node.js when fully complete.

But you can download it and run locally for the full demonstration:

[codetabs src="upload-resume" height=200]

As we can see, modern networking methods are close to file managers in their capabilities -- control over headers, progress indicator, sending file parts, etc.

We can implement resumable upload and much more.
