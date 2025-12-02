// Importar configurações da API
import { API_CONFIG, IS_DEV_MODE } from './api-config.js';

// API REST Externa
let contas = [];
let editando = false;
let contaEditandoId = null;



// Função auxiliar para tratar erros da API
function tratarErroAPI(erro) {
    console.error('Erro na API:', erro);
    
    if (erro.status === 401) {
        mostrarNotificacao('Sessão expirada. Faça login novamente.', 'error');
        // Redirecionar para login se necessário
        // window.location.href = '/login';
    } else if (erro.status === 403) {
        mostrarNotificacao('Você não tem permissão para esta ação.', 'error');
    } else if (erro.status === 404) {
        mostrarNotificacao('Recurso não encontrado.', 'error');
    } else {
        mostrarNotificacao(`Erro na comunicação com o servidor: ${erro.message || 'Tente novamente mais tarde.'}`, 'error');
    }
    
    return null;
}
console.log('${API_CONFIG.BASE_URL}');

// Funções para interagir com a API
const ApiService = {
    // Buscar todas as contas
    async buscarContas() {
        try {
            const resposta = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAS}`, {
                method: 'GET',
                headers: API_CONFIG.HEADERS
            });
            
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            return await resposta.json();
        } catch (erro) {
            tratarErroAPI(erro);
            
            // Fallback para dados mock em desenvolvimento
            if (IS_DEV_MODE) {
                console.log('Usando dados mock para desenvolvimento');
                return this.buscarContasMock();
            }
            
            throw erro;
        }
    },
    
    // Buscar uma conta específica
    async buscarConta(id) {
        try {
            const resposta = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAS}/${id}`, {
                method: 'GET',
                headers: API_CONFIG.HEADERS
            });
            
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            return await resposta.json();
        } catch (erro) {
            tratarErroAPI(erro);
            return null;
        }
    },
    
    // Criar uma nova conta
    async criarConta(conta) {
        try {
            const resposta = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAS}`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(conta)
            });
            
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            return await resposta.json();
        } catch (erro) {
            tratarErroAPI(erro);
            return null;
        }
    },
    
    // Atualizar uma conta existente
    async atualizarConta(id, conta) {
        try {
            const resposta = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAS}/${id}`, {
                method: 'PUT', // ou PATCH, dependendo da sua API
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(conta)
            });
            
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            return await resposta.json();
        } catch (erro) {
            tratarErroAPI(erro);
            return null;
        }
    },
    
    // Excluir uma conta
    async excluirConta(id) {
        try {
            const resposta = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAS}/${id}`, {
                method: 'DELETE',
                headers: API_CONFIG.HEADERS
            });
            
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}: ${resposta.statusText}`);
            }
            
            return true;
        } catch (erro) {
            tratarErroAPI(erro);
            return false;
        }
    },
    
    // Dados mock para desenvolvimento (remover em produção)
    buscarContasMock() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const hoje = new Date().toISOString().split('T')[0];
                const ontem = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                const amanha = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                
                resolve([
                    {
                        id: 1,
                        contaEmpresa: 'Sabesp',
                        statusConta: 'pendente',
                        valor: 125.50,
                        descricao: 'Conta de água - mês atual',
                        dtVenc: amanha,
                        dtPag: '',
                        dtEmi: ontem,
                        createdAt: ontem,
                        updatedAt: ontem
                    },
                    {
                        id: 2,
                        contaEmpresa: 'Enel',
                        statusConta: 'pago',
                        valor: 89.90,
                        descricao: 'Conta de luz - último mês',
                        dtVenc: ontem,
                        dtPag: ontem,
                        dtEmi: '2023-10-15',
                        createdAt: '2023-10-15',
                        updatedAt: '2023-10-15'
                    }
                ]);
            }, 500); // Simular delay de rede
        });
    }
};

// Inicializar datas e carregar contas da API
document.addEventListener('DOMContentLoaded', async function() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dtEmi').value = hoje;
    
    // Carregar contas da API
    await carregarContasAPI();
    
    // Configurar evento do formulário
    document.getElementById('conta-form').addEventListener('submit', salvarConta);
    document.getElementById('cancel-btn').addEventListener('click', cancelarEdicao);
    
    // Mostrar loading enquanto carrega
    mostrarLoading(true);
});

