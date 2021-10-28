from ..models import models
from back import db

def listar_depoimentos():
    depoimentos = db.session.query(models.Depoimento).all()
    return depoimentos

def cadastrar_depoimento(depoimento):
    depoimento_novo = models.Depoimento(
        conteudo=depoimento['conteudo'],
        perfil_enviou=depoimento['perfil_enviou'],
        perfil_recebeu=depoimento['perfil_recebeu']
        )
    db.session.add(depoimento_novo)
    db.session.commit()
    return depoimento_novo

def listar_depoimento_id(id):
    depoimento = db.session.query(models.Depoimento).filter_by(codigo=id).first()
    return depoimento

def listar_depoimento_perfil(perfil):
    depoimentos = db.session.query(models.Depoimento).filter_by(perfil_recebeu=perfil).all()
    return depoimentos

def editar_depoimento(depoimento_bd, depoimento):
    depoimento_new = models.Depoimento(
        isaceito=depoimento['isaceito'],
        conteudo=depoimento['conteudo']
        )

    if depoimento_new.isaceito is not None:
        depoimento_bd.isaceito = depoimento_new.isaceito
    if depoimento_new.conteudo is not None:
        depoimento_bd.conteudo = depoimento_new.conteudo
    db.session.commit()

def deletar_depoimento(depoimento):
    db.session.delete(depoimento)
    db.session.commit()