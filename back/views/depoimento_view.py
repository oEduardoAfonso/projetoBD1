from flask.helpers import make_response
from flask_restful import Resource
from back import api
from flask import request, jsonify
from ..schemas import depoimento_schema
from ..services import depoimento_service

class DepoimentolList(Resource):
    def get(self):
        ds = depoimento_schema.DepoimentoSchema(many=True)
        resultados = depoimento_service.listar_depoimentos()
        return make_response(ds.jsonify(resultados), 200)

    def post(self):
        ds = depoimento_schema.DepoimentoSchema()
        depoimento = ds.load(request.json)
        resultado = depoimento_service.cadastrar_depoimento(depoimento)

        return make_response(ds.jsonify(resultado), 200)
    
class DepoimentoDetail(Resource):
    def get(self, id):
        depoimento = depoimento_service.listar_depoimento_id(id)

        if depoimento is None:
            return make_response(jsonify('Depoimento nao encontrado'), 404)

        ps = depoimento_schema.DepoimentoSchema()
        return make_response(ps.jsonify(depoimento), 200)

    def put(self, id):
        depoimento_bd = depoimento_service.listar_depoimento_id(id)
        if depoimento_bd is None:
            return make_response(jsonify('Depoimento nao encontrada'), 404)

        ds = depoimento_schema.DepoimentoSchema()
        depoimento = ds.load(request.json)
        depoimento_service.editar_depoimento(depoimento_bd, depoimento)

        depoimento_editado = depoimento_service.listar_depoimento_id(id)
        return make_response(ds.jsonify(depoimento_editado), 200)

    def delete(self, id):
        depoimento = depoimento_service.listar_depoimento_id(id)
        if depoimento is None:
            return make_response(jsonify('Depoimento nao encontrada'), 404)

        depoimento_service.deletar_depoimento(depoimento)
        return make_response('', 204)
        
api.add_resource(DepoimentolList, '/depoimentos')
api.add_resource(DepoimentoDetail, '/depoimentos/<int:id>')