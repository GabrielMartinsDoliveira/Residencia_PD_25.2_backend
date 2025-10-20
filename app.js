const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(cors());


// Conexão com MongoDB
mongoose.connect(MONGO_CONNECTION, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log('Conectado ao MongoDB!');
})
.catch(err => {
console.error('Erro ao conectar ao MongoDB:', err);
});

// Inicialização do servidor
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});
