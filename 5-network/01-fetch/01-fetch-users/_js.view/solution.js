
async function obtenerUsuarios(nombresUsuarios) {
  let jobs = [];

  for(let nombre of nombresUsuarios) {
    let job = fetch(`https://api.github.com/users/${nombre}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let resultados = await Promise.all(jobs);

  return resultados;
}
