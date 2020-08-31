
# Reescribe con funciones de flecha

<<<<<<< HEAD:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md
Reemplace las expresiones de función con funciones de flecha en el código a continuación:
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md

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
