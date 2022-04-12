const {check, body} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('El campo es obligatorio'),

    check('email')
    .notEmpty().withMessage('El campo es obligatorio').bail()
    .isEmail().withMessage('Debes ingresar un email válido'),

    check('backgroundColor')
    .notEmpty().withMessage('Debes seleccionar un color'),
    
    check('age')
    .notEmpty().withMessage('Debes ingresar tu edad').bail()
    .isNumeric().withMessage('Debe ingresar un numero')
]