// Função para mostrar/ocultar loading
function mostrarLoading(mostrar) {
    const loadingElement = document.getElementById('loading');
    if (!loadingElement && mostrar) {
        const loading = document.createElement('div');
        loading.id = 'loading';
        loading.innerHTML = '<div class="loading-spinner"></div><p>Carregando contas...</p>';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        document.body.appendChild(loading);
    } else if (loadingElement) {
        loadingElement.style.display = mostrar ? 'flex' : 'none';
        if (!mostrar) {
            setTimeout(() => loadingElement.remove(), 300);
        }
    }
}

// Função para carregar contas da API
async function carregarContasAPI() {
    try {
        mostrarLoading(true);
        contas = await ApiService.buscarContas();
        atualizarListaContas();
    } catch (erro) {
        console.error('Erro ao carregar contas:', erro);
        mostrarNotificacao('Não foi possível carregar as contas.', 'error');
    } finally {
        mostrarLoading(false);
    }
}

// Função para salvar uma conta (criar ou editar)
async function salvarConta(event) {
    event.preventDefault();
    
    // Coletar dados do formulário
    const contaEmpresa = document.getElementById('contaEmpresa').value;
    const statusConta = document.querySelector('input[name="statusConta"]:checked').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const descricao = document.getElementById('descricao').value;
    const dtVenc = document.getElementById('dtVenc').value;
    const dtPag = document.getElementById('dtPag').value;
    const dtEmi = document.getElementById('dtEmi').value;
    
    // Validar dados
    if (!contaEmpresa || !statusConta || !valor || !dtVenc || !dtEmi) {
        mostrarNotificacao('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Se não tiver data de pagamento e status for pago, usar data atual
    let dataPagamento = dtPag;
    if (statusConta === 'pago' && !dtPag) {
        dataPagamento = new Date().toISOString().split('T')[0];
        document.getElementById('dtPag').value = dataPagamento;
    }
    
    // Criar objeto conta
    const conta = {
        contaEmpresa,
        statusConta,
        valor,
        descricao: descricao || `${contaEmpresa} - ${statusConta === 'pago' ? 'Conta paga' : 'Conta pendente'}`,
        dtVenc,
        dtPag: dataPagamento,
        dtEmi
    };
    
    try {
        let resultado;
        
        if (editando) {
            // Atualizar conta existente na API
            resultado = await ApiService.atualizarConta(contaEditandoId, conta);
            if (resultado) {
                mostrarNotificacao('Conta atualizada com sucesso!', 'success');
                // Atualizar a lista após edição
                await carregarContasAPI();
            }
        } else {
            // Criar nova conta na API
            resultado = await ApiService.criarConta(conta);
            if (resultado) {
                mostrarNotificacao('Conta cadastrada com sucesso!', 'success');
                // Atualizar a lista após criação
                await carregarContasAPI();
            }
        }
    } catch (erro) {
        console.error('Erro ao salvar conta:', erro);
        mostrarNotificacao('Erro ao salvar conta. Tente novamente.', 'error');
    } finally {
        // Limpar formulário independente do resultado
        limparFormulario();
    }
}

// Função para editar uma conta
async function editarConta(id) {
    try {
        mostrarLoading(true);
        const conta = await ApiService.buscarConta(id);
        
        if (!conta) {
            mostrarNotificacao('Conta não encontrada.', 'error');
            return;
        }
        
        // Preencher formulário com dados da conta
        document.getElementById('contaEmpresa').value = conta.contaEmpresa;
        document.getElementById('valor').value = conta.valor;
        document.getElementById('descricao').value = conta.descricao;
        document.getElementById('dtVenc').value = conta.dtVenc;
        document.getElementById('dtPag').value = conta.dtPag || '';
        document.getElementById('dtEmi').value = conta.dtEmi;
        
        // Definir status
        if (conta.statusConta === 'pago') {
            document.getElementById('pago').checked = true;
        } else {
            document.getElementById('pendente').checked = true;
        }
        
        // Atualizar estado para edição
        editando = true;
        contaEditandoId = id;
        document.getElementById('form-title').textContent = 'Editar Conta';
        document.getElementById('conta-id').textContent = `ID: ${id}`;
        document.getElementById('conta-id').style.display = 'inline';
        document.getElementById('submit-btn').innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar Conta';
        
        // Rolar para o formulário
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (erro) {
        console.error('Erro ao carregar conta para edição:', erro);
        mostrarNotificacao('Não foi possível carregar a conta para edição.', 'error');
    } finally {
        mostrarLoading(false);
    }
}

// Função para excluir uma conta
async function excluirConta(id) {
    if (!confirm('Tem certeza que deseja excluir esta conta? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        mostrarLoading(true);
        const sucesso = await ApiService.excluirConta(id);
        
        if (sucesso) {
            mostrarNotificacao('Conta excluída com sucesso!', 'info');
            // Atualizar a lista após exclusão
            await carregarContasAPI();
            
            // Se estava editando esta conta, limpar formulário
            if (editando && contaEditandoId === id) {
                limparFormulario();
            }
        } else {
            mostrarNotificacao('Não foi possível excluir a conta.', 'error');
        }
    } catch (erro) {
        console.error('Erro ao excluir conta:', erro);
        mostrarNotificacao('Erro ao excluir conta. Tente novamente.', 'error');
    } finally {
        mostrarLoading(false);
    }
}

// As funções mostrarNotificacao, cancelarEdicao, limparFormulario e atualizarListaContas
// permanecem praticamente as mesmas, apenas removendo o localStorage

// Função para mostrar notificação (mantida igual)
function mostrarNotificacao(mensagem, tipo = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = mensagem;
    notification.className = `notification ${tipo} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para cancelar edição (mantida igual)
function cancelarEdicao() {
    limparFormulario();
    mostrarNotificacao('Edição cancelada.', 'info');
}

// Função para limpar formulário (mantida igual)
function limparFormulario() {
    document.getElementById('conta-form').reset();
    document.getElementById('dtEmi').value = new Date().toISOString().split('T')[0];
    document.getElementById('dtPag').value = '';
    
    // Resetar estado de edição
    editando = false;
    contaEditandoId = null;
    document.getElementById('form-title').textContent = 'Cadastrar Nova Conta';
    document.getElementById('conta-id').style.display = 'none';
    document.getElementById('submit-btn').innerHTML = '<i class="fas fa-save"></i> Salvar Conta';
}

// Função para atualizar a lista de contas (modificada para usar dados da API)
function atualizarListaContas() {
    const contasList = document.getElementById('contas-list');
    const emptyMessage = document.getElementById('empty-message');
    const contasTable = document.getElementById('contas-table');
    
    // Limpar lista
    contasList.innerHTML = '';
    
    // Verificar se há contas
    if (!contas || contas.length === 0) {
        emptyMessage.style.display = 'block';
        contasTable.style.display = 'none';
        return;
    }
    
    // Mostrar tabela e ocultar mensagem vazia
    emptyMessage.style.display = 'none';
    contasTable.style.display = 'table';
    
    // Ordenar contas por data de vencimento (mais antigas primeiro)
    contas.sort((a, b) => new Date(a.dtVenc) - new Date(b.dtVenc));
    
    // Adicionar cada conta à tabela
    contas.forEach(conta => {
        const row = document.createElement('tr');
        
        // Formatar valor para Real brasileiro
        const valorFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(conta.valor);
        
        // Formatar datas
        const vencimentoFormatado = new Date(conta.dtVenc).toLocaleDateString('pt-BR');
        const pagamentoFormatado = conta.dtPag ? 
            new Date(conta.dtPag).toLocaleDateString('pt-BR') : 'Não pago';
        
        // Criar linha da tabela
        row.innerHTML = `
            <td><strong>${conta.contaEmpresa}</strong><br><small>${conta.descricao}</small></td>
            <td>${valorFormatado}</td>
            <td>${vencimentoFormatado}</td>
            <td><span class="status-badge status-${conta.statusConta}">${conta.statusConta === 'pago' ? 'Pago' : 'Pendente'}</span></td>
            <td class="actions">
                <button class="btn-edit" onclick="editarConta(${conta.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-delete" onclick="excluirConta(${conta.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        
        contasList.appendChild(row);
    });
}

// Para compatibilidade, exponha as funções necessárias no escopo global
window.editarConta = editarConta;
window.excluirConta = excluirConta;