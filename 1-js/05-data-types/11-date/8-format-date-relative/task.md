importance: 4

---

# Cambia el formato a fecha relativa

Escribe una función `formatDate(date)` que muestre la fecha en el siguiente formato:

- Si a partir de la fecha `date` pasó menos de 1 segundo, debe devolver `"ahora mismo"`.
- De no ser así, si a partir de la fecha `date` pasó menos de 1 minuto, debe retornar `"hace n seg,"`.
- De no ser así, si pasó menos de una hora, debe retornar `"hace n min."`.
- De no ser así, debe retornar la fecha completa en el formato `"DD.MM.AA HH:mm"`. Es decir: `"día.mes.año horas:minutos"`, cada uno de ellos en formato de 2 dígitos, por ej. `31.12.16 10:00`.

For instance:

```js
alert( formatDate(new Date(new Date - 1)) ); // "ahora mismo"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "hace 30 seg."

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "hace 5 min."

// la fecha de ayer en formato 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
