const API_URL = 'http://localhost:3000/api/transacoes';

const form = document.getElementById('form-transacao');
const listaTransacoesDOM = document.getElementById('lista-transacoes');
const totalReceitasDOM = document.getElementById('total-receitas');
const totalDespesasDOM = document.getElementById('total-despesas');
const balancoTotalDOM = document.getElementById('balanco-total');
const cotacaoInfoDOM = document.getElementById('cotacao-info');

let cotacaoGuarani = 1; 

function buscarCotacao() {
    fetch('https://economia.awesomeapi.com.br/last/BRL-PYG')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição da API');
            }
            return response.json();
        })
        .then(dados => {
            cotacaoGuarani = parseFloat(dados.BRLPYG.ask);
            cotacaoInfoDOM.textContent = `Cotação de Hoje: R$ 1,00 = Gs ${cotacaoGuarani.toLocaleString('es-PY')}`;
            carregarTransacoes();
        })
        .catch(erro => {
            console.error('Erro ao buscar cotação:', erro);
            cotacaoInfoDOM.textContent = 'Erro ao buscar cotação ao vivo. Usando valores base.';
            carregarTransacoes();
        });
}

function formatarMoedaBRL(valor) {
    return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
}

function formatarMoedaPYG(valor) {
    return `Gs ${Math.round(valor).toLocaleString('es-PY')}`;
}

async function carregarTransacoes() {
    try {
        const resposta = await fetch(API_URL);
        const transacoes = await resposta.json();
        renderizarInterface(transacoes);
    } catch (erro) {
        console.error('Erro ao conectar com a API backend:', erro);
    }
}

function renderizarInterface(transacoes) {
    listaTransacoesDOM.innerHTML = ''; 
    
    let receitasEmBRL = 0;
    let despesasEmBRL = 0;

    transacoes.forEach(transacao => {
        const valorNum = parseFloat(transacao.valor);
        const moeda = transacao.moeda || 'BRL';
        
        let valorConvertidoBRL = valorNum;
        if (moeda === 'PYG') {
            valorConvertidoBRL = valorNum / cotacaoGuarani;
        }

        if (transacao.tipo === 'receita') {
            receitasEmBRL += valorConvertidoBRL;
        } else {
            despesasEmBRL += valorConvertidoBRL;
        }

        const divItem = document.createElement('div');
        divItem.classList.add('item');
        
        const classeCor = transacao.tipo === 'receita' ? 'receita' : 'despesa';
        const sinal = transacao.tipo === 'receita' ? '+' : '-';
        
        const textoValor = moeda === 'BRL' ? formatarMoedaBRL(valorNum) : formatarMoedaPYG(valorNum);

        divItem.innerHTML = `
            <div class="item-dados">
                <span>${transacao.descricao}</span>
                <strong class="${classeCor}">${sinal} ${textoValor}</strong>
            </div>
            <button class="btn-deletar" onclick="deletarTransacao(${transacao.id})">Excluir</button>
        `;
        listaTransacoesDOM.appendChild(divItem);
    });

    const balanco = receitasEmBRL - despesasEmBRL;
    
    totalReceitasDOM.textContent = formatarMoedaBRL(receitasEmBRL);
    totalDespesasDOM.textContent = formatarMoedaBRL(despesasEmBRL);
    balancoTotalDOM.textContent = formatarMoedaBRL(balanco);

    balancoTotalDOM.style.color = balanco < 0 ? '#f44336' : '#333';
}

form.addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const moeda = document.getElementById('moeda').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);

    const novaTransacao = { tipo, descricao, valor, moeda };

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTransacao)
        });

        if (resposta.ok) {
            form.reset(); 
            document.getElementById('moeda').value = 'BRL'; 
            document.getElementById('descricao').focus();
            carregarTransacoes(); 
        }
    } catch (erro) {
        console.error('Erro ao salvar transação no banco de dados:', erro);
    }
});

async function deletarTransacao(id) {
    if (confirm('Deseja realmente excluir esta transação?')) {
        try {
            const resposta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                carregarTransacoes(); 
            } else {
                alert('Erro ao tentar excluir a transação.');
            }
        } catch (erro) {
            console.error('Erro na requisição de exclusão:', erro);
        }
    }
}

buscarCotacao();