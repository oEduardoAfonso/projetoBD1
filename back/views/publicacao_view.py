from flask.helpers import make_response
from flask_restful import Resource
from back import api
from flask import request, jsonify
from ..schemas import publicacao_schema, perfil_schema
from ..services import publicacao_service

class PublicacaolList(Resource):
    def get(self):
        ps = publicacao_schema.PublicacaoSchemaOut(many=True)
        resultados = publicacao_service.listar_publicacao()
        return make_response(ps.jsonify(resultados), 200)

    def post(self):
        ps = publicacao_schema.PublicacaoSchemaIn()
        publicacao = ps.load(request.json)
        resultado = publicacao_service.cadastrar_publicacao(publicacao)

        return make_response(ps.jsonify(resultado), 200)
    
class PublicacaoDetail(Resource):
    def get(self, id):
        publicacao = publicacao_service.listar_publicacao_id(id)

        if publicacao is None:
            return make_response(jsonify('publicacao nao encontrado'), 404)

        ps = publicacao_schema.PublicacaoSchemaOut()
        return make_response(ps.jsonify(publicacao), 200)

    def put(self, id):
        publicacao_bd = publicacao_service.listar_publicacao_id(id)
        if publicacao_bd is None:
            return make_response(jsonify('publicacao nao encontrada'), 404)

        psIn = publicacao_schema.PublicacaoSchemaIn()
        publicacao = psIn.load(request.json)
        publicacao_service.editar_publicacao(publicacao_bd, publicacao)

        psOut = publicacao_schema.PublicacaoSchemaOut()
        publicacao_editado = publicacao_service.listar_publicacao_id(id)
        return make_response(psOut.jsonify(publicacao_editado), 200)

    def delete(self, id):
        publicacao = publicacao_service.listar_publicacao_id(id)
        if publicacao is None:
            return make_response(jsonify('publicacao nao encontrada'), 404)

        publicacao_service.deletar_publicacao(publicacao)
        return make_response('', 204)
        
class PublicacaoGostar(Resource):
    def post(self, id):
        perfils_cpf = perfil_schema.PerfilSchemaIn(only=['cpf'])
        cpf_usuario = perfils_cpf.load(request.json).get('cpf')

        publicacao = publicacao_service.gostar_publicacao(id, cpf_usuario)
        ps = publicacao_schema.PublicacaoSchemaOut()
        return make_response(ps.jsonify(publicacao), 200)

class PublicacaoPerfil(Resource):
    def get(self, perfil):
        publicacao = publicacao_service.listar_publicacao_perfil(perfil)

        if publicacao is None:
            return make_response(jsonify('publicacao nao encontrado'), 404)

        ps = publicacao_schema.PublicacaoSchemaOut(many=True)
        return make_response(ps.jsonify(publicacao), 200)

api.add_resource(PublicacaolList, '/publicacoes')
api.add_resource(PublicacaoDetail, '/publicacoes/<int:id>')
api.add_resource(PublicacaoPerfil, '/publicacoes/perfil/<string:perfil>')
api.add_resource(PublicacaoGostar, '/publicacoes/gostar/<int:id>')