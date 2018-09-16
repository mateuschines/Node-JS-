const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');
const {authenticationMiddleware} = require('../utils/token');

/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   controller.cadastro
 * );
 *******/

router.get('/',
        authenticationMiddleware,
        (request, response) => {
    controller.getTodos(request, response);
});

router.post('/',
        (request, response) => {
    controller.cadastro(request, response);
});

router.post('/login',
        (request, response) => {
    controller.login(request, response);
}); 

router.get('/:id',
        authenticationMiddleware,
        (request, response) => {
    controller.buscaPorId(request, response);
});

router.put('/:id',
        authenticationMiddleware,
        (request, response) => {
    controller.edicao(request, response);
});


module.exports = router;
