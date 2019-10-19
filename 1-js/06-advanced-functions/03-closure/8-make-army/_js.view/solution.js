function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // función shooter
      alert( i ); // mostraría su número
    };
    shooters.push(shooter);
  }

  return shooters;
}
