# Projeto Final - Controle Financeiro

Sistema web de controle financeiro com suporte a múltiplas moedas (BRL e PYG), consumindo API externa de câmbio.

## Tecnologias Utilizadas
- HTML, CSS, JavaScript (Vanilla)
- Node.js (Express, Cors)
- Banco de Dados MySQL
- Consumo da AwesomeAPI (Câmbio) via Fetch API

## Instruções Básicas de Execução (Teste Local)
Caso a avaliação seja feita rodando o projeto localmente, siga os passos abaixo:

**Passo A: Banco de Dados**
1. Abra o seu gerenciador do MySQL.
2. Execute o script `controle_financeiro.sql` para criar a tabela necessária.
3. No arquivo `app.js`, insira as credenciais locais do seu banco de dados (usuário e senha).

**Passo B: Backend (Node.js)**
1. Abra o terminal na pasta do projeto.
2. Instale as dependências executando o comando: `npm install`
3. Inicie o servidor executando: `node app.js`

**Passo C: Frontend**
1. No arquivo `script.js`, altere a constante `API_URL` para apontar para o servidor local: `http://localhost:3000/api/transacoes`
2. Abra o arquivo `index.html` em qualquer navegador.
