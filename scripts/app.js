const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'b2vfddliavvfeednxpij-mysql.services.clever-cloud.com',
    user: 'ujmhviecwq45kmro',
    password: '8HBUYI2X1kxq00gY5zEu',
    database: 'b2vfddliavvfeednxpij'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado com sucesso ao banco de dados MySQL!');
});

app.get('/api/transacoes', (req, res) => {
    const sql = 'SELECT * FROM transacoes ORDER BY data_criacao DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar dados' });
        res.json(results);
    });
});

app.post('/api/transacoes', (req, res) => {
    db.query('INSERT INTO transacoes SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar transação' });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

app.delete('/api/transacoes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM transacoes WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao excluir transação no banco.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Transação não encontrada.' });
        res.json({ message: 'Transação excluída com sucesso!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
