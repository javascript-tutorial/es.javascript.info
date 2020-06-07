# Bienvenidos nuevos contribuidores
Durante las dos primeras semanas de este mes de Junio nos encontraremos **actualizando y ordenando** este repositorio. Agradeceríamos que las contribuciones se realizaran posterior a la fecha indicada.

Si desea hacer seguimiento a este trabajo, le invitamos a que se una a nuestro servidor: [Discord](https://discord.gg/gBuzJb)

# El Tutorial Moderno de JavaScript en Español

# Como contribuir

## 1. Ingresar a la siguiente página: [es.javascript.info](https://github.com/javascript-tutorial/es.javascript.info/issues/17)

Buscar un artículo de la lista que no esté asignado a un usuario.

Por ejemplo: 

Type Conversions (@tikoflano) #57

Este artículo ya fue solicitado por el usuario @tikoflano y está en proceso de traducción o revisión. 

## 2. Solicitar un artículo

Antes de comenzar con la traducción del artículo deben realizar un comentario con el nombre exacto del artículo que deseas traducir. 

Recomendamos copiar y pegar el nombre del artículo para ayudar a nuestro bot reconocerlo y asignartelo a tu usuario.

## 3. Hacer el fork

Una vez que nuestro bot te haya asignado el artículo (lo verás con tu nombre de usuario) te pedimos que realices el fork del repositorio javascript-tutorial/es.javascript.info 

![alt text](https://i.imgur.com/HFMpAaw.png "fork")

Estamos trabajando en actualizar el repositorio y no todos los artículos están al día con la versión más reciente, por eso te pedimos que tomes como guía al artículo en el repositorio original (https://github.com/javascript-tutorial/en.javascript.info). 

En conclusión, el repositorio en Español debe quedar igual que el del Inglés, si faltan carpetas o archivos, debes crearlos.

## 4. Traducir el artículo

En este momento ya deberías haber realizado el fork y estar trabajando en tu propio repositorio:

tuUsuario/es.javascript.info

forked from javascript-tutorial/es.javascript.info

Comienza a editar el artículo haciendo click en el botón "Edit": 

![alt text](https://i.imgur.com/6HyzSeV.png "edit")

Si tienes dudas con respecto a la terminología, te recomendamos consultar MDN (https://developer.mozilla.org/es/docs/Web/JavaScript). MDN es un recurso muy valioso para nosotros ya que nos permite coordinar los términos que vamos a utilizar en nuestras traducciones. 

Esto lo hacemos más que nada para "ponernos de acuerdo" acerca de la terminología que vamos a usar en todos los artículos.

Otro recurso para consultar es la sección Translator Tips (https://github.com/javascript-tutorial/es.javascript.info#translation-tips) aquí se establecen algunos lineamientos y convenciones básicas para realizar la traducción.

También tenemos un canal en Discord donde nos puedes consultar cualquier duda que tengas. (https://discord.gg/Qf3bFnn) 

Te esperamos en Discord! Bienvenido a la comunidad!



___

###

This repository hosts the translation of <https://javascript.info> in Spanish.


**That's how you can contribute:**

- See the [Spanish Translate Progress](https://github.com/javascript-tutorial/es.javascript.info/issues/17) issue.
- Choose an unchecked article you'd like to translate.
- Add a comment with the article title to the issue, e.g. `An Introduction to JavaScript`.
    - Our bot will mark it in the issue, for everyone to know that you're translating it.
    - Your comment should contain only the title.
- Fork the repository, translate and send a PR when done.
    - PR title should match article title, the bot will write it's number into the issue.

Please kindly allow maintainers to review and merge or request changes in your translation.
   
If maintainers do not respond, or if you'd like to become a maintainer, write us at the [main repo](https://github.com/javascript-tutorial/en.javascript.info/issues/new).
    
**Let others know what you're translating, in message boards or chats in your language. Invite them to join!**

🎉 Thank you!

Your name and the contribution size will appear in the "About project" page when the translation gets published.

P.S. The full list of languages can be found at <https://javascript.info/translate>.

## Structure

Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

Please keep line breaks and paragraphs "as is": don't add newlines and don't remove existing ones. Makes it easy to merge future changes from the English version into the translation. 

If you see that the English version can be improved – great, please send a PR to it.

### Terms

- Some specification terms are not to be translated, e.g. "Function Declaration" can be left "as is".
- For other terms like `resolved promise`, `slash`, `regexp`, and so on look a good glossary, hopefully there's one for your language already.
    - If there's no dictionary, look for translations in manuals, such as [MDN](https://developer.mozilla.org/en-US/).

### Text in Code Blocks

- Translate comments.
- Translate user-messages and example strings.
- Don't translate variables, classes, identifiers.
- Ensure that the code works after the translation :)

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hola mundo';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

### External Links

If an external link is to Wikipedia, e.g. `https://en.wikipedia.org/wiki/JavaScript`, and a version of that article exists in your language that is of decent quality, link to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, a partially translated version is ok.

If a linked article has no translated version, leave the link "as is".

### Metadata

Some files, usually tasks, have YAML metadata at the top, delimited by `---`:

```md
importance: 5

---
...
```

Please don't translate "importance" (and other top metadata).

### Anchors

Some headers have `[#anchor]` at the end, e.g.

```md
## Spread operator [#spread-operator]
```

Please don't translate or remove the `[#...]` part, it's for URL anchors.

## Running locally

You can run the tutorial server locally to see how the translation looks.

The server and install instructions are at <https://github.com/javascript-tutorial/server>. 
