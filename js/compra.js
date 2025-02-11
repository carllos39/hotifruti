const cards = document.querySelectorAll(".card");
let quantidade=document.querySelectorAll(".quantidade");
const btnRedefinir= document.getElementById("btnRedefinir");
const btnComprar= document.getElementById("btnComprar");
const resultado= document.getElementById("resultado");

 cards.forEach(card =>{
    card.addEventListener("click", () =>{
        card.classList.toggle("selecionado");
    });
 });

 cards.forEach(card =>{
    btnRedefinir.addEventListener("click", () =>{
        card.style.display="";
        card.classList.remove("selecionado");
        resultado.innerText="";
    })
 });

 btnComprar.addEventListener("click", () =>{

let precoTotal = 0;
 let listaProdutos =[];
 quantidade=[];
 alert(quantidade);

    cards.forEach(card =>{
        if(! card.classList.contains("selecionado")){
        card.style.display="none";
        }else{
            listaProdutos.push(
           card.querySelector("div:first-child").textContent + "R$" + card.dataset.preco);
            
            precoTotal +=parseFloat(card.dataset.preco);


        }
    });
    resultado.innerText=`Preço total : ${precoTotal}`;
 });
