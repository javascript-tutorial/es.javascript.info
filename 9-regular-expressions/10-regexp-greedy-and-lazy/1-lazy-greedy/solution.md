
El resultado es: `match:123 4`.

Primero el perezoso `pattern:\d+?` trata de tomar la menor cantidad de dígitos posible, pero tiene que llegar al espacio, por lo que toma `match:123`.

Después el segundo `\d+?` toma solo un dígito, porque es sufuciente.
