//import a o módulo do Mysql
var mysql = require('mysql');

class LivroDB {
    //Função para conectar ao banco de dados
    static connect(){
        //Cria a conexão com Mysql
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'marcio78',
            database: 'BD_FEMM'
        });
        //Conecta no banco de dados
        connection.connect();
        return connection;
    }

    //Retorna a lista de carros
    static getLivros(callback){
        return new Promise(function(resolve, reject){
            let connection = LivroDB.connect()
            // Cria uma consulta
            let sql = "select * from livro";
            connection.query(sql, function(error, results, fields){
                if(error){
                    //Erro
                    reject(error);
                } else {
                    //Sucesso
                    resolve(results);
                }
            });
            //Fecha a conexao
            connection.end();
        })
    }

    //Retorna a lista de livro por id_livro
    static getLivroById(id_livro){
        return new Promise(function (resolve, reject){
            let connection = LivroDB.connect()
            //Cria uma consulta
            let sql = "select * from livro where id_livro=?";
            connection.query(sql, id_livro, function(error, results, fields){
                if(error) {
                    reject(error);
                }else {
                    if(results.lenght == 0){
                        reject(Error("Nenhum livro encontrado."));
                        return 
                    }
                    //Encontrou Livro
                    let livro = results[0];
                    //retorna o carro pela função de callback
                    resolve(livro);
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }

    //Salva um livro no banco de dados
    // Recebe o JSON com dados do livro como parâmetro
    static save(livro){
        return new Promise(function(resolve, reject){
            let connection = LivroDB.connect()
            //Insere o livro
            let sql = "insert into livro set ? ";
            connection.query(sql, livro, function(error, results, fields){
                if(error) {
                    reject(error);
                }else {
                    //Atualiza o objeto livro do parametro com o id inserido
                    livro.id_livro = results.insertId;
                    // Retorna o livro pela função de callback
                    resolve(livro);
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }

    //Atualiza um livro no banco de dados
    static update(livro, callback){
        return new Promise(function (resolve, reject){
            let connection = LivroDB.connect()
            //SQL para atualizar o livro
            let sql = "update livro set ? where id_livro = ?";
            //Id do livro para atualizar
            let id_livro = livro.id_livro;
            connection.query(sql, [livro, id_livro], function (error, results, fields){
                if(error) {
                    reject(error);
                }else {
                    resolve(livro);
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }

    //Delete um livro no banco de dados
    static delete(livro) {
        return new Promise(function (resolve, reject){
            let connection = LivroDB.connect()
            //SQL para deletar o livro
            let sql = "delete from livro where id_livro ?";
            //Id do livro para deletar
            let id_livro = livro.id_livro;
            connection.query(sql, id_livro, function(error, results, fields){
                if(error){
                    reject(error);
                }else {
                    resolve(livro);
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }

    //Delete um livro pelo id
    static deleteById(id_livro){
        return new Promise(function (resolve, reject){
            let connection = LivroDB.connect()
            //SQL para deletar o livro
            let sql = "delete from livro where id_livro = ?";
            connection.query(sql, id_livro, function (error, results, fields){
                if(error){
                    reject(error);
                }else{
                    //Retorna a quiantidade de registros deletados
                    resolve(results.affectedRows)
                }
            });
            //Fecha a conexão
            connection.end();
        });
    }
};
module.exports = LivroDB;



