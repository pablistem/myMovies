var express = require('express');
var router = express.Router();
var genresController = require('../controllers/genresController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*
router.get('/', genresController.list);
*/
router.get('/detail/:id', genresController.detail);
/*
router.get('/create', genresController.create);
router.post('/create', [], genresController.store);

router.get('/edit/:id', genresController.edit);
router.post('/edit/:id', [
  check('titulo'),
  check('premios'),
  check('duracion'),
  check('rating'),
  check('fecha_estreno')
], genresController.update);

router.post('/delete/:id', genresController.destroy);
*/
module.exports = router;
