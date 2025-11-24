import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';
import Livro from './modelo/Livro';

function LivroDados() {
    const navigate = useNavigate();
    const [opcoes, setOpcoes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    
    const controleLivro = new ControleLivro();
    const controleEditora = new ControleEditora();

    useEffect(() => {
        const editoras = controleEditora.getEditoras();
        setOpcoes(editoras.map(editora => ({
            value: editora.codEditora,
            text: editora.nome
        })));
        if (editoras.length > 0) {
            setCodEditora(editoras[0].codEditora);
        }
    }, []);

    const incluir = (event) => {
        event.preventDefault();
        
        // Alteração: utilizar texto vazio para o código
        const livro = new Livro(
            '', // código como texto vazio
            codEditora,
            titulo,
            resumo,
            autores.split('\n')
        );

        // Alteração: navigate apenas ao final da execução com then
        controleLivro.incluir(livro)
            .then(() => {
                navigate('/');
            });
    };

    return (
        <div>
            <h1>Cadastro de Livro</h1>
            <form onSubmit={incluir}>
                <div>
                    <label>Título:</label>
                    <input 
                        type="text" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Resumo:</label>
                    <textarea 
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Editora:</label>
                    <select 
                        value={codEditora}
                        onChange={(e) => setCodEditora(Number(e.target.value))}
                    >
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Autores (um por linha):</label>
                    <textarea 
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default LivroDados;