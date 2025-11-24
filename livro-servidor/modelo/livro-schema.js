const banco = require('./conexao');

const LivroSchema = new banco.Schema({
    _id: {
        type: banco.Schema.Types.ObjectId,
        auto: true
    },
    titulo: {
        type: String,
        required: true
    },
    codEditora: {
        type: Number,
        required: true
    },
    resumo: {
        type: String,
        required: true
    },
    autores: {
        type: [String],  
        required: true
    }
}, {
    collection: 'livros'
});

const Livro = banco.model('Livro', LivroSchema);

module.exports = Livro;