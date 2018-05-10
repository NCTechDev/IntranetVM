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

CREATE TABLE vaga (

		idvaga INTEGER NOT NULL AUTO_INCREMENT,
		data_publicacao TIMESTAMP NOT NULL,
		titulo VARCHAR(100) NOT NULL,
		descricao LONGTEXT NOT NULL,
		estado VARCHAR(10) NOT NULL,
		unidade VARCHAR(50) NOT NULL,

		PRIMARY KEY(idvaga)
);


CREATE TABLE download (
	
	iddownload INTEGER NOT  NULL AUTO_INCREMENT,
	titulo VARCHAR(100) NOT NULL,
	newPath VARCHAR(100),
        
	PRIMARY KEY(iddownload)
);

CREATE TABLE visita (

		idvisita INTEGER NOT  NULL AUTO_INCREMENT,
        data_visita TIMESTAMP NOT NULL,
		data_cadastro TIMESTAMP NOT NULL,
        nomeDeFantasia VARCHAR(100) NOT NULL,
		representante VARCHAR(100) NOT NULL,
		razao_social VARCHAR(100) NOT NULL,
		cnpj VARCHAR(50),
		cidade VARCHAR(25) NOT NULL,
		celular VARCHAR(25),
		celular2 VARCHAR(25),
		fixo VARCHAR(25),
		email VARCHAR(50) NOT NULL,
		unidade VARCHAR(50) NOT NULL,
		observacao LONGTEXT,

		PRIMARY KEY(idvisita)
);
