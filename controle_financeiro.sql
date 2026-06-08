CREATE DATABASE IF NOT EXISTS controle_financeiro;
USE controle_financeiro;

-- Cria a tabela de transações
CREATE TABLE IF NOT EXISTS transacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('receita', 'despesa') NOT NULL,
    descricao VARCHAR(255) NOT NULL,
	moeda ENUM('BRL', 'PYG') NOT NULL DEFAULT 'BRL',
    valor DECIMAL(10, 2) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);