**My Movies**
  =======
**CRUD y relaciones**

---
**Comentarios:**

- Puedo pasar **release_date** con el formato adecuado a la vista de edici�n de la pel�cula.

- Puedo borrar peliculas y actores contemplando sus respectivas asociaciones.

- En los modelos, **Actor** y **Movie**, agregu�, en la definici�n de las asociaciones **N:M** la l�nea de c�digo:
`onDelete: "cascade"`
Pero no supe si tuvo efecto en el funcionamiento general o como deberia aplicarse. 

- En los modelos, **Actor** y **Movie**, quisiera agregar en la definici�n de las asociaciones **N:M** la l�nea de c�digo:
`onUpdate: "cascade"`
�Cu�l es el efecto de aplicar esta l�nea de c�digo? 
�C�mo debe implementarse?. 

- Creo que falta manipular en controladores y vistas, los errores que llegan desde **express-validator**.

---

**Problemas:**
  
- Cuando creo una pel�cula, redirecciono a pel�culas, pero la nueva pel�cula **no** ve reflejada en la vista, tengo que **refrescar** la vista.

- Cuando creo un actor, redirecciono a actores, pero el nuevo actor **no** ve reflejado en la vista, tengo que **refrescar** la vista.

- Cuando creo una asociaci�n entre actor y pel�cula, redirecciono al detalle actor, pero la nueva asociaci�n **no** ve reflejada en el detalle del actor, tengo que **refrescar** la vista.
