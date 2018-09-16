const {sequelize, Tarefa} = require('../models');

function cadastro(request, response, next) {
    Tarefa.create(request.body)
        .then(tarefa => response.status(201).json(tarefa))
        .catch(erro => 
          response.status(412)
          .send('Não foi possivel adicionar a tarefa.'))
}

function listagem(request, response, next) {
    const Op = sequelize.Op;
    let titulo = request.query.titulo;
    if (titulo == null) {
        titulo = '';
    }

    Tarefa.findAll({
        where: {
            titulo: {
                [Op.like]: '%' + titulo + '%'
            }
        }
    })
            .then(resultado => response.status(201).json(resultado))
            .catch(erro =>
             response.status(412)
             .send('Não tem tarefas cadastradas!'));
}

function buscaPorId(request, response, next) {
    Tarefa.findOne({where: request.params})
            .then(resultado => response.status(201).json(resultado))
            .catch(erro =>
             response.status(412)
             .send('Não foi possivel encontrar tarefa!'));
}

function edicao(request, response, next) {
    Tarefa.update(request.body, {
        where: {
            id: request.params.id
        }
    })
            .then(resultado => response.status(201).json(resultado))
            .catch(erro =>
             response.status(412)
             .send('Não foi possivel atualizar tarefa!'));
}

function remocao(request, response, next) {
    Tarefa.destroy({
        where: {
            id: request.params.id
        }
    })
            .then(resultado => (
                        Tarefa.findAll({})
                        .then(resultado => response.status(201).json(resultado))
                        .catch(erro => response.status(412).send('Não ah tarefas cadastradas!'))
                        ))
            .catch(erro => response.status(412).send('Erro ao excluir tarefa!'));
}

function marcarConcluida(request, response, next) {
    Tarefa.update(
            {
                concluida: 1
            },
            {
                where: {
                    id: request.params.id
                }
            })
            .then(resultado => response.status(201).json(resultado))
            .catch(erro => response.status(412).send('Erro ao marcar tarefa!'));
}

function desmarcarConcluida(request, response, next) {
    Tarefa.update(
            {
                concluida: null
            },
            {
                where: {
                    id: request.params.id
                }
            })
            .then(resultado => response.status(201).json(resultado))
            .catch(erro => response.status(412).send('Erro ao desmarcar tarefa!'));
}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};
