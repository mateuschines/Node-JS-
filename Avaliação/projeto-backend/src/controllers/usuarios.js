const {sequelize, Usuario} = require('../models');
const {generateToken} = require("../utils/token");

function cadastro(request, response, next) {
		Usuario.create(request.body)
		.then(usuario => response.status(201).json(usuario))
	    .catch(ex => 
	      response.status(412)
	      .send('Não foi possível incluir o registro.'))
}

function buscaPorId(request, response, next) {
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
}

function edicao(request, response, next) {
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
}

function login(request, response, next) {

    const {body} = request;
    const {email, senha} = body;

    Usuario.findOne({
        where: {
            email: email,
            senha: senha
        }
    })
            .then(result => {

                if (!result) {
                    response.status(412).send('Usuário/Senha Incorretos');
                } else {
                    //Gerar Token
                    
                    const params = {
                        nome: result.dataValues.nome,
                        email: result.dataValues.email
                    };
                    
                    const token = generateToken(params);
                    response.status(200).json({
                        token: token
                    });
                }

            });
}

function getTodos(request, response, next) {
    Usuario.findAll({})
            .then(result => response.status(200).json(result))
            .catch(err => response.status(412).send('Nenhum Usuário Cadastrado'));
}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login,
    getTodos
};
