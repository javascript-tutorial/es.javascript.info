

```js run demo
let userName = prompt("Quién está ahí?", "");

if (userName == "Admin") {
    
    let pass = prompt("Contraseña?", "");

<<<<<<< HEAD
    if (pass == "TheMaster") {
	alert( "Bienvenido!" );
    } else if (pass == "" || pass == null) {
	alert( "Cancelado." );
    } else {
	alert( "Contraseña incorrecta" );
    }
	
} else if (userName == "" || userName == null) {
    alert( "Canceledo" );
=======
  let pass = prompt('Password?', '');

  if (pass == 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass == '' || pass == null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName == '' || userName == null) {
  alert( 'Canceled' );
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
} else {
    alert( "No te conozco" );
}
```

Nota las sangrías verticales dentro de los bloques `if`. Técnicamente no son necesarias, pero facilitan la lectura del código.
