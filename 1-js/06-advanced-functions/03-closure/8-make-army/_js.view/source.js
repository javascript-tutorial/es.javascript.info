function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // función shooter
      alert( i ); // mostraría su número
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // en shooter para 0 mostraría 10
army[5](); // y el número 5 también mostraría 10...
// ... para todos los shooters muestra 10 en vez del suyo 0, 1, 2, 3...
*/
