const API_URL = "/api";


// ===============================
// CADASTRO
// ===============================

const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const mensagem = document.getElementById("mensagem");

        try {

            const resposta = await fetch(
                `${API_URL}/auth/cadastro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })
                }
            );

            const dados = await resposta.json();

            mensagem.textContent = dados.mensagem;

            if (resposta.ok) {

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);

            }

        } catch (erro) {

            console.error(erro);

            mensagem.textContent =
                "Erro ao conectar ao servidor.";

        }

    });

}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;

        const mensagem =
            document.getElementById("mensagem");

        try {

            const resposta = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {

                mensagem.textContent =
                    dados.mensagem;

                return;
            }


            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.usuario)
            );


            window.location.href =
                "livros.html";

        } catch (erro) {

            console.error(erro);

            mensagem.textContent =
                "Erro ao conectar ao servidor.";

        }

    });

}