from datetime import datetime
from ..models import models
from ..services import perfil_service
from back import db

def listar_publicacao():
    publicacao = db.session.query(models.Publicacao).all()
    return publicacao

def cadastrar_publicacao(publicacao):
    publicacao_novo = models.Publicacao(
        conteudo=publicacao['conteudo'],
        codigo_comunidade=publicacao['codigo_comunidade'],
        autor=publicacao['autor'],
        data_hora=datetime.now()
        )
    db.session.add(publicacao_novo)
    db.session.commit()
    return publicacao_novo

def listar_publicacao_id(id):
    publicacao = db.session.query(models.Publicacao).filter_by(codigo=id).first()
    return publicacao

def listar_publicacao_perfil(perfil):
    publicacao = db.session.query(models.Publicacao).filter_by(autor=perfil).all()
    return publicacao

def editar_publicacao(publicacao_bd, publicacao):
    publicacao_new = models.Publicacao(
        conteudo=publicacao['conteudo']
        )

    if publicacao_bd.conteudo is not None:
        publicacao_bd.conteudo = publicacao_new.conteudo
    publicacao_bd.data_hora = datetime.now() 
    db.session.commit()

def deletar_publicacao(publicacao):
    db.session.delete(publicacao)
    db.session.commit()

def gostar_publicacao(id_publicacao, id_perfil):
    perfil = perfil_service.listar_perfil_cpf(id_perfil)
    publicacao = listar_publicacao_id(id_publicacao)

    if perfil in publicacao.curtida_codigo_publicacao_fkey_perfil:
        publicacao.curtida_codigo_publicacao_fkey_perfil.remove(perfil)
    else:
        publicacao.curtida_codigo_publicacao_fkey_perfil.append(perfil)
        
    db.session.commit()
    return publicacao