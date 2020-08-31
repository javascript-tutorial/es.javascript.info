
# Rescribir usando async/await

<<<<<<< HEAD
Rescribir este código de ejemplo del capítulo <info:promise-chaining> usando `async/await` en vez de `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
