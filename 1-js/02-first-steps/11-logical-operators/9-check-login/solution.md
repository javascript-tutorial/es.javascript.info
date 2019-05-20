

```js run demo
let userName = prompt("Quién está ahí?", "");

if (userName == "Admin") {

	let pass = prompt("Contraseña?", "");

	if (pass == "TheMaster") {
		alert( "Bienvenido!" );
	} else if (pass == "" || pass == null) {
		alert( "Cancelado." );
	} else {
		alert( "Contraseña incorrecta" );
	}
	
} else if (userName == "" || userName == null) {
	alert( "Canceledo" );
} else {
	alert( "No te conozco" );
}
```

Nota las sangrías verticales dentro de los bloques `if`. Técnicamente no son necesarias, pero facilitan la lectura del código.
