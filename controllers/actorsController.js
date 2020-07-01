let db = require("../database/models");

let actorsController = {
    list: function(req, res) {
        db.Actor.findAll()
            .then(function(actors) {
                res.render("listadoActores", {actors:actors})
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    detail: function(req, res) {
        db.Actor.findByPk(req.params.id, {
            include: [{association: "movies"}]
        })
            .then(function(actor) {
                res.render("detalleActor", {actor:actor});
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    create: function(req, res) {
        db.Movie.findAll()
            .then(function(movies) {
                return res.render("creacionActores", {movies:movies});
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    store: function(req, res) {
        db.Actor.create({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            rating: req.body.rating,
            favorite_movie_id: req.body.pelicula_favorita
        });

        res.redirect("/actors");
    },
    edit: function(req, res) {
        let pedidoActor = db.Actor.findByPk(req.params.id);

        let pedidoPeliculas = db.Movie.findAll();

        Promise.all([pedidoActor, pedidoPeliculas])
            .then(function([actor, movies]) {
                res.render("editarActor", {actor: actor, movies: movies})
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    update: function(req, res) {
        db.Actor.update({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            rating: req.body.rating,
            favorite_movie_id: req.body.pelicula_favorita
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/actors/detail/" + req.params.id);
    },
    destroy: function(req, res) {
        //console.log(req.params.id)
        db.Actor.findByPk(req.params.id, {
            include: ['movies']
        })
        .then(function(actor) {
            //console.log(actor)
            let moviesIds = []
            //console.log(actor.Movie)
            actor.movies.forEach(function(movie) {
                //console.log(movie)
                moviesIds.push(movie.id)
            });
            actor.removeMovies(moviesIds)
            
            db.Actor.destroy({
                where: {
                    id: actor.id
                }
            })
        })
        .catch(function(error){
            console.log(error)
        })
        /*db.Actor.destroy({
            where: {
                id: req.params.id
            }
        })*/

        res.redirect("/actors");
    },
    add: function(req, res) {
        let pedidoActores = db.Actor.findAll();

        let pedidoPeliculas = db.Movie.findAll();

        Promise.all([pedidoActores, pedidoPeliculas])
            .then(function([actors, movies]) {
                res.render("nuevaActuacion", {actors: actors, movies: movies})
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    join: function(req, res) {
        //let actor = req.body.actor;
        //console.log(actor)

        //let movie = req.body.pelicula;
        //console.log(movie)
        //console.log(req.body.actor)
        //console.log(req.body.pelicula)
        db.Actor.findByPk(req.body.actor, {
            include:['movies']
        })
            .then(function(actor) {
                actor.addMovies(req.body.pelicula);

                res.redirect('/actors/detail/' + actor.id);
            })
            .catch(function(error) {
                console.log(error)
            })

        /*db.Actor.create({
            //id: req.body.actor,
            //actor_id: req.body.actor,
            Movie: [
                {
                    //id: req.body.pelicula,
                    actor_movie: {
                        actor_id: req.body.actor,
                        movie_id: req.body.pelicula
                    }
                }
            ]//smovie_id: req.body.pelicula
        }, {
            include: db.Movie
        });

        res.redirect("/actors");*/
    }
}

module.exports = actorsController;