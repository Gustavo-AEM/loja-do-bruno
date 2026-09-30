const cadastrar = async (req, res) => {
    try {
        res.json({
            mensagem: "Rota de cadastro funcionando."
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


const login = async (req, res) => {
    try {
        res.json({
            mensagem: "Rota de login funcionando."
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
};


module.exports = {
    cadastrar,
    login
};