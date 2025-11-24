const banco = require('mongoose');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

banco.connect('mongodb://localhost:27017/livraria', options)
    .then(() => {
        console.log('✅ Conectado ao MongoDB - Banco: livraria');
    })
    .catch((error) => {
        console.error('❌ Erro ao conectar com MongoDB:', error);
    });

module.exports = banco;