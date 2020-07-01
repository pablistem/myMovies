var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');
const { check, validatorResult, body } = require('express-validator');


router.get('/', moviesController.list);

router.get('/detail/:id', moviesController.detail);

router.get('/create', moviesController.create);
router.post('/create', [
  check('titulo').isLength({ min: 2, max:60 }).withMessage('El titulo de la pelicula debe tener entre 2 y 60 caracteres'),

  check('premios').isInt().withMessage('Debe ingresar un número entero'),
  body('premios').custom((number) => {
    return number >= 0;
  }).withMessage('El número debe ser mayor o igual a 0'),
  
  check('duracion').isInt().withMessage('Debe ingresar un número entero'),
  body('duracion').custom((number) => {
    return number >= 0 && number <= 500;
  }).withMessage('El número debe ser entre 0 y 500, inclusive'),

  check('rating').isNumeric().withMessage('Debe ingresar un número'),
  body('rating').custom((number) => {
    return number >= 0 && number <= 10;
  }).withMessage('El número debe ser entre 0 y 10, inclusive'),
  
], moviesController.store);

router.get('/edit/:id', moviesController.edit);
router.put('/edit/:id', moviesController.update);
router.post('/edit/:id', [
  check('titulo').isLength({ min: 2, max:60 }).withMessage('El título de la película debe tener entre 2 y 60 caracteres'),
  
  check('premios').isInt().withMessage('Debe ingresar un número entero'),
  body('premios').custom((number) => {
    return number >= 0;
  }).withMessage('El número debe ser mayor o igual a 0'),
  
  check('duracion').isInt().withMessage('Debe ingresar un número entero'),
  body('duracion').custom((number) => {
    return number >= 0 && number <= 500;
  }).withMessage('El número debe ser entre 0 y 500, inclusive'),
  
  check('rating').isNumeric().withMessage('Debe ingresar un número'),
  body('rating').custom((number) => {
    return number >= 0 && number <= 10;
  }).withMessage('El número debe ser entre 0 y 10, inclusive'),
  
  //check('fecha_estreno')
], moviesController.update);

router.delete('/delete/:id', moviesController.destroy);

module.exports = router;