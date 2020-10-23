Necesitamos la cabecera `Origin`, ya que en algunos casos `Referer` no está presente. Por ejemplo, cuando realizamos un `fetch` a una página HTTP desde una HTTPS (acceder a un sitio menos seguro desde uno más seguro), en ese caso no tendremos el campo `Referer`.

La [Política de seguridad de contenido](http://en.wikipedia.org/wiki/Content_Security_Policy) puede prohibir el envío de `Referer`.

Como veremos, `fetch` tiene opciones con las que es posible evitar el envío de `Referer` e incluso permite su modificación (dentro del mismo sitio).

Por especificación, `Referer` es una cabecera HTTP opcional.

Por el hecho de que `Referer` no es confiable, la cabecera `Origin` ha sido creada. El navegador garantiza el envío correcto de `Origin` para las solicitudes de origen cruzado.
