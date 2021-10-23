from io import BytesIO
import os
from flask.helpers import send_file
from ..models import models
from back import db, app
from flask import send_from_directory

def listar_perfis():
    perfis = db.session.query(models.Perfil).all()
    return perfis

def cadastrar_perfil(perfil):
    try:
        img = open('/home/edu/faculdade/5sem/bancos/projetoBD1/back/static/foto/foto.png', 'rb').read()
        perfil_novo = models.Perfil(
            cpf=perfil['cpf'],
            nome=perfil['nome'],
            foto=img
            )
    except FileNotFoundError:
        return(404)
    db.session.add(perfil_novo)
    db.session.commit()
    breakpoint()
    return perfil_novo