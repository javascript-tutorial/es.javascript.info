importance: 5

---

# createTextNode vs innerHTML vs textContent

Tenemos un elemento DOM vacio `elem` y un string `text`.

¿Cuáles de estos 3 comandos harán exactamente lo mismo?

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
