const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
const busboy = require('async-busboy');
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
<<<<<<< HEAD
    message: "Usuario registrado"
=======
    message: "User saved"
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
  };
});

router.post('/image-form', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
<<<<<<< HEAD
      // se lee todo el flujo del archivo para continuar
=======
      // read all file stream to continue
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });
    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `Imagen guardada, nombre: ${fields.firstName}, tamaño del archivo:${files[0].length}, nombre del archivo: ${files[0].filename}`
=======
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}`
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
  };
});


router.post('/user-avatar', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
<<<<<<< HEAD
      // se lee todo el flujo del archivo para continuar
=======
      // read all file stream to continue
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });

    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `Usuario con imagen, nombre: ${fields.firstName}, tamaño de la imagen:${files[0].length}`
=======
    message: `User with picture, firstName: ${fields.firstName}, picture size:${files[0].length}`
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
  };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
