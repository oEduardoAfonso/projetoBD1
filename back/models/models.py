from back import db
from sqlalchemy.ext.automap import automap_base, generate_relationship, name_for_collection_relationship
        
Base = automap_base()

def prepend_name(base, local_cls, referred_cls, constraint):
        return 'tbl_' + referred_cls.__name__.lower()
    # https://stackoverflow.com/questions/37797140/sqlalchemy-automap-backref-errors
def _name_for_collection_relationship(base, local_cls, referred_cls, constraint):
        if constraint.name:
            return constraint.name.lower() + '_' + referred_cls.__name__.lower()
        # if this didn't work, revert to the default behavior
        return name_for_collection_relationship(base, local_cls, referred_cls, constraint)

Base.prepare(
    db.engine,
    reflect=True,
    name_for_scalar_relationship=prepend_name,
    name_for_collection_relationship=_name_for_collection_relationship
    )

Perfil = Base.classes.perfil
Depoimento = Base.classes.depoimento
Publicacao = Base.classes.publicacao