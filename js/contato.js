"use strict";
// versão tiago
/* Selecionando os elementos que serão manipulados */
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

// Seleção do campo telefone usando JS PURO
// const campoTelefone = formulario.querySelector("#telefone");

// OU: seleção do campo telefone usando jQuery
const campoTelefone = $("#telefone");

// Ativando a máscara para o telefone e cep
$(campoTelefone).mask("(00) 0000-0000"); // Exemplo: (11) 2135-0300
$(campoCep).mask("00000-000"); // Exemplo: 03639-000


// Detectando o evento de CLICK no botão buscar
botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();
    
    let cep; // undefined

    /* Verificando se o cep NÃO tem 8 dígitos.
    O operador !== significa "diferente de". */
    if(campoCep.value.length !== 9){
        // Alerte o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "purple";
        
        // Pare a execução
        return;
    } else { 
        // Caso contrário (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }

    /* AJAX -> Técnica de comunicação assíncrona
    para acessar uma API (www.viacep.com.br) */

    // Etapa 1: preparar a URL da API com o CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);

    // Etapa 3: extrair os dados da resposta em formato JSON
    const dados = await resposta.json();

    // Etapa 4: lidar com os dados de resposta (em caso de erro ou sucesso)
    if( "erro" in dados ){
        mensagem.textContent = "CEP inexistente!";
        mensagem.style.color = "red";
    } else {
        mensagem.textContent = "CEP encontrado!";
        mensagem.style.color = "blue";

        const exemplos = document.querySelectorAll(".exemplo");
        for(const exemplo of exemplos){
            exemplo.classList.remove("exemplo");
        }

        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
    }
});


/*
// versão carlos
//Selecionando elementos que serão manipulados
const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

//Seleção do campo telefone
//const campoTelefone=formulario.querySelector("#telefone");
 const campoTelefone=$("#telefone");
$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");

//Detectar o evento de click
botaoBuscar.addEventListener("click", async function (event) {
    event.preventDefault();
    // Verificando se o cep não tem 8 digitos
    let cep;

    if (campoCep.value.length !== 9) {
        mensagem.textContent = "Digite um cep válido!";
        mensagem.style.color = "purple";
        
        //Parar a execução do código
        return;
    } else {
        cep = campoCep.value;

    }
    //Tecnica de comunicação assíncrona para acessar uma API(www.viacep.com.br)

    //Etapa 1- preparar  a URL da API com o cep digitado
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    //Etapa 2- Acessar API com url e aguardar o retorno dela 
    const resposta = await fetch(url);
    //Etapa 3- Extrair os dados da respota em formato JSON
    const dados = await resposta.json();
    //Etapa 4-Lidar com os dasdos  de resposta  em caso de erro ou 
    if ("erro" in dados) {
        mensagem.textContent = "Cep inexistente!";
        mensagem.style.color = "red";
        
    }else{
     mensagem.textContent="cep encontrado!";
     mensagem.style.color="green"; 

     campoEndereco.value= dados.logradouro; 
     campoBairro.value=dados.bairro;  
     campoCidade.value= dados.localidade; 
     campoEstado.value=dados.uf;  
    }

});

*/
//Programação do formspree


    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: formulario.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Seus dados foram enviados com sucesso!";
      formulario.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Deu ruim! Algo de errado aconteceu"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Deu ruim! Algo de errado aconteceu"
  });
}
formulario.addEventListener("submit", handleSubmit)