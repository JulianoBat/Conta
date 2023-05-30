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
    console.log(IdataVenc);
    console.log(momentoAtual());

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


    console.log(verificaVenc());

    fetch('http://localhost:8080/conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data))
});

