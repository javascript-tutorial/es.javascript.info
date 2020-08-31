# Esquinas externas

Las esquinas externas son básicamente las que obtenemos de [elem.getBoundingClientRect()](https://developer.mozilla.org/es/docs/Web/API/Element/element.getBoundingClientRect).

Las coordenadas de la esquina superior izquierda `answer1` y la esquina inferior derecha `answer2`:

```js
let coords = elem.getBoundingClientRect();

let answer1 = [coords.left, coords.top];
let answer2 = [coords.right, coords.bottom];
```

# Esquina interna y superior izquierda

Esta es diferente a la esquina externa por el ancho del borde. Una manera confiable de obtener la distancia es usando `clientLeft/clientTop`:

```js
let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Esquina interna e inferior derecha

En nuestro caso necesitamos sustraer la medida del borde de las coordenadas externas.

Podemos usar la forma de CSS:

```js
let answer4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth),
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
];
```

Una forma alternativa puede ser agregando `clientWidth/clientHeight` a las coordenadas de la esquina superior izquierda. Probablemente sea incluso mejor:

```js
let answer4 = [
  coords.left + elem.clientLeft + elem.clientWidth,
  coords.top + elem.clientTop + elem.clientHeight
];
```
