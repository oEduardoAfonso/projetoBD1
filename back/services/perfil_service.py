from ..models import models
from back import db

def listar_perfis():
    perfis = db.session.query(models.Perfil).all()
    return perfis