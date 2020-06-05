


1. Utilice una función wrapper (envoltura), de tipo arrow (flecha) para ser conciso:

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```


    Ahora obtiene `user` de variables externas y lo ejecuta de la manera normal.

2. O cree una función parcial desde `user.login` que use `user` como contexto y tenga el primer argumento correcto:



    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
