**My Movies**
  =======
**CRUD y relaciones**

---
**Comentarios:**

- Puedo pasar **release_date** con el formato adecuado a la vista de edición de la película.

- Puedo borrar peliculas y actores contemplando sus respectivas asociaciones.

- En los modelos, **Actor** y **Movie**, agregué, en la definición de las asociaciones **N:M** la línea de código:  
`onDelete: "cascade"`  
Pero no supe si tuvo efecto en el funcionamiento general o como deberia aplicarse. 

- En los modelos, **Actor** y **Movie**, quisiera agregar en la definición de las asociaciones **N:M** la línea de código:  
`onUpdate: "cascade"`  
¿Cuál es el efecto de aplicar esta línea de código?  
¿Cómo debe implementarse?. 

- Creo que falta manipular en controladores y vistas, los errores que llegan desde **express-validator**.

---

**Problemas:**
  
- Cuando creo una película, redirecciono a películas, pero la nueva película **no** ve reflejada en la vista, tengo que **refrescar** la vista.

- Cuando creo un actor, redirecciono a actores, pero el nuevo actor **no** ve reflejado en la vista, tengo que **refrescar** la vista.

- Cuando creo una asociación entre actor y película, redirecciono al detalle actor, pero la nueva asociación **no** ve reflejada en el detalle del actor, tengo que **refrescar** la vista.
