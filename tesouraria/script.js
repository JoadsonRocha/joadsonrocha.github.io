let movimentacoes = [];
let idParaDeletar = null;
let despesasChart = null;

const categoriasSaida = [
    { label: "Contas Recorrentes", options: ["Água", "Luz", "Zeladoria / Limpeza"] },
    { label: "Projetos", options: ["Construção"] },
    { label: "Ministérios & Igreja", options: ["Ministério Pessoal", "Ministério Jovem (JA)", "Min. Criança e Adolescente", "Ministério da Família", "Ministério da Mulher", "Ministério de Mordomia", "Ministério da Saúde", "Ministério de Música", "Escola Sabatina", "Ministério de Desbravadores", "Aventureiros", "Ação Solidária Adventista (ASA)", "Sonoplastia / Áudio e Vídeo", "Tesouraria"] },
    { label: "Outros", options: ["Outras Despesas"] }
];

function atualizarListaCategorias() {
    const select = document.getElementById('categoria');
    select.innerHTML = '<option value="" disabled selected>Selecione uma categoria...</option>';
    
    categoriasSaida.forEach(grupo => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = grupo.label;
        grupo.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            optgroup.appendChild(option);
        });
        select.appendChild(optgroup);
    });
}

// Formatadores
const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

// Máscara de Moeda
const aplicarMascaraMoeda = (input) => {
    let value = input.value.replace(/\D/g, "");
    value = (value / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = value;
};

const floatParaBanco = (valorString) => {
    return parseFloat(valorString.replace(/\./g, "").replace(",", "."));
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.getElementById('valor');
    inputValor.addEventListener('input', () => aplicarMascaraMoeda(inputValor));
    
    atualizarListaCategorias();
    carregarDados();
    setupListeners();
});

function setupListeners() {
    const modalForm = document.getElementById('modal-form');
    const modalConfirm = document.getElementById('modal-confirm');
    
    document.getElementById('btn-nova-movimentacao').addEventListener('click', () => {
        document.getElementById('form-movimentacao').reset();
        document.getElementById('form-id').value = '';
        document.getElementById('modal-title').textContent = 'Nova Despesa';
        document.getElementById('data').value = new Date().toISOString().split('T')[0];
        document.getElementById('comprovante').checked = false;
        document.getElementById('lancamento_ok').checked = false;
        abrirModal(modalForm);
    });

    document.getElementById('btn-fechar-modal').addEventListener('click', () => fecharModal(modalForm));
    document.getElementById('btn-cancelar').addEventListener('click', () => fecharModal(modalForm));
    
    document.getElementById('btn-cancelar-exclusao').addEventListener('click', () => fecharModal(modalConfirm));
    document.getElementById('btn-confirmar-exclusao').addEventListener('click', confirmarExclusao);

    document.getElementById('form-movimentacao').addEventListener('submit', salvarMovimentacao);

    document.getElementById('btn-limpar-filtros').addEventListener('click', () => {
        document.getElementById('filter-nome').value = '';
        document.getElementById('filter-mes').value = '';
        document.getElementById('filter-status').value = 'todos';
        aplicarFiltros();
    });

    document.getElementById('filter-mes').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-nome').addEventListener('input', aplicarFiltros);
    document.getElementById('filter-status').addEventListener('change', aplicarFiltros);
    document.getElementById('btn-exportar-pdf').addEventListener('click', exportarPDF);
}

function exportarPDF() {
    window.print();
}

function abrirModal(modal) {
    modal.classList.add('active');
}

function fecharModal(modal) {
    modal.classList.remove('active');
}

// Persistência com localStorage
function carregarDados() {
    const saved = localStorage.getItem('tesouraria_movimentacoes');
    if (saved) {
        movimentacoes = JSON.parse(saved);
    } else {
        movimentacoes = [];
    }
    
    // Set current month as default filter if not set
    const filterMes = document.getElementById('filter-mes');
    if (!filterMes.value) {
        filterMes.value = new Date().toISOString().slice(0, 7);
    }
    
    aplicarFiltros();
}

function salvarLocal() {
    localStorage.setItem('tesouraria_movimentacoes', JSON.stringify(movimentacoes));
}

function calcularResumo(dados) {
    let saidas = 0;
    let pendentesNota = 0;
    let pendentesLancamento = 0;

    dados.forEach(mov => {
        saidas += mov.valor;
        if (!mov.comprovante) pendentesNota++;
        if (!mov.lancamento_ok) pendentesLancamento++;
    });

    document.getElementById('card-saidas').textContent = formatter.format(saidas);
    document.getElementById('card-saldo').textContent = formatter.format(-saidas);
    document.getElementById('card-total-count').textContent = `${dados.length} registros`;
    
    document.getElementById('card-notas-pendentes').textContent = pendentesNota;
    document.getElementById('card-lancamentos-pendentes').textContent = pendentesLancamento;

    atualizarGrafico(dados);
}

