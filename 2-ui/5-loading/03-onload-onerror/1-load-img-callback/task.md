importance: 4

---

# Cargando imágenes con una un función de retorno (`callback`)

Normalmente, las imágenes son cargadas cuando son creadas. Entonces, cuando nosotros agregamos `<img>` a la página el usuario no ve la imágen inmediatamente. El navegador necesita cargarlo primero.

Para mostrar una imágen inmediatamente, podemos crearlo "en avance", como esto:

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

El navegador comienza a cargar la imágen y lo guarda en el cache. Después cuando la misma imágen aparece en el documento (no importa cómo) la muestra inmediatamente.

**Crear una función `preloadImages(sources, callback)` que cargue todas las imágenes desde una lista de fuentes (`sources`) y, cuando estén listas, ejecutar la función de retorno (`callback`).**

Por ejemplo: esto puede mostrar una alerta (`alert`) después de que la imágen sea cargada:

```js
function loaded() {
  alert("Imágenes cargadas")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

En caso de un error, la función debería seguir asumiendo que la imágen ha sido "cargada".

En otras palabras, la función de retorno (`callback`) es ejecutada cuando todas las imágenes han sido cargadas o no.

La función es útil, por ejemplo, cuando planeamos mostrar una galería con muchas imágenes desplazables y estar seguros de que todas las imágenes están cargadas. 

En el documento fuente puedes encontrar enlaces para probar imágenes y también el código para verificar si han sido cargadas o no. Debería devolver `300`.
