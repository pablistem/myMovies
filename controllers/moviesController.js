let db = require("../database/models");
let {Op} = require('sequelize');

let moviesController = {
    list: function(req, res) {
        db.Movie.findAll()
            .then(function(movies) {
                res.render("listadoPeliculas", {movies:movies})
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    detail: function(req, res) {
        db.Movie.findByPk(req.params.id, {
            include: [{association: "genre"}, {association: "actors"}]
        })
            .then(function(movie) {
                res.render("detallePelicula", {movie:movie});
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    create: function(req, res) {
        db.Genre.findAll()
            .then(function(generos) {
                return res.render("creacionPeliculas", {generos:generos});
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    store: function(req, res) {
        db.Movie.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });

        res.redirect("/movies");
    },
    edit: function(req, res) {
        let pedidoPelicula = db.Movie.findByPk(req.params.id);
        /*console.log(req.params.id)
        console.log(pedidoPelicula)
        console.log(pedidoPelicula.id)
        console.log(pedidoPelicula.release_date)
        const date = new Date(pedidoPelicula.release_date)
        console.log(date)
        //date.getFullYear() + '-' + date.getMonth()+1 + '-' + date.getDate()
        const format = (number) => number < 10 ? '0' + number : number
        //pedidoPelicula.release_date = `${format(date.getUTCMonth() + 1)}-${format(date.getUTCDate())}-${date.getUTCFullYear()}`
        pedidoPelicula.release_date = `${format(date.getUTCFullYear())}-${format(date.getUTCMonth() + 1)}-${format(date.getUTCDate())}`
        console.log(pedidoPelicula.release_date)*/
        let pedidoGeneros = db.Genre.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([movie, generos]) {
                //console.log(movie)
                //console.log(movie.release_date)
                const date = new Date(movie.release_date)
                //console.log(date)
                const format = (number) => number < 10 ? '0' + number : number
                //console.log(format)
                //movie.release_date = `${format(date.getUTCMonth() + 1)}-${format(date.getUTCDate())}-${date.getUTCFullYear()}`
                const toto = `${date.getUTCFullYear()}-${format(date.getUTCMonth() + 1)}-${format(date.getUTCDate())}`
                //console.log(toto)
                movie.release_date=toto
                //console.log(movie.release_date)
                res.render("editarPelicula", {movie: movie, generos: generos, toto,toto})
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    update: function(req, res) {
        db.Movie.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/movies/detail/" + req.params.id);
    },
    destroy: function(req, res) {
        db.Movie.findByPk(req.params.id, {
            include: ['actors'] //mal, cambiar por alias actors
        })
        .then(function(movie) {
            let actorsIds = []
            movie.actors.forEach(function(actor) { //mal Actor por alias actors y segundo movie por actor
                actorsIds.push(actor.id) //mal movie, cambiar por actor
            });
            movie.removeActors(actorsIds) //Movies, cambiar por Actors
            db.Movie.destroy({
                where: {
                    id: movie.id
                }
            })
        })
        .catch(function(error){
            console.log(error)
        })

        /*db.Movie.destroy({
            where: {
                id: req.params.id
            }
        });*/

        res.redirect("/movies");
    }
}

module.exports = moviesController;