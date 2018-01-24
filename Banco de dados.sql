CREATE DATABASE intranetvm;

CREATE TABLE usuarios(

	id INTEGER NOT  NULL AUTO_INCREMENT,
	
	login VARCHAR(60) UNIQUE KEY NOT NULL,
	senha VARCHAR(60) NOT NULL,
	nivel_acesso VARCHAR(1) NOT NULL,
   

	CONSTRAINT pk_usuarios PRIMARY KEY (id)
);

CREATE TABLE noticia (

		idnoticia INTEGER NOT  NULL AUTO_INCREMENT,
        data_publicacao TIMESTAMP NOT NULL,
        titulo VARCHAR(100) NOT NULL,
		descricao LONGTEXT NOT NULL,
		inicio TIMESTAMP NOT NULL,
		termino TIMESTAMP NOT NULL,
		newPath VARCHAR(100),
        
		PRIMARY KEY(idnoticia)
);