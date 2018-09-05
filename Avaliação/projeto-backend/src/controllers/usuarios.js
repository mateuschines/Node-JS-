
function cadastro(request, response, next) {
	const { body } = request;

	  const { nome, senha, nascimento, email } = body;

	  Usuario.create({
	    nome, senha, email, nascimento
	  })
	    .then(usuario => {
	      response.status(201).json(usuario);
	    })
	    .catch(ex => {
	      console.error(ex);
	      response.status(412)
	      .send('Não foi possível incluir o registro.');
	  })
}

function buscaPorId(request, response, next) {

}

function edicao(request, response, next) {

}

function login(request, response, next) {

}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login,
};
