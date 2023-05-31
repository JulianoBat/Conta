const formEl = document.getElementById('form-api');

const IstatusConta = document.querySelector("input[name='statusConta']:checked").value;


function momentoAtual() {
    let data = new Date(),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
};


formEl.addEventListener('submit', evento => {
    evento.preventDefault();
    const IdataVenc = document.querySelector(".dt-venc").value;

    const momentoA = momentoAtual();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    data.dtReg = momentoA;
    data.atraso = verificaVenc();

    function verificaVenc() {
        if (momentoAtual() > IdataVenc) {
            return true;
        }
        else {
            return false;
        }
    }

    fetch('http://localhost:8080/conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data))
});

function deletar(i){
    let confirmacao = confirm("Deletar conta cadastrada? ")
    if(confirmacao){
        const element = document.querySelector('#linha'+ i);
        fetch('http://localhost:8080/conta/'+ i, { method: 'DELETE' })
        .then(() => alert('Conta deletada com sucesso!'));
        window.location.reload(true);
    }
}

function alterar(i){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch PUT Request Example' })
    };
    fetch('http://localhost:8080/conta/'+ i, requestOptions)
        .then(response => response.json())
        .then(data => element.innerHTML = data.updatedAt );
}

function preparaAlterar(dados){
    document.getElementById('empresas').value = dados.contaEmpresa
    document.getElementById('valor').value = dados.valor;
    document.getElementById('dt-venc').value = dados.dtVenc;
    document.getElementById('dt-pag').value = dados.dtPag;
    document.getElementById('dt-emi').value = dados.dtEmi;

    document.getElementById('btn1').innerText = "Alterar"
    document.getElementById('offcanvasNavbarDarkLabel').innerText = "Altere uma conta"
}