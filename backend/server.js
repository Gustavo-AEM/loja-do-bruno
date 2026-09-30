const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const livroRoutes = require("./routes/livroRoutes");

const app = express();

const PORT = process.env.PORT || 3000;


// Middlewares

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Frontend

app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);


// API

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/livros",
    livroRoutes
);


// Página inicial

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "../frontend/pages/index.html"
        )
    );

});


app.listen(PORT, () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );

});