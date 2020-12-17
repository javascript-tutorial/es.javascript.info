Como podemos ver en el HTML/CSS, la barra de desplazamiento es un `<div>` con un fondo de color, que contiene un pasador: otro `<div>` con `position:relative`.

Para posicionar el pasador usamos `position:relative`, para proveer las coordenadas relativas a su padre, aquí es más conveniente que `position:absolute`.

En este caso implementamos un Arrastrar y Soltar horizontal limitado por el ancho.
