# Carga de archivos reanudable

Con el método `fetch` es bastante fácil cargar un archivo.

¿Cómo reanudar la carga de un archivo despues de perder la conexión? No hay una opción incorporada para eso, pero tenemos las piezas para implementarlo.

Las cargas reanudables deberían venir con indicación de progreso, ya que esperamos archivos grandes (Si necesitamos reanudar). Entonces, ya que `fetch` no permite rastrear el progreso de carga, usaremos [XMLHttpRequest](info:xmlhttprequest).

## Evento de progreso poco útil

Para reanudar la carga, necesitamos saber cuánto fue cargado hasta la pérdida de la conexión.

Disponemos de `xhr.upload.onprogress` para rastrear el progreso de carga.

Desafortunadamente, esto no nos ayudará a reanudar la descarga, Ya que se origina cuando los datos son *enviados*, ¿pero fue recibida por el servidor? el navegador no lo sabe.

Tal vez fue almacenada por un proxy de la red local, o quizá el proceso del servidor remoto solo murió y no pudo procesarla, o solo se perdió en el medio y no alcanzó al receptor.

Es por eso que este evento solo es útil para mostrar una barra de progreso bonita.

Para reanudar una carga, necesitamos saber *exactamente* el número de bytes recibidos por el servidor. Y eso solo lo sabe el servidor, por lo tanto haremos una solicitud adicional.

## Algoritmos

1. Primero, crear un archivo id, para únicamente identificar el archivo que vamos a subir:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    Eso es necesario para reanudar la carga, para decirle al servidor lo que estamos reanudando.

    Si el nombre o tamaño de la última fecha de modificación cambia, entonces habrá otro `fileId`.

2. Envía una solicitud al servidor, preguntando cuántos bytes tiene, así:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // El servidor tiene tanta cantidad de bytes
    let startByte = +await response.text();
    ```

    Esto asume que el servidor rastrea archivos cargados por el encabezado `X-File-Id`. Debe ser implementado en el lado del servidor.

    Si el archivo no existe aún en el servidor, entonces su respuesta debe ser `0`.

3. Entonces, podemos usar el método `Blob` `slice` para enviar el archivo desde `startByte`:
    ```js
    xhr.open("POST", "upload", true);

    // Archivo, de modo que el servidor sepa qué archivo subimos
    xhr.setRequestHeader('X-File-Id', fileId);

    // El byte desde el que estamos reanudando, así el servidor sabe que estamos reanudando
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
    };

    // El archivo puede ser de input.files[0] u otra fuente
    xhr.send(file.slice(startByte));
    ```

    Aquí enviamos al servidor ambos archivos id como `X-File-Id`, para que de esa manera sepa que archivos estamos cargando, y el byte inicial como `X-Start-Byte`, para que sepa que no lo estamos cargando inicialmente, si no reanudándolo.

    El servidor debe verificar sus registros, y si hubo una carga de ese archivo, y si el tamaño de carga actual es exactamente `X-Start-Byte`,  entonces agregarle los datos.


Aquí esta la demostración con el código tanto del cliente como del servidor, escrito en Node.js.

Esto funciona solo parcialmente en este sitio, ya que Node.js esta detrás de otro servidor llamado Nginx, que almacena cargas, pasándolas a Node.js cuando esta completamente lleno.

Pero puedes cargarlo y ejecutarlo localmente para la demostración completa:

[codetabs src="upload-resume" height=200]

Como podemos ver, los métodos de red modernos estan cerca de los gestores de archivos en sus capacidades -- control sobre header, indicador de progreso, enviar partes de archivos, etc.

Podemos implementar la carga reanudable y mucho mas.
