
<<<<<<< HEAD
# Reescribir "rethrow" con async/await
=======
# Rewrite "rethrow" with async/await
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

Debajo puedes encontrar el ejemplo "rethrow" del capítulo <info:promise-chaining>. Rescríbelo usando `async/await` en vez de `.then/catch`.

Y deshazte de la recursión en favor de un bucle en `demoGithubUser`: con `async/await`, que se vuelve fácil de hacer.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

// Pide nombres hasta que github devuelve un usuario válido
function demoGithubUser() {
  let name = prompt("Ingrese un nombre:", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Nombre completo: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No existe tal usuario, por favor reingrese.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
