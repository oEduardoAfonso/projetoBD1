from flask.helpers import make_response
from flask_restful import Resource
from back import api, db, ma
from flask import request, jsonify
from ..schemas import perfil_schema
from ..services import perfil_service

class PerfilList(Resource):
    def get(self):
        
        ps = perfil_schema.PerfilSchema(many=True)
        resultados = perfil_service.listar_perfis()
        return make_response(ps.jsonify(resultados), 200)

api.add_resource(PerfilList, '/perfis')