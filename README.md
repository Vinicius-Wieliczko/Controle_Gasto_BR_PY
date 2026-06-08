# Projeto Final - Controle Financeiro

Sistema web de controle financeiro com suporte a múltiplas moedas (BRL e PYG), consumindo API externa de câmbio.

## Tecnologias Utilizadas
- HTML, CSS, JavaScript (Vanilla)
- Node.js (Express, Cors)
- Banco de Dados MySQL
- Consumo da AwesomeAPI (Câmbio) via Fetch API

## Como executar o projeto

1. **Banco de Dados:**
   - Abra o MySQL Workbench ou seu gerenciador preferido.
   - Execute o script contido no arquivo `controle_financeiro.sql` para criar o banco de dados e a tabela.
   - Se necessário, atualize as credenciais (usuário e senha) no arquivo `app.js`.

2. **Backend:**
   - Abra o terminal na pasta do projeto.
   - Instale as dependências executando: `npm install express mysql2 cors`
   - Inicie o servidor executando: `node app.js`

3. **Frontend:**
   - Com o servidor rodando, basta abrir o arquivo `index.html` em qualquer navegador.
