
# Rescribir usando async/await

<<<<<<< HEAD
Rescribir este código de ejemplo del capítulo <info:promise-chaining> usando `async/await` en vez de `.then/catch`:
=======
Rewrite this example code from the chapter <info:promise-chaining> using `async/await` instead of `.then/catch`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

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
