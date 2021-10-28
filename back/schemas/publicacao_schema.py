from back import ma
from ..models import models
from marshmallow import fields, validate

class PublicacaoSchemaOut(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = models.Publicacao

        include_fk = True
        include_relationships = True
        load_instance = True
        exclude=('tbl_perfil', 'tbl_comunidade')

class PublicacaoSchemaIn(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = models.Publicacao

    codigo = fields.Integer()
    codigo_comunidade = fields.Integer(missing=None)
    autor = fields.String()
    conteudo = fields.String(validate=validate.Length(min=1, max=250))
    data_hora = fields.DateTime()