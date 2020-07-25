importance: 3

---

# Haz los enlaces externos naranjas

Haz todos los enlaces externos de color orange alterando su propiedad `style`.

Un link es externo si:
- Su `href` tiene `://` 
- Pero no comienza con `http://internal.com`.

Ejemplo:

```html run
<a name="list">the list</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // establecer un estilo para un enlace
  let link = document.querySelector('a');
  link.style.color = 'orange';
</script>
```

El resultado podría ser:

[iframe border=1 height=180 src="solution"]
