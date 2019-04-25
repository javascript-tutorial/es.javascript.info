# The Modern JavaScript Tutorial in Spanish

This repository hosts the translation of <https://javascript.info> in Spanish.

Please help us to make the translation better.

- See the [Spanish Translate Progress](https://github.com/javascript-tutorial/es.javascript.info/issues/17) issue.
- Choose an unchecked article you'd like to translate.
- Add a comment to that issue to inform the maintainer that you're translating it.
- Fork the repository, translate and send a PR when done.

🎉 Thank you!

Your name and the contribution size will appear in the "About project" page when the translation gets published.

<<<<<<< HEAD
P.S. The full list of languages can be found at <https://github.com/javascript-tutorial/translate>.
=======
We'd also like to collaborate on the tutorial with other people.
>>>>>>> 8735adcb6f08d7b3f38992d8dd3dab301ca9e272

## Structure

<<<<<<< HEAD
Every chapter, an article or a task resides in its own folder.
=======
**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/javascript-tutorial/server>.  
>>>>>>> 8735adcb6f08d7b3f38992d8dd3dab301ca9e272

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).

A file starts with the `# Title Header`, and then the text in Markdown-like format, editable in a simple text editor. 

Additional resources and examples for the article or the task, are also in the same folder.

## Translation Tips

The translation doesn't have to be word-by-word precise. It should be technically correct and explain well.

If you see that the English version can be improved – great, please send a PR to it.

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

For links to MDN, that are only partially translated, also use the language-specific version.

If a linked article has no translated version, leave the link "as is".


## Running locally

You can run the tutorial locally, to immediately see the changes on-site.

<<<<<<< HEAD
The server is at <https://github.com/javascript-tutorial/server>. 
=======
---
💓  
Ilya Kantor @iliakan
>>>>>>> 8735adcb6f08d7b3f38992d8dd3dab301ca9e272
