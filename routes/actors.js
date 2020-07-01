var express = require('express');
var router = express.Router();
var actorsController = require('../controllers/actorsController');
const { check, validatorResult, body } = require('express-validator');


router.get('/', actorsController.list);

router.get('/detail/:id', actorsController.detail);

router.get('/create', actorsController.create);
router.post('/create', [
  check('nombre').isLength({ min: 2, max:60 }).withMessage('El nombre del actor debe tener entre 2 y 60 caracteres'),
  
  check('apellido').isLength({ min: 2, max:60 }).withMessage('El apellido del actor debe tener entre 2 y 60 caracteres'),
  
  check('rating').isNumeric().withMessage('Debe ingresar un número'),
  body('rating').custom((number) => {
    return number >= 0 && number <= 10;
  }).withMessage('El número debe ser entre 0 y 10, inclusive')
], actorsController.store);

router.get('/edit/:id', actorsController.edit);
router.put('/edit/:id', [
  check('nombre').isLength({ min: 2, max:60 }).withMessage('El nombre del actor debe tener entre 2 y 60 caracteres'),
  
  check('apellido').isLength({ min: 2, max:60 }).withMessage('El apellido del actor debe tener entre 2 y 60 caracteres'),
  
  check('rating').isNumeric().withMessage('Debe ingresar un número'),
  body('rating').custom((number) => {
    return number >= 0 && number <= 10;
  }).withMessage('El número debe ser entre 0 y 10, inclusive')
  //check('fecha_estreno')*/
], actorsController.update);

router.delete('/delete/:id', actorsController.destroy);

router.get('/add', actorsController.add);
router.post('/add', actorsController.join);

module.exports = router;