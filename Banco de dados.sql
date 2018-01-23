CREATE TABLE noticia (

		idnoticia INTEGER NOT  NULL AUTO_INCREMENT,
        data_publicacao TIMESTAMP NOT NULL,
        titulo VARCHAR(100) NOT NULL,
		descricao LONGTEXT NOT NULL,
		inicio TIMESTAMP NOT NULL,
		termino TIMESTAMP NOT NULL,
        
		PRIMARY KEY(idnoticia)
)