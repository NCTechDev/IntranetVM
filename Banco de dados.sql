CREATE TABLE usuarios(

	id INTEGER NOT  NULL AUTO_INCREMENT,
	
	login VARCHAR(20) NOT NULL,
	senha VARCHAR(20) NOT NULL,
	nivel_acesso VARCHAR(1) NOT NULL,
   

	CONSTRAINT pk_usuarios PRIMARY KEY (id)
);