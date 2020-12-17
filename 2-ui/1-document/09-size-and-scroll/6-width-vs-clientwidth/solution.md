Diferencias:

1. `clientWidth` es numérico, mientras `getComputedStyle(elem).width` retorna una cadena con `px` en el final.
2. `getComputedStyle` puede devolver un ancho no numérico como `"auto"` para un elemento en linea.
3. `clientWidth` es el contenido interior del área del elemento más los rellenos, mientras el ancho de CSS (con el estándar `box-sizing`) es el contenido interior del área *sin rellenos*.
4. Si hay una barra de desplazamiento y el navegador reserva espacio para esta, algunos navegadores restan ese espacio del ancho de CSS (por que no está disponible para el contenido), y otros no. La propiedad `clientWidth` es siempre la misma: el tamaño de la barra de desplazamiento se resta si está reservado.
