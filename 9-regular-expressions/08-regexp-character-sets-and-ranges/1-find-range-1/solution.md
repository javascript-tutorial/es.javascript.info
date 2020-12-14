Respuestas: **no, si**.

- En el script `subject:Java` no coincide con nada, porque `pattern:[^script]` significa "cualquier carácter excepto los dados". Entonces, la expresión regular busca `"Java"` seguido de uno de esos símbolos, pero hay un final de cadena, sin símbolos posteriores.

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD
- Sí, porque la sección `pattern:[^script]` en parte coincide con el carácter `"S"`. No está en `pattern:script`. Como el regexp distingue entre mayúsculas y minúsculas (sin flag `pattern:i`), procesa a `"S"` como un carácter diferente de `"s"`.
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
