/* CRIAÇÃO DO BANCO */
create database BD_FEMM;
use BD_FEMM;
/*grant all privileges on BD_FEMM.* to "BD_FEMM"@"localhost" identified by "BD_FEMM123";*/
/*flush privileges;*/

/* CRIAÇÃO DAS TABELAS */
create table CLIENTE (
id_cliente int not null auto_increment,
nome_cliente VARCHAR(100),
data_nascimento DATE,
telefone VARCHAR(30),
email VARCHAR(60),
CEP VARCHAR(12),
logradouro VARCHAR(60),
complemento VARCHAR(30),
bairro VARCHAR(50),
cidade VARCHAR(50),
estado VARCHAR(2),
PRIMARY KEY(id_cliente));


create table livro (
id_livro int not null auto_increment,
nome_livro VARCHAR(100),
autor VARCHAR(100),
editora VARCHAR(100),
capa TEXT,
ano_lancamento YEAR,
primary key(id_livro));

create table aluguel(
id_aluguel int not null auto_increment,
id_clienteTB int,
id_livroTB int,
data_locacao DATE,
data_entrega DATE,
primary key(id_aluguel),
FOREIGN KEY (id_clienteTB) REFERENCES cliente(id_cliente),
FOREIGN KEY (id_livroTB) REFERENCES livro(id_livro));

/* INSERT */

INSERT INTO CLIENTE(nome_cliente, data_nascimento, telefone, email, CEP, logradouro, complemento, bairro, cidade, estado) VALUES 
("Márcio Nascimento", "1990-09-29", "99887-6655", "marcionascimento1@gmail.com", "25041-569", "Rua Nilo Peçanha", "293", "Parque Fluminense","Duque de Caxias", "RJ");

INSERT INTO LIVRO(nome_livro, autor, editora, capa, ano_lancamento) VALUES 
("Node Essencial", "Ricardo R. Lecheta" , "Novatec", "capaVerde", "2018"); 


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'alunolab';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'marcio78';