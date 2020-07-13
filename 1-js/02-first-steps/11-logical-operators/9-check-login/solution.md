

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
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
} else {
    alert( "No te conozco" );
}
```

Nota las sangrías verticales dentro de los bloques `if`. Técnicamente no son necesarias, pero facilitan la lectura del código.
