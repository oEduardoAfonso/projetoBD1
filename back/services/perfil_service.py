from ..models import models
from back import db
from sqlalchemy.sql import text

def listar_perfis():
    perfis = db.session.query(models.Perfil).all()
    return perfis

def cadastrar_perfil(perfil):
    try:
        img = open('/home/edu/faculdade/5sem/bancos/projetoBD1/back/static/foto/foto.png', 'rb').read()
        perfil_novo = models.Perfil(
            usuario=perfil['usuario'],
            senha=perfil['senha'],
            nome=perfil['nome'],
            foto=img
            )
    except FileNotFoundError:
        return(404)
    db.session.add(perfil_novo)
    db.session.commit()
    return perfil_novo

def listar_perfil_usuario(usuario):
    perfil = db.session.query(models.Perfil).filter_by(usuario=usuario).first()
    return perfil

def listar_perfil_usuarios(usuario):
    search = text(f"UPPER(nome) LIKE UPPER(\'%{usuario}%\')")
    print(search)
    perfil = db.session.query(models.Perfil).filter(search).all()
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