from flask.helpers import make_response
from flask_restful import Resource
from back import api, db, ma
from flask import request, jsonify
from ..schemas import perfil_schema
from ..services import perfil_service
from ..models import models

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

api.add_resource(PerfilList, '/perfis')