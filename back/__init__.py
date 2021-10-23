from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config.from_object('config')

api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)


from .views import perfil_view, depoimento_view, publicacao_view