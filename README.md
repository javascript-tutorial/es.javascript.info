# The Modern JavaScript Tutorial in Spanish

This repository hosts the translation of <https://javascript.info> in Spanish.

Please help us to make the translation better.

<<<<<<< HEAD
- See the [issue](https://github.com/javascript-tutorial/es.javascript.info/issues) named "Translate Progress".
- Choose an unchecked article you'd like to translate.
- Create an issue to inform the maintainer that you're translating it.
- Fork the repository, translate and send a PR when done.

🎉 Thank you!

Your name and the contribution size will appear in the "About project" page when the translation gets published.

P.S. The full list of languages can be found at <https://github.com/javascript-tutorial/translate>.
=======
We'd like to make the tutorial available in many languages. Please help us to translate.

Here's the list of existing ongoing translations (in alphabetical order):

| Language | Github | Translation leads | Translated (%) | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last&nbsp;Commit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Published |
|----------|--------|-------------------|----------------|-------------|-----------|
| Azerbaijani | [orkhan-huseyn/javascript-tutorial-az](https://github.com/orkhan-huseyn/javascript-tutorial-az) | @orkhan-huseyn | ![](http://stats.javascript.info/translate/az.svg) | ![](https://img.shields.io/github/last-commit/orkhan-huseyn/javascript-tutorial-az.svg?maxAge=900&label=) |  |
| Chinese | [xitu/javascript-tutorial-zh](https://github.com/xitu/javascript-tutorial-zh) | @leviding | ![](http://stats.javascript.info/translate/zh.svg) | ![](https://img.shields.io/github/last-commit/xitu/javascript-tutorial-zh.svg?maxAge=900&label=) | [zh.javascript.info](https://zh.javascript.info) |
| French | [HachemiH/javascript-tutorial-fr](https://github.com/HachemiH/javascript-tutorial-fr) | @HachemiH | ![](http://stats.javascript.info/translate/fr.svg) | ![](https://img.shields.io/github/last-commit/HachemiH/javascript-tutorial-fr.svg?maxAge=900&label=) | |
| Japanese | [KenjiI/javascript-tutorial-ja](https://github.com/KenjiI/javascript-tutorial-ja) | @KenjiI | ![](http://stats.javascript.info/translate/ja.svg) | ![](https://img.shields.io/github/last-commit/KenjiI/javascript-tutorial-ja.svg?maxAge=900&label=) | [ja.javascript.info](https://ja.javascript.info) |
| Korean | [Violet-Bora-Lee/javascript-tutorial-ko](https://github.com/Violet-Bora-Lee/javascript-tutorial-ko) | @Violet-Bora-Lee | ![](http://stats.javascript.info/translate/ko.svg) | ![](https://img.shields.io/github/last-commit/Violet-Bora-Lee/javascript-tutorial-ko.svg?maxAge=900&label=) |  |
| Persian (Farsi) | [mehradsadeghi/javascript-tutorial-fa](https://github.com/mehradsadeghi/javascript-tutorial-fa) | @mehradsadeghi | started | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) | |
| Polish | [krzmaciek/javascript-tutorial-pl](https://github.com/krzmaciek/javascript-tutorial-pl) | @krzmaciek | ![](http://stats.javascript.info/translate/pl.svg) | ![](https://img.shields.io/github/last-commit/krzmaciek/javascript-tutorial-pl.svg?maxAge=900&label=) |  |
| Romanian | [lighthousand/javascript-tutorial-ro](https://github.com/lighthousand/javascript-tutorial-ro) | @lighthousand | ![](http://stats.javascript.info/translate/ro.svg) | ![](https://img.shields.io/github/last-commit/lighthousand/javascript-tutorial-ro.svg?maxAge=900&label=) |  |
| Russian | [iliakan/javascript-tutorial-ru](https://github.com/iliakan/javascript-tutorial-ru) | @iliakan | * . | ![](https://img.shields.io/github/last-commit/iliakan/javascript-tutorial-ru.svg?maxAge=900&label=) | [learn.javascript.ru](https://learn.javascript.ru) |
| Turkish | [sahinyanlik/javascript-tutorial-tr](https://github.com/sahinyanlik/javascript-tutorial-tr) | @sahinyanlik | ![](http://stats.javascript.info/translate/tr.svg) | ![](https://img.shields.io/github/last-commit/sahinyanlik/javascript-tutorial-tr.svg?maxAge=900&label=) | |
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## Structure

<<<<<<< HEAD
Every chapter, an article or a task resides in its own folder.

The folder is named `N-url`, where `N` – is the number for sorting (articles are ordered), and `url` is the URL-slug on the site.

The folder has one of files:

- `index.md` for a section,
- `article.md` for an article,
- `task.md` for a task formulation (+`solution.md` with the solution text if any).
=======
**If you'd like to translate it into your language:**

1. First, check if the translation has already started in the list above or in issues. If it exists, contact the original lead, ask him  to join efforts. If the translation is stalled, ask him to transfer the repo to you or just create a new one and continue from where they stopped.
2. If there's no such translation, create a new one. Clone the repository, change its name to `javascript-tutorial-<lang>` (by your language) and [create an issue](https://github.com/iliakan/javascript-tutorial-en/issues/new) for me to add you to the list.

**You can edit the text in any editor.** The tutorial uses enhanced "markdown" format, easy to grasp. And if you want to see how it looks on-site, there's a server to run the tutorial locally at <https://github.com/iliakan/javascript-tutorial-server>.  
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

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

The server is at <https://github.com/javascript-tutorial/server>. 
