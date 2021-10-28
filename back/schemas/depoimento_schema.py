from back import ma
from ..models import models
from marshmallow import fields, validate

class DepoimentoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = models.Depoimento

    codigo = fields.Integer()
    conteudo = fields.String(validate=validate.Length(min=1, max=100))
    isaceito = fields.Boolean(allow_none=True, missing=False)
    perfil_enviou = fields.String()
    perfil_recebeu = fields.String()