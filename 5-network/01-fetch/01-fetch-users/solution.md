
Para obtener un usuario tenemos que ejecutar el siguiente código: `fetch('https://api.github.com/users/USERNAME')`.

Si la respuesta contiene el status `200`, utilizamos el método `.json()` para leer el objeto JS.

Por el contrario, si el `fetch` falla o la respuesta no contiene un status 200, devolvemos `null` en el resultado del arreglo. 

Código: 

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Nota: la función `.then` está directamente vinculada al `fetch`. Por lo tanto, cuando se obtiene la respuesta se procede a ejecutar la función `.json()` inmediatamente en lugar de esperar a las otras peticiones.

Si en su lugar utilizáramos `await Promise.all(names.map(name => fetch(...)))` y llamamos a la función `.json()` sobre los resultados, entonces esperaríamos a que todas las peticiones fetch completen antes de obtener una respuesta. Al agregar `.json()` directamente en cada `fetch`, nos aseguramos de que las peticiones se procesen de manera independiente obteniendo una mejor respuesta en nuestra aplicación. 

Esto es un ejemplo de cómo la API de Promesas puede ser útil aunque mayormente se utilice `async/await`.
