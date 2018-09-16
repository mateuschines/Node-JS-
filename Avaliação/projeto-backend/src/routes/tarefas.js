const express = require('express');
const router = express.Router();

const {authenticationMiddleware} = require('../utils/token');
const validateSchema = require('./validateSchema');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   validateSchema(validateBody),
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/
router.post('/',
        authenticationMiddleware,
        (request, response) => {
    controller.cadastro(request, response);
});

router.get('/',
        authenticationMiddleware,
        (request, response) => {
    controller.listagem(request, response);
});

router.get('/:id',
        authenticationMiddleware,
        (request, response) => {
    controller.buscaPorId(request, response);
});

router.put('/:id/:acao?',
        authenticationMiddleware,
        (request, response) => {

    params = request.params;
    const {acao} = params;

    if (acao === 'concluida') {

        controller.marcarConcluida(request, response);

    } else {
        controller.edicao(request, response);
    }
});

router.delete('/:id/:acao?',
        authenticationMiddleware,
        (request, response) => {

    params = request.params;
    const {acao} = params;

    if (acao === 'concluida') {
        controller.desmarcarConcluida(request, response);
    } else {
        controller.remocao(request, response);
    }
});

module.exports = router;
