function topSalary(salarios) {

  let max = 0;
  let maxName = null;

  for(const [nombre, salario] of Object.entries(salarios)) {
    if (max < salario) {
      max = salario;
      maxName = nombre;
    }
  }

  return maxName;
}


