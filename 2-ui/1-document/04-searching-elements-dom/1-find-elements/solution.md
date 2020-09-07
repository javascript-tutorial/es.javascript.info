Hay muchas maneras de resolverlo.

Aquí hay algunas de ellas:

```js
// 1. La tabla con `id="age-table"`.
let table = document.getElementById('age-table')

// 2. Todos los elementos `label` dentro de esa tabla
table.getElementsByTagName('label')
// or
document.querySelectorAll('#age-table label')

<<<<<<< HEAD
// 3. El primer `td` en la tabla (con la palabra "Age")
=======
// 3. The first td in that table (with the word "Age")
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
table.rows[0].cells[0]
// or
table.getElementsByTagName('td')[0]
// or
table.querySelector('td')

<<<<<<< HEAD
// 4. El `form` con name="search"
// suponiendo que sólo hay un elemento con name="search" en el documento
=======
// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
let form = document.getElementsByName('search')[0]
//o, utilizando el form específicamente
document.querySelector('form[name="search"]')

// 5. El primer input en el form.
form.getElementsByTagName('input')[0]
// o
form.querySelector('input')

<<<<<<< HEAD
// 6. El último input en el form. 
let inputs = form.querySelectorAll('input') // encontrar todos los inputs
inputs[inputs.length-1] // obtener el último
=======
// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```
