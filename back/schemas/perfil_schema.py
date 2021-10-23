from back import ma
from ..models import models
from marshmallow import fields,validate

class PerfilSchemaOut(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = models.Perfil
        include_fk = True
        include_relationships = True
        load_instance = True
        exclude=('foto',)

class PerfilSchemaIn(ma.SQLAlchemySchema):
    class Meta:
        model = models.Perfil

    cpf = fields.String(required=True, validate=validate.Length(equal=11))
    nome = fields.String(required=True, validate=validate.Length(min=1, max=100))
    