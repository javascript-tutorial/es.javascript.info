importance: 5

---

# ¿Por que necesitamos el origen (Origin)?

Como seguramente ya sepas, existe la cabecera HTTP `Referer`, la cual por lo general contiene la url del sitio que generó la solicitud.

Por ejemplo, cuando solicitamos la url `http://google.com` desde `http://javascript.info/alguna/url`, las cabeceras se ven de este modo:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/alguna/url
*/!*
```

Tal como se puede ver, tanto `Referer` como `Origin` están presentes.

Las preguntas:

1. ¿Por qué la cabecera `Origin` es necesaria, si `Referer` contiene incluso más información?
2. ¿Es posible que no se incluya `Referer` u `Origin`, o que contengan datos incorrectos?
