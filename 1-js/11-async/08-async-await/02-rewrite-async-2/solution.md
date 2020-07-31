
No hay trampas aquí. Simplemente reemplaza `.catch` con `try...catch` dentro de `demoGithubUser` y agregar `async/await` donde sea necesario:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Ingrese un nombre:", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop continues after the alert
        alert("No existe tal usuario, por favor reingrese.");
      } else {
        // unknown error, rethrow
        throw err;
      }
    }      
  }


  alert(`Nombre completo: ${user.name}.`);
  return user;
}

demoGithubUser();
```
