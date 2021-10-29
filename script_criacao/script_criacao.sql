DROP TABLE IF EXISTS seguidor;
DROP TABLE IF EXISTS mensagem;
DROP TABLE IF EXISTS participante_chat;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS noticia;
DROP TABLE IF EXISTS atividade;
DROP TABLE IF EXISTS participante_evento;
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS depoimento;
DROP TABLE IF EXISTS denuncia;
DROP TABLE IF EXISTS curtida;
DROP TABLE IF EXISTS publicacao;
DROP TABLE IF EXISTS membro_comunidade;
DROP TABLE IF EXISTS comunidade;
DROP TABLE IF EXISTS perfil;

CREATE TABLE perfil
		(
			usuario VARCHAR(50) PRIMARY KEY,
			senha VARCHAR(100) NOT NULL,
			nome VARCHAR(100) NOT NULL,
			foto BYTEA NOT NULL
		);
		
CREATE TABLE comunidade
		(
			codigo SERIAL PRIMARY KEY,
			nome VARCHAR(50) NOT NULL,
			descricao VARCHAR(100) NOT NULL,
			moderador VARCHAR(50) REFERENCES perfil(usuario) NOT NULL
		);
		
CREATE TABLE membro_comunidade
		(
			comunidade INTEGER REFERENCES comunidade(codigo),
			membro VARCHAR(50) REFERENCES perfil(usuario),
			PRIMARY KEY (comunidade, membro)
		);
		
CREATE TABLE publicacao
		(
			codigo SERIAL PRIMARY KEY,
			data_hora TIMESTAMP WITHOUT TIME ZONE NOT NULL,
			autor VARCHAR(50) REFERENCES perfil(usuario) NOT NULL,
			conteudo VARCHAR(250) NOT NULL,
			comunidade INTEGER REFERENCES comunidade(codigo)
		);
		
CREATE TABLE curtida
		(
			codigo_publicacao INTEGER REFERENCES publicacao(codigo),
			perfil VARCHAR(50) REFERENCES perfil(usuario),
			PRIMARY KEY (codigo_publicacao, perfil)
		);
		
CREATE TABLE denuncia
		(
			perfil_denunciou VARCHAR(50) REFERENCES perfil(usuario),
			perfil_denunciado VARCHAR(50) REFERENCES perfil(usuario),
			motivo VARCHAR(50) NOT NULL,
			PRIMARY KEY (perfil_denunciou, perfil_denunciado)
		);
		
CREATE TABLE depoimento
		(
			codigo SERIAL PRIMARY KEY,
			conteudo VARCHAR(250) NOT NULL,
			isAceito BOOLEAN DEFAULT FALSE,
			perfil_enviou VARCHAR(50) REFERENCES perfil(usuario) NOT NULL,
			perfil_recebeu VARCHAR(50) REFERENCES perfil(usuario)NOT NULL
		);
		
CREATE TABLE evento
		(
			codigo SERIAL PRIMARY KEY,
			nome VARCHAR(50) NOT NULL,
			data_hora TIMESTAMP WITHOUT TIME ZONE NOT NULL
		);
		
CREATE TABLE participante_evento
		(
			evento INTEGER REFERENCES evento(codigo),
			perfil VARCHAR(50) REFERENCES perfil(usuario),
			PRIMARY KEY (evento, perfil)
		);
		
CREATE TABLE atividade
		(
			nome VARCHAR(50),
			regras VARCHAR(500) NOT NULL,
			evento INTEGER REFERENCES evento(codigo),
			PRIMARY KEY (nome, evento)
		);
		
CREATE TABLE noticia
		(
			manchete VARCHAR(50),
			conteudo VARCHAR(500) NOT NULL,
			evento INTEGER REFERENCES evento(codigo),
			PRIMARY KEY (manchete, evento)
		);
		
CREATE TABLE chat
		(
			codigo SERIAL PRIMARY KEY
		);
		
CREATE TABLE participante_chat
		(
			chat INTEGER REFERENCES chat(codigo),
			perfil VARCHAR(50) REFERENCES perfil(usuario),
			PRIMARY KEY (chat, perfil)
		);
		
CREATE TABLE mensagem
		(
			data_hora TIMESTAMP WITHOUT TIME ZONE,
			conteudo VARCHAR(500) NOT NULL,
			autor VARCHAR(50) REFERENCES perfil(usuario),
			chat INTEGER REFERENCES chat(codigo) NOT NULL,
			PRIMARY KEY (data_hora, autor)
		);

CREATE TABLE seguidor
		(
			perfil1 VARCHAR(50) REFERENCES perfil(usuario),
			perfil2 VARCHAR(50) REFERENCES perfil(usuario),
			PRIMARY KEY (perfil1, perfil2)
		);
