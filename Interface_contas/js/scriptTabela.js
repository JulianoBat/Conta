const url = "http://localhost:8080/conta"

const tbody = document.querySelector("#tbody");

async function getAll() {
    const response = await fetch(url)
    const data = await response.json();
    
    
    
    for(let i = 0; i < data.length; i++) {
        const tr = document.createElement("tr");
        const contaEmpresa = document.createElement("td");
        const dtVenc = document.createElement("td");
        const valor = document.createElement("td");
        const status = document.createElement("td");
        

        contaEmpresa.innerText = data[i].contaEmpresa;
        dtVenc.innerText = data[i].dtVenc;
        valor.innerText = data[i].valor;
        status.innerText = data[i].statusConta;
        

        tr.appendChild(contaEmpresa);
        tr.appendChild(dtVenc);
        tr.appendChild(valor);
        tr.appendChild(status);
        

        if(data[i].atraso === false && data[i].statusConta === 'PENDENTE') {
            tr.setAttribute("class", "table-warning");
        }else if(data[i].atraso === true && data[i].statusConta === 'PENDENTE'){
            status.innerText = "ATRASO"
            tr.setAttribute("class", "table-danger"); 
        }

        if(data[i].statusConta === 'PAGO') {
            tr.setAttribute("class", "table-success");
        }

        

        tbody.appendChild(tr);
    }
    

    


    /*data.map((conta) => {
        const tr = document.createElement("tr");
        const contaEmpresa = document.createElement("td");
        const dtVenc = document.createElement("td");
        const status = document.createElement("td");
        const valor = document.createElement("td");

        if(conta.statusConta === 'PENDENTE') {
            tr.setAttribute("class", "table-warning");
        }

        if(conta.atraso === true){
            tr.setAttribute("class", "table-danger");
        }

        if(conta.statusConta === 'PAGO') {
            tr.setAttribute("class", "table-success");
        }

        contaEmpresa.innerText = conta.contaEmpresa;
        dtVenc.innerText = conta.dtVenc;
        status.innerText = conta.statusConta;
        valor.innerText = conta.valor;

        tr.appendChild(contaEmpresa);
        tr.appendChild(dtVenc);
        tr.appendChild(status);
        tr.appendChild(valor);

        let imgRemove = document.createElement('img');
        let imgEdit = document.createElement('img');
        imgEdit.src = 'img/edit.png';
        imgEdit.style = 'width: 45px'

        imgRemove.src = 'img/icons8-x-16.png';
        imgRemove.style = 'width: 45px'
        imgRemove.setAttribute("onclick", )


        tr.appendChild(imgEdit)
        tr.appendChild(imgRemove)
        


        tbody.appendChild(tr);

        
    })*/
}

getAll();