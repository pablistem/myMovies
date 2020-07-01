let db = require("../database/models");

let genresController = {
    /*list: function(req, res) {
        db.Genre.findAll()
            .then(function(movies) {
                res.render("listadoPeliculas", {movies:movies})
            })
            .catch(function(error) {
                console.log(error)
            })
    },*/
    detail: function(req, res) {
        db.Genre.findByPk(req.params.id, {
            include: [{association: "movies"}]
        })
            .then(function(genre) {
                res.render("detalleGenero", {genre:genre});
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}

module.exports = genresController;