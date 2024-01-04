let express = require('express');
const router = express.Router();
const LivroDB = require('../model/LivroDB');
const exec = require('../utils');

//Get em /
router.get('/', exec(async function (req, res, next){
    try {
        let livros = await LivroDB.getLivros();
            res.json(livros);
    } catch(error){
        next(error);
    }
}));


//GET em /id
router.get('/:id_livro(\\d+)', exec(async (req, res, next)=> {
    let id_livro = req.params.id_livro;
    let livro = await LivroDB.getLivroById(id_livro);
    res.json(livro)
}));

router.delete('/:id_livro(\\d+)', exec(async(re, res, next) => {
    let id_livro = req.params.id_livro;
    let affectedRows = await LivroDB.deleteById(id_livro);
    res.json ({ msg: affectedRows > 0 ? 'Livro deletado com sucesso.' : 'Nenhum livro excluido'})
}));

//POST para salvar um livro
router.post('/', exec(async(req, res, next) => {
    //Livro enviado no formato JSON
    let livro = await LivroDB.save(req.body);
    res.json(livro)
}));

// Put para atualizar um livro
router.put('/', exec(async(req, res, next) => {
    let livro = await LivroDB.update(req.body);
    res.json({ msg : 'Livro atualizado com sucesso.'})
}));

//Exporta as rotas para ser utilizado em outro arquivo
module.exports = router;
