
# Reescribe con funciones de flecha

<<<<<<< HEAD:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md
Reemplace las expresiones de función con funciones de flecha en el código a continuación:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
