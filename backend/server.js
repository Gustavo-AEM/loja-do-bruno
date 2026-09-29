const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Caminho para a pasta frontend
const frontendPath = path.join(__dirname, "..", "frontend");

// Servir arquivos do frontend
app.use(express.static(frontendPath));

// Abrir index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});