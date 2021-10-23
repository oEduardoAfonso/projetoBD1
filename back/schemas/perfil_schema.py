from back import ma
from ..models import models

class PerfilSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = models.Perfil
        include_fk = True
        include_relationships = True
        load_instance = True
        exclude=('foto',)