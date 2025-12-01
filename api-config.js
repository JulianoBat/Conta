// Configurações da API
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080', // URL base da sua API
    ENDPOINTS: {
        CONTAS: '/conta', // Endpoint para contas
    },
    HEADERS: {
        'Content-Type': 'application/json',
        // Adicione aqui headers específicos da sua API
        // 'Authorization': 'Bearer seu-token-aqui'
    }
};

// Verificar se estamos em desenvolvimento (para usar mock data se necessário)
const IS_DEV_MODE = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

export { API_CONFIG, IS_DEV_MODE };