function atualizarGrafico(dados) {
    const ctx = document.getElementById('meuGrafico').getContext('2d');
    
    const somaPorCaterogia = {};
    dados.forEach(mov => {
        const cat = mov.categoria || 'Outros';
        if (!somaPorCaterogia[cat]) somaPorCaterogia[cat] = 0;
        somaPorCaterogia[cat] += mov.valor;
    });

    const labels = Object.keys(somaPorCaterogia);
    const dataValues = Object.values(somaPorCaterogia);
    const bgColors = labels.map((_, i) => `hsl(${(i * 360 / labels.length)}, 70%, 50%)`);

    if (despesasChart) despesasChart.destroy();

    despesasChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.length ? labels : ['Sem despesas'],
            datasets: [{
                data: dataValues.length ? dataValues : [1],
                backgroundColor: dataValues.length ? bgColors : ['#e2e8f0'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { family: 'Inter' } }
                }
            }
        }
    });
}

function renderizarTabela(dados) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    
    calcularResumo(dados);

    if (dados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--text-muted)">Nenhuma movimentação encontrada neste período.</td></tr>`;
        return;
    }

    dados.sort((a, b) => new Date(b.data) - new Date(a.data)).forEach(mov => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatDate(mov.data)}</td>
            <td><span class="badge badge-saida">${mov.categoria || 'Geral'}</span></td>
            <td><strong>${mov.nome}</strong></td>
            <td style="font-size: 0.9em; color: var(--text-muted)">${mov.descricao || '-'}</td>
            <td class="valor-saida">- ${formatter.format(mov.valor)}</td>
            <td style="text-align:center;">
                <div class="status-group">
                    <div class="status-pill ${mov.comprovante ? 'ok' : 'pending'}" 
                         onclick="alternarStatus(${mov.id}, 'comprovante')" 
                         title="Clique para alternar status da nota">
                        ${mov.comprovante ? 'Nota OK' : 'Sem Nota'}
                    </div>
                    <div class="status-pill ${mov.lancamento_ok ? 'ok' : 'pending'}" 
                         onclick="alternarStatus(${mov.id}, 'lancamento_ok')" 
                         title="Clique para alternar status do lançamento">
                        ${mov.lancamento_ok ? 'Lan. OK' : 'Pendente'}
                    </div>
                </div>
            </td>
            <td class="actions">
                <button class="edit" title="Editar" onclick="editarMovimentacao(${mov.id})">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="delete" title="Excluir" onclick="solicitarExclusao(${mov.id})">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.alternarStatus = (id, campo) => {
    const index = movimentacoes.findIndex(m => m.id === id);
    if (index !== -1) {
        movimentacoes[index][campo] = !movimentacoes[index][campo];
        salvarLocal();
        aplicarFiltros();
    }
}

function salvarMovimentacao(e) {
    e.preventDefault();
    
    let valorNum = floatParaBanco(document.getElementById('valor').value);
    if (isNaN(valorNum) || valorNum <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    const data = {
        id: document.getElementById('form-id').value ? parseInt(document.getElementById('form-id').value) : Date.now(),
        tipo: 'SAIDA',
        categoria: document.getElementById('categoria').value || 'Geral',
        valor: valorNum,
        data: document.getElementById('data').value,
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        comprovante: document.getElementById('comprovante').checked,
        lancamento_ok: document.getElementById('lancamento_ok').checked
    };

    const idExistente = document.getElementById('form-id').value;
    if (idExistente) {
        const index = movimentacoes.findIndex(m => m.id === parseInt(idExistente));
        if (index !== -1) movimentacoes[index] = data;
    } else {
        movimentacoes.push(data);
    }

    salvarLocal();
    fecharModal(document.getElementById('modal-form'));
    aplicarFiltros();
}

window.editarMovimentacao = (id) => {
    const mov = movimentacoes.find(m => m.id === id);
    if (!mov) return;

    document.getElementById('form-id').value = mov.id;
    const inputValor = document.getElementById('valor');
    inputValor.value = mov.valor.toFixed(2).replace('.', ',');
    aplicarMascaraMoeda(inputValor);
    
    document.getElementById('data').value = mov.data;
    document.getElementById('categoria').value = mov.categoria || '';
    document.getElementById('nome').value = mov.nome;
    document.getElementById('descricao').value = mov.descricao || '';
    document.getElementById('comprovante').checked = mov.comprovante;
    document.getElementById('lancamento_ok').checked = mov.lancamento_ok || false;
    
    document.getElementById('modal-title').textContent = 'Editar Despesa';
    abrirModal(document.getElementById('modal-form'));
}

window.solicitarExclusao = (id) => {
    idParaDeletar = id;
    abrirModal(document.getElementById('modal-confirm'));
}

function confirmarExclusao() {
    if (!idParaDeletar) return;
    movimentacoes = movimentacoes.filter(m => m.id !== idParaDeletar);
    salvarLocal();
    fecharModal(document.getElementById('modal-confirm'));
    idParaDeletar = null;
    aplicarFiltros();
}

function aplicarFiltros() {
    const nome = document.getElementById('filter-nome').value.toLowerCase();
    const mes = document.getElementById('filter-mes').value;
    const status = document.getElementById('filter-status').value;

    let dadosFiltrados = movimentacoes.filter(mov => {
        let match = true;
        if (nome && !mov.nome.toLowerCase().includes(nome) && !mov.descricao.toLowerCase().includes(nome)) match = false;
        if (mes && !mov.data.startsWith(mes)) match = false;
        
        if (status === 'pendente_nota' && mov.comprovante) match = false;
        if (status === 'pendente_lancamento' && mov.lancamento_ok) match = false;
        if (status === 'concluido' && (!mov.comprovante || !mov.lancamento_ok)) match = false;
        
        return match;
    });

    renderizarTabela(dadosFiltrados);
}
