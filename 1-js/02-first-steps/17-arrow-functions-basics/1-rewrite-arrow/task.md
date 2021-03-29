
# Reescribe con funciones de flecha

Reemplace las expresiones de función con funciones de flecha en el código a continuación:

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes();
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
