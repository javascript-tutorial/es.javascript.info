

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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
} else {
    alert( "No te conozco" );
}
```

Nota las sangrías verticales dentro de los bloques `if`. Técnicamente no son necesarias, pero facilitan la lectura del código.
