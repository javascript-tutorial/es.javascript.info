# Fetch de usuarios de GitHub

Crear una función async llamada `getUsers(names)`, que tome como parámetro un arreglo de logins de GitHub, obtenga el listado de usuarios de GitHub indicado y devuelva un arreglo de usuarios de GitHub.

La url de GitHub con la información de usuario especifica `USERNAME` es: `https://api.github.com/users/USERNAME`.

En el ambiente de prueba (sandbox) hay un ejemplo de referencia. 

Detalles a tener en cuenta: 

1. Debe realizarse una única petición `fetch` por cada usuario.
2. Para que la información esté disponible lo antes posible las peticiones no deben ejecutarse de una por vez. 
3. Si alguna de las peticiones fallara o si el usuario no existiese, la función debe devolver `null` en el resultado del arreglo. 
