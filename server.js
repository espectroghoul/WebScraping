

const express = require('express');
const axios = require('axios');
const path = require('path'); 
const app = express();

const port = process.env.PORT || 3000; 
const TARGET_URL = "https://www.terra.com.br/economia/imposto-de-renda/lula-sanciona-isencao-de-ir-para-quem-ganha-ate-r-5-mil-veja-o-que-muda-e-a-partir-de-quando,fe231557c228f73126c20f72ca0129c5k6hl1z5b.html";
app.use(express.static(path.join(__dirname, 'public')));
app.get('/scrape', async (req, res) => {
    try {
        const response = await axios.get(TARGET_URL, {
            headers: {

                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': TARGET_URL,
                'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error('Erro ao buscar a URL de destino:', error.message);
        res.status(500).send('Erro no servidor ao tentar acessar o site externo.');
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});