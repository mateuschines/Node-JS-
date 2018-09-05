const express = require('express');
const router = express.Router();

const validateSchema = require('./validateSchema');
const controller = require('../controllers/usuarios');


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

 const validateBody = {
    body();
  };

// POST - /usuarios
router.post('/api/usuarios',
  	validateSchema(validateBody),
    controller.cadastro
);

// GET - /usuarios/1
router.get('/:usuarioId', function (request, response) {
  const { params } = request
  const { usuarioId } = params

  Usuario.findById(usuarioId)
    .then(usuario => {
      if (!usuario) {
        response.status(404).send('Usuário não encontrado.')
      } else {
        response.status(200).json(usuario);
      }
    })
    .catch(ex => {
      console.error(ex);
      response.status(412).send('Não foi possível consultar o usuário.')
    })
});

// PUT - /usuarios/1
router.put('/:usuarioId', function (request, response) {
  const { params, body } = request
  const { usuarioId } = params

  const { nome, email, nascimento } = body;

  Usuario.findById(usuarioId)
    .then(usuario => {
      if (!usuario) {
        response.status(404).send('Usuário não encontrado.')
      } else {
        return usuario.update({
          nome, email, nascimento
        }).then(() => {
          response.status(200).json(usuario);
        })
      }
    })
    .catch(ex => {
      console.error(ex);
      response.status(412).send('Não foi possível atualizar o usuário.')
    })
});

// DELETE - /usuarios/1
router.delete('/:usuarioId', function (request, response) {
  const { params } = request;
  const { usuarioId } = params;

  Usuario.destroy({
    where: {
      id: usuarioId
    }
  })
    .then(deletados => {
      if (deletados > 0) {
        response.status(204).send()
      } else {
        response.status(404).send('Usuário não encontrado.')
      }
    })
    .catch(ex => {
      console.error(ex);
      response.status(412).send('Não foi possível excluir o usuário.')
    })
})

// GET - /usuarios?nome=douglas
router.get('/', function (request, response) {
  const { query } = request;
  const { nome } = query;

  const usuarioQuery = {
    where: {
    }
  };

  if (nome) {
    usuarioQuery.where.nome = {
      [Sequelize.Op.like]: `%${nome}%`
    }
  }

  Usuario.findAll(usuarioQuery)
    .then(usuarios => {
      response.status(200).json(usuarios);
    })
    .catch(ex => {
      console.error(ex);
      response.status(412).send('Não foi possível consultar os usuários.')
    })
});

module.exports = router;
