DEBUG = True
USERNAME = 'postgres'
PASSWORD = 'postgres'
SERVER = 'localhost'
DB = 'projetoBD'
DATABASE_URL = f'postgresql://{USERNAME}:{PASSWORD}@{SERVER}/{DB}'

SQLALCHEMY_DATABASE_URI = DATABASE_URL
SQLALCHEMY_TRACK_MODIFICATIONS = True