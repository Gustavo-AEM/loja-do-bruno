javascript
const pool = require("../config/database");


// ========================================
// LISTAR TODOS OS LIVROS
// GET /api/livros
// ========================================

const listarLivros = async (req, res) => {

    try {

        const resultado = await pool.query(`
            SELECT
                id,
                titulo,
                autor,
                descricao,
                capa,
                created_at
            FROM livros
            ORDER BY id DESC
        `);

        res.status(200).json(resultado.rows);

    } catch (erro) {

        console.error("Erro ao listar livros:", erro);

        res.status(500).json({
            mensagem: "Erro ao buscar livros."
        });

    }

};


// ========================================
// BUSCAR UM LIVRO
// GET /api/livros/:id
// ========================================

const buscarLivro = async (req, res) => {

    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                id,
                titulo,
                autor,
                descricao,
                capa,
                conteudo,
                created_at
            FROM livros
            WHERE id = $1
            `,
            [id]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensagem: "Livro não encontrado."
            });

        }


        res.status(200).json(
            resultado.rows[0]
        );

    } catch (erro) {

        console.error("Erro ao buscar livro:", erro);

        res.status(500).json({
            mensagem: "Erro ao buscar livro."
        });

    }

};


// ========================================
// CADASTRAR LIVRO
// POST /api/livros
// ========================================

const cadastrarLivro = async (req, res) => {

    try {

        const {
            titulo,
            autor,
            descricao,
            capa,
            conteudo
        } = req.body;


        // Verificação básica

        if (!titulo || !conteudo) {

            return res.status(400).json({
                mensagem: "Título e conteúdo são obrigatórios."
            });

        }


        const resultado = await pool.query(
            `
            INSERT INTO livros
            (
                titulo,
                autor,
                descricao,
                capa,
                conteudo
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING
                id,
                titulo,
                autor,
                descricao,
                capa,
                created_at
            `,
            [
                titulo,
                autor || null,
                descricao || null,
                capa || null,
                conteudo
            ]
        );


        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso.",
            livro: resultado.rows[0]
        });


    } catch (erro) {

        console.error("Erro ao cadastrar livro:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar livro."
        });

    }

};


// ========================================
// EXPORTAR FUNÇÕES
// ========================================

module.exports = {
    listarLivros,
    buscarLivro,
    cadastrarLivro
};
