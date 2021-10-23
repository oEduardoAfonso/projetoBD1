from ..models import models
from back import db

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
    return perfil_novo

def listar_perfil_cpf(cpf):
    perfil = db.session.query(models.Perfil).filter_by(cpf=cpf).first()
    return perfil

def editar_perfil(perfil_bd, perfil):
    img = open('/home/edu/faculdade/5sem/bancos/projetoBD1/back/static/foto/foto.png', 'rb').read()
    perfil_new = models.Perfil(
        nome=perfil['nome'],
        foto=img
        )

    if perfil_new.nome is not None:
        perfil_bd.nome = perfil_new.nome
    if perfil_new.foto is not None:
        perfil_bd.foto = perfil_new.foto
    db.session.commit()

def deletar_perfil(perfil):
    db.session.delete(perfil)
    db.session.commit()