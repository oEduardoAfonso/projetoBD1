from flask.helpers import make_response
from flask_restful import Resource
from back import api
from flask import request, jsonify
from ..schemas import perfil_schema
from ..services import perfil_service

class PerfilList(Resource):
    def get(self):
        ps = perfil_schema.PerfilSchemaOut(many=True)
        resultados = perfil_service.listar_perfis()
        return make_response(ps.jsonify(resultados), 200)

    def post(self):
        ps = perfil_schema.PerfilSchemaIn()
        perfil = ps.load(request.json)
        resultado = perfil_service.cadastrar_perfil(perfil)
        
        if(resultado != 404):
            return make_response(ps.jsonify(resultado), 200)
        return make_response(jsonify('Imagem nao encontrada'), 404)
    
class SalaDetail(Resource):
    def get(self, cpf):
        perfil = perfil_service.listar_perfil_cpf(cpf)

        if perfil is None:
            return make_response(jsonify('Perfil nao encontrado'), 404)

        ps = perfil_schema.PerfilSchemaOut()
        return make_response(ps.jsonify(perfil), 200)

    def put(self, cpf):
        perfil_bd = perfil_service.listar_perfil_cpf(cpf)
        if perfil_bd is None:
            return make_response(jsonify('Perfil nao encontrada'), 404)

        psIn = perfil_schema.PerfilSchemaIn()
        perfil = psIn.load(request.json)
        perfil_service.editar_perfil(perfil_bd, perfil)

        psOut = perfil_schema.PerfilSchemaOut()
        perfil_editado = perfil_service.listar_perfil_cpf(cpf)
        return make_response(psOut.jsonify(perfil_editado), 200)

    def delete(self, cpf):
        perfil = perfil_service.listar_perfil_cpf(cpf)
        if perfil is None:
            return make_response(jsonify('Perfil nao encontrada'), 404)

        perfil_service.deletar_perfil(perfil)
        return make_response('', 204)
        
api.add_resource(PerfilList, '/perfis')
api.add_resource(SalaDetail, '/perfis/<string:cpf>')